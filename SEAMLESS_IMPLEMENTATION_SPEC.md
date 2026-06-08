# SEAMLESS UNIVERSE — COMPLETE IMPLEMENTATION SPEC

## For Julius / Claude Code
### Все фичи, механики, бэкенд, данные

---

## 1. CORE CONCEPT

Interactive living knowledge space. User moves INSIDE a living ecosystem, not through a graph.
Concepts = bodies in a gravity field. Connections = river deltas / mycelium / particle flows.

**No hard lines between nodes. No static graph. No center. Everything breathes and moves.**

---

## 2. PHYSICS ENGINE — 3 LAYERS

All physics calculated in `useFrame` with direct Float32Array mutation (no React state).

### Layer 1: FORCE-DIRECTED (base)
- Gravity: 0.045 (pull nodes toward their target positions)
- Repulsion: 2200 (nodes push each other apart, radius 310 units)
- Spring attraction: 0.038 (edges pull connected nodes together)
- Damping: 0.82 (velocity decay per frame)
- Swell (living wave): ±0.16 XY, ±0.10 Z sine/cosine deterministic wobble
- Breathing: each node radius oscillates ±8% at 0.3-0.75 Hz

### Layer 2: BOIDS FLOCKING
Reynolds algorithm for natural cluster formation.
- Separation (radius 12 units): push apart when too close
- Alignment (radius 24): match velocity with nearby nodes
- Cohesion (radius 24): steer toward center of local group
- Max boid force: 0.04, weights: sep 1.5, ali 0.6, coh 0.8

### Layer 3: CURL NOISE FLOW FIELDS
Fluid-like vector field from Simplex noise curl.
- Micro-nodes and free particles drift along curl lines
- Curl k = 0.08, drift strength = 0.45
- Formula: curlX = sin(ny*k) - cos(nz*k), etc.
- Creates laminar flow effect — nodes drift like leaves in a stream

### Mouse Interaction
- Cursor = predator: pushes nodes away (radius 45, force 2.2)
- Click + hold = gravitational well: attracts nodes toward cursor
- Moving a node >1.5 units triggers scatter in connected flows

---

## 3. THREE WORLDS

### ATLAS (canonical archive)
- 100-130 verified historical concepts, read-only
- 6 domain clusters in 3D (body, science, philosophy, movement, cognition, hybrid)
- Each cluster: macro at center (±4), meso on inner orbit (28-52), micro on outer (58-94)
- Perfect spheres, full brightness, rich flows
- Cluster centers:
  - body: [+70, -80, -20]
  - science: [-75, +80, -15]
  - philosophy: [-95, +90, +10]
  - movement: [+80, -65, +20]
  - cognition: [-10, -70, +45]
  - hybrid: [+10, +85, -55]

### FIELD (living field)
- User-created concepts (~40+), flat oval disk
- Radius 40-300 units, Y × 0.6 from X
- Free-floating, all users can add/create links
- Sub-mode: PEOPLE — hide concepts, show community users as glowing stars
- Background context: connected atlas concepts at 25% opacity

### ME (personal universe)
- central-me at origin (0,0,0), immovable
- Others orbit around at 45-145 units radius
- Inner orbits faster: speed = 120/radius × 0.08
- Z oscillation: sin(time × 0.4 + idx) × 6
- Privacy: Public / Overlay-only / Private

### World Transitions
- All nodes lerp to new target positions when world changes
- Lerp factor 0.12, transition takes ~1.5 seconds

---

## 4. CONNECTION FLOWS (не линии)

### Particle Flow System
Each connection = N particles flowing from source to target.
- N = 22 particles per flow (28 for resonance, 18 for opposition)
- Path = quadratic bezier curve from A to B + multi-octave noise
- Noise formula:
  ```
  noise = sin(t×9.3 + time×1.3 + phase) × 0.55
        + cos(t×17.1 + time×0.7 + phase×1.8) × 0.27
        + sin(t×31.9 + time×2.1 + phase×0.6) × 0.12
  displacement = perpendicular × noise × edgeLength × 0.11
  ```
- Particles born at A, travel to B, die at B, immediately reborn at A
- Fade at ends: opacity = min(progress×5, (1-progress)×5, 1.0)

