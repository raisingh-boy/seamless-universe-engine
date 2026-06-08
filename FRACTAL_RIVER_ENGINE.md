# FRACTAL RIVER DELTA ENGINE
## Technical specification for organic connection engine

## CORE IDEA

A connection between two concepts is a **river delta in miniature**.

Not a particle stream from point A to point B.
Not a line with noise.

A living system that:
- **Branches** — like the Nile delta or a tree root system
- **Drifts** — the main channel slowly meanders
- **Grows** — a new connection sprouts from source to target over 2–4 seconds
- **Remembers the path** — trodden routes persist and attract new particles
- **Reacts to obstacles** — flows around other concepts like a river around boulders
- **Has scale invariance** — zooming in always reveals a new level of detail

Visual references (in order of importance):
1. River delta from above (Google Maps satellite)
2. Physarum polycephalum slime mold (time-lapse growth)
3. Tree roots visible through soil
4. Slow-motion lightning (branched front)
5. Grass in Ghost of Tsushima (agent-based growth)

## PART 1: BRANCHED FLOW STRUCTURE

### Branch Hierarchy

Each connection is a tree of flows:

```
[A] ──────────────── TRUNK ────────────────── [B]
 | |
 BRANCH-1 BRANCH-2
 | | |
 B1a B1b B2a
 |
 B1a-i
```

| Level | Name | Particles | Opacity | Particle Radius |
|-------|------|-----------|---------|-----------------|
| 0 | Trunk (main channel) | 22 | 1.0 | 1.0x |
| 1 | Primary branches | 12 | 0.65 | 0.70x |
| 2 | Secondary branches | 7 | 0.38 | 0.45x |
| 3 | Tendrils (curls) | 3 | 0.18 | 0.25x |

Branch count depends on **flow strength**:

```
strength < 0.3 → trunk only
strength 0.3–0.5 → trunk + 1-2 primary
strength 0.5–0.7 → + 2-3 secondary
strength 0.7–0.9 → + 3-5 secondary + 2-3 tertiary
strength > 0.9 → + level 3 tendrils (visible only when zoom < 10 units)
```

### Branch Generation Parameters

Each branch:

```typescript
interface Branch {
  level: 0 | 1 | 2 | 3
  spawnProgress: number // where on parent branch this starts (0.0–1.0), random 0.15–0.85
  spawnAngle: number // ±15° – ±45° (higher level = wider angle)
  lengthRatio: number // level1: 0.4–0.7, level2: 0.3–0.55, level3: 0.2–0.4
  noisePhase: number // random 0–2π
  noiseFreq: number // L0: 9.3, L1: 12.7, L2: 18.5, L3: 28.0
  particles: ParticleData[]
}
```

### A Branch Does NOT Go Straight to B

Only **trunk** (level 0) is directed from A to B.

Primary branches (level 1):
- Start at spawn point on trunk
- Directed toward B but at ±20–35° angle
- Reach 60–85% of distance to B
- Then curve parallel to trunk or return to it
- Effect: "multiple delta arms"

Secondary (level 2):
- Even more deviated
- Not directed to B — they're "side channels", just flow and fade
- May curve back to trunk ("oxbow lakes")

Tertiary (level 3):
- Purely local curls and wisps
- Slow, nearly static, dim

## PART 2: PATH PHYSICS (MEANDER)

### Control Points

Trunk is defined not by two points (A, B) but by a **chain of control points**:

```
A ── cp1 ── cp2 ── cp3 ── cp4 ── B
```

Count = floor(edgeLength / 25) + 2, minimum 3.

Each cp_i:
- Base position: linear interpolation A→B
- Current offset: (offsetX, offsetY) — drifts over time
- Drift velocity: (driftVx, driftVy) — very small

### Control Point Drift (Meandering)

Each frame each control point:

```
erosionForce = perpendicularToEdge × sin(time × 0.08 + cpIndex × 1.4) × 0.0025
brownian = (random() - 0.5) × 0.0008
elasticity = (basePosition - currentOffset) × 0.0015

driftVx += erosionForce.x + brownian + elasticity.x
driftVy += erosionForce.y + brownian + elasticity.y
driftVx *= 0.985
driftVy *= 0.985
offsetX += driftVx
offsetY += driftVy

maxOffset = edgeLength × 0.30
offsetX = clamp(offsetX, -maxOffset, maxOffset)
offsetY = clamp(offsetY, -maxOffset, maxOffset)
```

