const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// PostgreSQL pool — connects to pgvector via Docker network
const pool = new Pool({
  host: '172.18.0.4',
  port: 5432,
  database: 'universe',
  user: 'smith',
  password: 'smith888',
  max: 20,
  idleTimeoutMillis: 30000,
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as time');
    res.json({ status: 'ok', time: result.rows[0].time });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /api/nodes — все ноды (с фильтрами)
app.get('/api/nodes', async (req, res) => {
  try {
    const { domain, world, level, status, view } = req.query;
    let sql = 'SELECT * FROM nodes WHERE 1=1';
    const params = [];
    let paramIdx = 1;

    if (domain) {
      sql += ` AND domain = $${paramIdx++}`;
      params.push(domain);
    }
    if (world) {
      sql += ` AND world = $${paramIdx++}`;
      params.push(world);
    }
    if (level) {
      sql += ` AND level = $${paramIdx++}`;
      params.push(level);
    }
    if (status) {
      sql += ` AND status = $${paramIdx++}`;
      params.push(status);
    }

    // view mode: если 'epoch' — сортируем по эпохе, если 'domain' — по домену
    if (view === 'epoch') {
      sql += ' ORDER BY epoch_start NULLS LAST';
    } else {
      sql += ' ORDER BY domain, name_en';
    }

    const result = await pool.query(sql, params);
    res.json({ nodes: result.rows, total: result.rows.length });
  } catch (err) {
    console.error('GET /api/nodes error:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/nodes/:id — одна нода
app.get('/api/nodes/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM nodes WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Node not found' });
    }
    // Get connected edges
    const edges = await pool.query(
      'SELECT * FROM edges WHERE source = $1 OR target = $1',
      [req.params.id]
    );
    res.json({ node: result.rows[0], edges: edges.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/edges — все рёбра
app.get('/api/edges', async (req, res) => {
  try {
    const { world, type } = req.query;
    let sql = 'SELECT * FROM edges WHERE 1=1';
    const params = [];
    let idx = 1;

    if (world) {
      sql += ` AND world = $${idx++}`;
      params.push(world);
    }
    if (type) {
      sql += ` AND type = $${idx++}`;
      params.push(type);
    }

    sql += ' ORDER BY source, target';
    const result = await pool.query(sql, params);
    res.json({ edges: result.rows, total: result.rows.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stories — истории (по ребру)
app.get('/api/stories', async (req, res) => {
  try {
    const { edgeId } = req.query;
    let sql = 'SELECT * FROM stories';
    const params = [];
    if (edgeId) {
      sql += ' WHERE edge_id = $1';
      params.push(edgeId);
    }
    sql += ' ORDER BY resonances DESC';
    const result = await pool.query(sql, params);
    res.json({ stories: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/epochs — распределение по эпохам (для Time View)
app.get('/api/epochs', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        epoch_start,
        epoch_end,
        count(*) as node_count,
        json_agg(json_build_object('id', id, 'name', name_en)) as nodes
      FROM nodes 
      WHERE epoch_start IS NOT NULL
      GROUP BY epoch_start, epoch_end
      ORDER BY epoch_start
    `);
    res.json({ epochs: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/domains — распределение по доменам
app.get('/api/domains', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT domain, count(*) as count
      FROM nodes 
      GROUP BY domain 
      ORDER BY count DESC
    `);
    res.json({ domains: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/chat — AI chat via local Ollama
// Helper: smart fallback response when AI is loading
function getFallbackResponse(message, nodeContext) {
  const msg = (message || '').toLowerCase();
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('привет')) {
    return 'Hello! Welcome to Seamless Universe. Ask me about somatics, body practices, or any node in the graph.';
  }
  if (msg.includes('somatic') || msg.includes('soma')) {
    return 'Somatics is the field of embodied awareness — how the body experiences itself from within. Key figures include Thomas Hanna, Moshe Feldenkrais, and current integrative neuroscience.';
  }
  if (nodeContext) {
    return `I see you are exploring «${nodeContext}». This is a fascinating node. Try clicking on its connections to see how it relates to other concepts in the somatic universe.`;
  }
  return 'Seamless Universe is a living map of somatic knowledge. You can explore nodes, create connections, and find relationships between body practices, science, philosophy, and movement. What would you like to know?';
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message, nodeContext } = req.body;
    if (!message) return res.status(400).json({ error: 'message required' });

    const systemPrompt = nodeContext 
      ? `You are a guide in the Seamless Universe — a 3D knowledge graph about somatics, science, philosophy, and movement. The user is looking at this node: ${nodeContext}. Help them understand connections and explore meaning. Keep responses under 200 words.`
      : 'You are a guide in the Seamless Universe — a 3D knowledge graph about somatics, science, philosophy, and movement. Help users explore connections between ideas. Keep responses under 200 words.';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    // Try Gemini first (fast), fallback to Ollama (slow local)
    const GEMINI_KEY = process.env.GEMINI_API_KEY;
    let aiResponse = null;

    if (GEMINI_KEY) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ 
                parts: [{ text: `${systemPrompt}\n\nUser: ${message}` }]
              }],
              generationConfig: { maxOutputTokens: 200, temperature: 0.7 }
            }),
            signal: controller.signal
          }
        );
        clearTimeout(timeoutId);

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            aiResponse = { response: text, model: 'gemini-2.0-flash', nodeContext };
          }
        } else {
          const errBody = await geminiRes.text();
          console.log('Gemini error:', geminiRes.status, errBody.slice(0, 200));
        }
      } catch (geminiErr) {
        console.log('Gemini fetch failed:', geminiErr.message);
      }
    }

    // If Gemini didn't respond, try Ollama
    if (!aiResponse) {
      try {
        const ollamaRes = await fetch('http://localhost:11434/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'qwen2.5:3b',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: message }
            ],
            stream: false,
            options: { temperature: 0.7, num_predict: 128 }
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (ollamaRes.ok) {
          const ollamaData = await ollamaRes.json();
          aiResponse = { response: ollamaData.message?.content || '...', model: 'qwen2.5:3b', nodeContext };
        } else {
          const errText = await ollamaRes.text();
          console.error('Ollama error:', errText);
        }
      } catch (fetchErr) {
        clearTimeout(timeoutId);
        if (fetchErr.name !== 'AbortError') throw fetchErr;
        console.log('Ollama timed out');
      }
    }

    if (aiResponse) {
      res.json(aiResponse);
    } else {
      res.json({
        response: getFallbackResponse(message, nodeContext),
        model: 'fallback',
        nodeContext,
        note: 'All AI models unavailable'
      });
    }
  } catch (err) {
    console.error('Chat error:', err);
    res.json({ 
      response: 'Seamless Universe is a living map of somatic knowledge. Explore nodes and connections between body practices, science, philosophy, and movement.',
      model: 'fallback',
      error: true
    });
  }
});

// POST /api/resonate — резонировать
app.post('/api/resonate', async (req, res) => {
  try {
    const { nodeId, userId } = req.body;
    if (!nodeId) return res.status(400).json({ error: 'nodeId required' });

    // Update node resonances
    await pool.query(
      'UPDATE nodes SET resonances = resonances + 1, last_active_at = NOW() WHERE id = $1',
      [nodeId]
    );

    // Log event
    if (userId) {
      await pool.query(
        'INSERT INTO user_events (id, user_id, event_type, node_id) VALUES (gen_random_uuid()::text, $1, $2, $3)',
        [userId, 'resonate', nodeId]
      );
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Universe API running on port ${PORT}`);
  console.log(`Endpoints:`);
  console.log(`  GET  /api/health`);
  console.log(`  GET  /api/nodes?domain=&world=&view=epoch|domain`);
  console.log(`  GET  /api/nodes/:id`);
  console.log(`  GET  /api/edges`);
  console.log(`  GET  /api/stories`);
  console.log(`  GET  /api/epochs`);
  console.log(`  GET  /api/domains`);
  console.log(`  POST /api/resonate`);
});