### Flow Types & Visual Character
| Type | Color | Speed | Character |
|------|-------|-------|-----------|
| conceptual | domain color | 1.0x | smooth, wavy |
| historical | #8B9AB5 (steel) | 0.6x | slow, majestic |
| practical | #10B981 (emerald) | 1.5x | fast, business |
| resonance | #FFAE00 (amber) | 1.8x | pulsing, warm |
| opposition | #EF4444 (red) | 2.4x | chaotic, nervous |

### Flow Strength Dynamics
- Born from edge weight: strength = 0.2 + resonanceWeight × 0.8
- Activity increases: +0.55/sec when connected node is selected/hovered
- Decay: -0.007/sec when inactive
- Min: 0.05 (near invisible), Max: 1.0
- At strength >0.8: spawn 3-5 micro-branch particles at random angle ±30°

### Scatter & Reform
When a node moves >1.5 units (drag or physics):
1. All connected flow particles eject from current positions
2. Random scatter velocities: ±0.28 XY, ±0.12 Z
3. Velocity decay: ×0.90 per frame
4. Reform time: 0.5 + (1.0 - strength) × 1.2 seconds
5. Strong flows (strength=1.0) reform in 0.5s, weak (0.1) in 1.6s

### Rendering
- THREE.InstancedMesh — one draw call per flow type
- Particle geometry: 5-polygon ico-sphere (cheap)
- Material: MeshBasicMaterial, transparent, AdditiveBlending

---

## 5. NODE VISUALIZATION

### Geometry by Type
| node.type | Geometry |
|-----------|----------|
| concept | Sphere (24 seg) |
| practice | Cylinder (r=0.9, h=0.6, 12 seg) |
| question | Cone (r=0.9, h=1.3, 4 seg) |
| person | Octahedron (1.0) |
| movement | Flat torus disk (r=0.9, t=0.2) |
| event | Rounded box |
| observation | Soft sphere (9 seg) |
| isPrivate | Rotating octahedron |

### Domain Colors
| Domain | Hex |
|--------|-----|
| body | #E8A95C |
| science | #5C9BE8 |
| philosophy | #9B5CE8 |
| movement | #5CE87A |
| cognition | #EAEAEA |
| hybrid | #E85C7A |

### Node Sizes by Status & Level
Base radius formula: 11 × levelFactor × statusFactor
- levelFactor: macro=1.6, meso=1.1, micro=0.7
- statusFactor: rooted/atlas=1.5, alive=1.25, sprout=0.95, seed=0.7
- central-me: 18

### Opacity by Status
- seed: 0.15, sprout: 0.45, alive: 0.80, rooted: 1.0, atlas: 1.0
- Field atlas-background: 0.25

### Decay (field nodes)
- No activity >30 days: opacity × pow(0.95, days-30)
- Minimum: 0.08 (barely there)
- Any interaction resets lastActiveAt

### LOD (by camera distance)
- micro nodes: hidden >24 units (fade 16-24)
- meso nodes: hidden >38 units (fade 28-38)
- micro labels: hidden >20
- meso labels: hidden >34
- micro flows: hidden >24
- meso flows: hidden >38