### Obstacle Avoidance

Check **all other concepts** when computing control point position:

```
for each foreign node N (not A, not B):
  distToCP = distance(cp_i, N.position)
  if distToCP < avoidRadius:
    repulsion = (cp_i - N.position).normalize() × avoidForce
    driftVx += repulsion.x
    driftVy += repulsion.y

avoidRadius = N.currentRadius × SCALE × 3.5
avoidForce = 0.006 × (1 - distToCP / avoidRadius)²
```

### Parallel Flow Attraction (Bundling)

If two flows pass close (< 0.4 units):
- Slight attraction toward center between them
- bundleForce = 0.001
- Creates "game trail" effect

## PART 3: GROWTH ANIMATION

When a new connection is created, it **grows** from A to B.

### Growth Algorithm

```
growthState: 'dormant' | 'sprouting' | 'branching' | 'alive' | 'dying'

Phase sprouting (0.0 → 1.0, 2–4 seconds):

1. Calculate growth speed:
  baseGrowthSpeed = 0.012 + random_noise × 0.006
  if (sin(time × 8.3 + seed) > 0.7): growthSpeed = 0 (pause 0.1–0.3s)
  else: growthSpeed = baseGrowthSpeed × (1 + strength × 0.5)

2. growthFront += growthSpeed, min(1.0, growthFront)

3. Render only particles where particle.progress ≤ growthFront
  Front particles: opacity × sin(particle.progress / growthFront × π)

4. At growthFront > 0.25: start adding primary branches
5. At growthFront = 1.0: start adding secondary branches
```

## PART 4: SCALE INVARIANCE (FRACTAL)

### LOD by Zoom, Not Distance

```
camera.distance > 40: trunk only (L0)
camera.distance 25–40: + primary branches (L1)
camera.distance 12–25: + secondary branches (L2)
camera.distance < 12: + tertiary tendrils (L3)
```

### Recursive Noise

```
L0 (trunk): noiseFreq = 9.3, amplitude = noiseScale × 1.0
L1: noiseFreq = 17.1, amplitude = noiseScale × 0.65
L2: noiseFreq = 31.7, amplitude = noiseScale × 0.40
L3: noiseFreq = 58.3, amplitude = noiseScale × 0.22
```

## PART 5: CONFLUENCE DYNAMICS

Every 30 frames, check:
- For each pair of flows (A→B) and (C→D)
- If trunk paths pass closer than 0.35 units over >20% of length

On detection, create **confluence event**:
1. Eddy: 6–12 particles in small circle (~0.2 units radius), rotating 2–4 rps
2. Expanding ripple: 2–3 thin rings from confluence point
3. Mutual path attraction: trunks run parallel 0.1–0.15 units apart

### Bifurcation at Obstacles

If trunk passes through a concept's "shadow" (< 1.5× radius):
- Flow splits into 2 arms around the obstacle
- Rejoin after obstacle
- Visual: flow "flows around an island"

## PART 6: SURFACE EMISSION

Particles are born from the **surface** of a concept, not center point:
```
emissionPoint = centerA + sphereRadius × emissionDir
emissionDir rotates slowly on surface
```

## PART 7: FLOW LIFE STATES

```
dormant → sprouting → branching → active → stabilizing → aging → fading → dead
```

Dead flows are NOT deleted. They can resurrect (comeback effect).

## PART 8: SCATTER AND REFORM

When a concept moves > 1.5 units:
1. **Rupture (0–0.3s)**: particles scatter from moved node
2. **Search (0.3s–reform×0.6)**: scattered particles fade, control points seek new positions
3. **Rejoin**: new path grows (2× faster than initial growth)

## PART 9: RENDERING

Each **branch** = one `THREE.InstancedMesh`.
Material: `MeshBasicMaterial, AdditiveBlending, depthWrite: false`.

## PART 10: USER FEEL

✓ "I'm moving a rock in a river"
✓ "Something is always happening"
✓ "Living ecosystem, not a diagram"
✓ "Zoom reveals new detail"
✓ "Flows are born and die"
✓ "Every flow has its own character"

historical — slow, wide, majestic
resonance — pulsing, warm amber, fast
opposition — nervous, jagged, red, chaotic
practical — businesslike, green, rhythmic
