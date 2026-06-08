// API service for Seamless Universe backend
// Fetches real data from PostgreSQL via the API server at localhost:3001
// Proxy: nginx /api/ -> localhost:3001

const API_BASE = '/api';

// Map snake_case DB fields to SomaticNode camelCase
function mapNode(dbNode: any) {
  return {
    id: dbNode.id,
    nameRu: dbNode.name_ru || '',
    nameEn: dbNode.name_en || dbNode.id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    type: dbNode.type || 'concept',
    level: dbNode.level || 'meso',
    domain: dbNode.domain === 'ai' ? 'science' : dbNode.domain || 'hybrid',
    world: dbNode.world || 'atlas',
    status: dbNode.status || 'seed',
    resonances: dbNode.resonances || 0,
    connections: dbNode.connections || 0,
    carries: dbNode.carries || 0,
    score: Math.round(Math.log10(Math.max(1, (dbNode.resonances || 0) + (dbNode.connections || 0) * 5)) * 10),
    descriptionRu: dbNode.description_ru || '',
    descriptionEn: dbNode.description_en || '',
    addedBy: dbNode.added_by || 'system',
    lastActiveAt: new Date(dbNode.last_active_at || dbNode.created_at).getTime(),
    isPrivate: dbNode.is_private || false,
    epochRu: dbNode.epoch_ru || '',
    epochEn: dbNode.epoch_en || '',
    epochStart: dbNode.epoch_start,
    epochEnd: dbNode.epoch_end,
  };
}

function mapEdge(dbEdge: any) {
  return {
    id: dbEdge.id,
    source: dbEdge.source,
    target: dbEdge.target,
    type: dbEdge.type || 'conceptual',
    world: dbEdge.world || 'atlas',
    labelRu: dbEdge.label_ru || '',
    labelEn: dbEdge.label_en || '',
    resonanceWeight: dbEdge.resonance_weight || 2,
    activity: dbEdge.activity || 1,
    storyIds: [],
    createdAt: new Date(dbEdge.created_at).getTime(),
  };
}

export async function fetchNodes(filters?: { domain?: string; world?: string }) {
  const params = new URLSearchParams();
  if (filters?.domain) params.set('domain', filters.domain);
  if (filters?.world) params.set('world', filters.world);
  
  const res = await fetch(`${API_BASE}/nodes?${params}`);
  const data = await res.json();
  const nodes = data.nodes || data.rows || [];
  return nodes.map(mapNode);
}

export async function fetchEdges(filters?: { world?: string; type?: string }) {
  const params = new URLSearchParams();
  if (filters?.world) params.set('world', filters.world);
  if (filters?.type) params.set('type', filters.type);
  
  const res = await fetch(`${API_BASE}/edges?${params}`);
  const data = await res.json();
  const edges = data.edges || data.rows || [];
  return edges.map(mapEdge);
}

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

export async function resonateNode(nodeId: string, userId?: string) {
  const res = await fetch(`${API_BASE}/resonate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nodeId, userId }),
  });
  return res.json();
}

export async function fetchEpochs() {
  const res = await fetch(`${API_BASE}/epochs`);
  const data = await res.json();
  return data.epochs || [];
}

export async function fetchDomains() {
  const res = await fetch(`${API_BASE}/domains`);
  const data = await res.json();
  return data.domains || [];
}

// Chat with local Ollama via backend proxy
export async function chatWithAI(message: string, nodeContext?: string) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, nodeContext }),
  });
  return res.json();
}