### Selection & Highlight States
- Selected: +35% size, emissiveIntensity ×1.75, gold orbit ring
- Audio-active: +25% size, #DFB757 shimmer, pulsing emissive
- Overlay-match: gold (#FFD700) instead of domain color
- Hovered: emissiveIntensity ×1.45

### Glow
- Semi-transparent sphere ×1.7 from node size
- Color = domain color
- Opacity: selected=0.25, audio=0.35, normal=0.08

### Labels (Billboard)
- Font: Inter (Google Fonts)
- Size: 0.20 for selected/rooted, 0.13 for others
- Color: gold (#DFB757) for selected/rooted/audio, white for alive, gray for sprout
- No labels for seed
- Position: above node at radius + 0.16
- maxWidth: 2.5

---

## 6. NODE LIFE CYCLE

### Evolution Ladder
seed (0 resonances) → sprout (10+) → alive (50+) → rooted (100+) → atlas (manual verification)

### Visual changes on upgrade:
- Opacity increases
- Size increases
- Label color upgrades

### Decay (field only)
- 30 days without activity → exponential decay
- Formula: opacity × 2^(-(days-30)/14), min 8%

### Score calculation
rawScore = resonances + connections×2 + carries×3
finalScore = Math.round(log10(rawScore + 1) × 10)

---

## 7. UI ELEMENTS (what Julius needs to build)

### 7.1 Header
- Logo + world switcher (3 tabs with gold active border)
- Language toggle RU/EN
- Avatar / Sign in button

### 7.2 Filter Shelf (top-left)
- Search input (real-time by nameRu/nameEn)
- Domain radio buttons (ALL/body/science/philosophy/movement/cognition/hybrid)
- Epoch slider 0-8 (0=all, 1=antiquity...8=contemporary)
- Layer checkboxes: Atlas, Field, HOT (>50 resonances), Audio Only
- Overlay dropdown (select other user)

### 7.3 Node Card
Desktop: right panel 460px. Mobile: bottom sheet 32vh-80vh.
Peek: domain color bar, type badge + level, name, short description, 4 action buttons
Expanded: metadata + 4 tabs (Essence/Stories/Minimap/Materials)

### 7.4 AddSense Modal ("+" button)
5 steps: text input → analysis (1.2s) → parsing result → confirmation (1.5s) → success
Deterministic parser: keyword matching for CONNECTION/STORY/NEW CONCEPT
Auto-domain detection via hashtags

### 7.5 Profile Panel
Name, email, dominant domain, stats, archetypes (auto-detected), privacy settings

### 7.6 Community Agenda
Collapsible question cards with answers, linked concepts, add-answer form

### 7.7 Audio Player
Mini state (always visible when playing) / Full state (with timeline beads, play buttons)
Timeline beads = domain-colored dots at concept timestamps
Click bead → seek. "Now playing" block → OPEN button navigates to concept in 3D

### 7.8 Onboarding
3 slides (Bateson, Hanna, Manifesto), shown once (localStorage flag), skip button

### 7.9 Vibe Mode
COLOUR / MONO (macro silver, meso gray, micro dark) / CINEMATIC (auto-rotate 0.4 rpm)

### 7.10 Activity Feed
Bell icon → dropdown list of recent actions with timestamps

### 7.11 Radial Menu
Long-press >650ms → 4 buttons around node: Resonate/Connect/To Pocket/Story

### 7.12 Auth Modal
Google Sign-In simulation. Default: botovroman45@gmail.com

---

## 8. DATA STRUCTURES

### Concept
```typescript
interface Concept {
  id: string
  nameRu, nameEn, descriptionRu, descriptionEn
  authorRu?, authorEn?, epochRu?, epochEn?
  type: 'concept' | 'practice' | 'person' | 'movement' | 'event' | 'observation' | 'question'
  level: 'macro' | 'meso' | 'micro'
  domain: 'body' | 'science' | 'philosophy' | 'movement' | 'cognition' | 'hybrid'
  world: 'atlas' | 'field' | 'me'
  status: 'seed' | 'sprout' | 'alive' | 'rooted' | 'atlas'
  resonances: number
  connections: number
  carries: number
  score: number
  addedBy?: string
  isPrivate?: boolean
  createdAt?: number
  lastActiveAt?: number
  articles?: Article[]
}
```

### Flow (connection)
```typescript
interface Flow {
  id: string
  sourceId, targetId
  world: 'atlas' | 'field'
  type: 'conceptual' | 'historical' | 'practical' | 'resonance' | 'opposition'
  labelRu?, labelEn?
  storyIds?: string[]
  strength: number (0.0-1.0)
  activity: number
  addedBy?, createdAt?
}
```

### Story
```typescript
interface Story {
  id: string
  flowId: string
  titleRu, titleEn, textRu, textEn
  figureA?, figureB?, year?, sourceUrl?, authorId?
  resonances: number
  verified: boolean
}
```

### Article
```typescript
interface Article {
  id, conceptId
  titleRu, titleEn, summaryRu, summaryEn
  sourceUrl?, sourceTitle?, year?
  type: 'research' | 'article' | 'book' | 'video'
  addedBy?: string
}
```

### Recording (Audio)
```typescript
interface Recording {
  id, titleRu, titleEn, authorRu, authorEn
  sourceRu, sourceEn, year, duration (seconds), domain
  audioUrl?: string
  timeline: { timeMs, conceptId, captionRu, captionEn }[]
}
```

### Agenda Question
```typescript
interface AgendaQuestion {
  id, questionRu, questionEn
  domains: Domain[]
  contributorsCount, contributors: { name, avatar }[]
  answers: { id, author, textRu, textEn, linkedConceptId? }[]
}
```

### Community User
```typescript
interface CommunityUser {
  id, name, avatar
  dominantDomain: Domain
  reputation, explorer, builder, connector, storyteller
  resonances: string[] // concept IDs they resonate with
}
```

---

## 9. BACKEND

### API Endpoints

```
POST /api/chat  — AI chat (Ollama qwen2.5:3b or Gemini)
  Body: { message, language, context?: string }
  Response: { reply, model: "qwen2.5:3b"|"fallback" }

GET /api/nodes  — Get nodes (with filters)
  Query: ?world=atlas&domain=body&level=macro
  Response: { nodes: Concept[] }

GET /api/edges  — Get connections
  Response: { edges: Flow[] }

POST /api/node  — Create node (field world)
  Body: Concept data
  Response: { id, createdAt }

POST /api/edge  — Create connection
  Body: { sourceId, targetId, type, labelRu, labelEn }

POST /api/resonate  — Add resonance
  Body: { nodeId }
  Response: { resonances: number, newStatus?: NodeStatus }

POST /api/carry  — Carry to Me world
  Body: { nodeId }

GET /api/stories?nodeId=X
POST /api/story
```

### Current Backend (universal-api)
- Node: Express on localhost:3001
- PostgreSQL with 402 nodes
- Ollama qwen2.5:3b on port 11434
- Nginx proxy_pass /api/ → localhost:3001

### Keep-Warm
- Ollama scheduled cron every 3 minutes
- First request takes ~15s when model cold; return fallback during load

---

## 10. CURRENT DEPLOYMENT

```
URL:          https://universe.seamless.club/
Server:       nginx, /var/www/universe/
Build:        npx vite build → cp dist/* /var/www/universe/
Source:       /tmp/v13-merged/ (three.js + R3F + Tailwind)
Backend:      /root/universe-api/server.js (Express + Ollama)
Physics:      MyceliumGraph.tsx at /tmp/v13/src/components/
```

### Dependencies
- React 18 + TypeScript + Vite
- Three.js 0.184 + @react-three/fiber 9.6 + @react-three/drei 10.7
- Tailwind CSS + Lucide React icons

### Repository
```
github.com/raisingh-boy/seamless-universe-engine
  TASKS.md                      — 8 tasks for Julius
  FRACTAL_RIVER_ENGINE.md       — River delta connection engine
  SEAMLESS_LIVING_FIELD_ENGINE.md — Full product spec
  BIOMORPHIC_PHYSICS.md         — Boids + Curl Noise physics spec
  FRACTAL_RIVER_FULL_RU.md      — Russian original, 13 parts
```

---

## 11. IMPLEMENTATION PRIORITY

### Sprint 1 (Critical — blocks everything)
1. **Living physics engine** — Boids + Curl Noise + mouse interaction + scatter/reform
2. **Particle flows** — replace edge lines with InstancedMesh particle streams
3. **All 3 worlds** — Atlas clusters / Field disc / Me orbits working correctly
4. **Node LOD + breathing + decay** — visual polish

### Sprint 2 (v1 functionality)
5. **NodeCard** — 4 tabs (Essence/Stories/Minimap/Materials)
6. **Radial menu** — long-press 4 actions
7. **AddSense modal** — 5-step creation flow
8. **Filter shelf** — search, domain, epoch, layers
9. **Vibe mode** — colour/mono/cinematic
10. **Audio player** — mini + full state with timeline

### Sprint 3 (v1 polish)
11. **Onboarding** — 3 slides
12. **Activity feed** — bell notifications
13. **Profile panel** — stats, archetypes, settings
14. **Community agenda** — questions + answers

### Sprint 4 (backend + auth)
15. **Google OAuth** — real login
16. **Supabase** — user data, resonances, carries, field nodes
17. **Admin panel** — export/import JSON, stats

---

## 12. KEY UX FEELING MANIFEST

Every technical detail must serve these feelings:

1. "I'm inside a living ecosystem" — not managing a graph, moving through an environment
2. "When I move an idea, the world rebuilds" — scatter/reform, not rubber bands
3. "Everything breathes" — breathing nodes, flowing particles, living swells
4. "Connections are rivers, not wire" — particle flows with noise, no lines
5. "Time matters" — decay, growth, status evolution
6. "I leave a trace" — resonances, carries, connections
7. "Knowledge is alive" — concepts are born, root, ascend to Atlas
8. "This is a space, not a list" — 3D, physics, spatial memory
