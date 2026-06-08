# Seamless Universe — Complete Task Breakdown

## Priority: Critical (App Doesn't Work Properly)

### Camera & Navigation
- [ ] Fix zoom (scroll wheel currently doesn't zoom smoothly)
- [ ] Fix orbit controls (rotation feels unresponsive)
- [ ] Add navigation buttons (zoom in/out, reset, world switch)
- [ ] Make pan (right-click drag) work reliably

### WebGL Renderer Fixes
- [ ] Debug why camera projection makes nodes look flat (not 3D)
- [ ] Increase node size for visibility
- [ ] Make glow bigger and brighter
- [ ] Add depth fog for 3D feel
- [ ] Fix label positioning (text detaches from nodes)
- [ ] Make labels fade with distance + always face camera

### Physics Stability
- [ ] Reduce chaos on startup (nodes fly apart before settling)
- [ ] Make spiral galaxy layout visible from the start
- [ ] Add smooth transition from initial positions to physics-stable positions

## Priority: High (Core Features Missing)

### Audio Player
- [ ] Rebuild 3-state audio player (collapsed → mini-bar → full)
- [ ] Fix audio not playing (AudioContext blocked on mobile)
- [ ] Add playlist support
- [ ] Connect to real audio files

### AI Integration
- [ ] Connect backend to Gemini API instead of Ollama
- [ ] Fix Gemini quota issue (billing setup)
- [ ] Make AI respond in context of selected node
- [ ] Allow AI to highlight/navigate to nodes

### UI / UX
- [ ] Fix "menus cut off" issue on mobile
- [ ] Make plus (+) button show cards consistently
- [ ] Implement long-press radial menu
- [ ] Add navigation hints layer (tutorial overlay)

## Priority: Medium (New Features)

### Personal Universe Generator
- [ ] Add "+ Universe" button in Personal Universe
- [ ] Support uploading: text, PDF, YouTube, audio, article
- [ ] Backend endpoint: POST /api/generate-universe
- [ ] Backend: POST /api/compare-universe (cross-reference with Atlas)

### Social Features
- [ ] User profiles show "Universes" instead of posts
- [ ] Auto-detect connections between user universes
- [ ] "27 people study similar connections" — social discovery
- [ ] Follow / resonate / carry mechanics

### Gamification
- [ ] Achievement system
- [ ] Streaks for daily exploration
- [ ] Points for resonating, connecting nodes
- [ ] Visual progression (node evolves as you engage)

### Visual Polish
- [ ] Spiral galaxy arm labels (domain names)
- [ ] Timeline slider / epoch navigation
- [ ] Stars background with twinkling
- [ ] node color by domain + status
- [ ] Edge animations (signal pulses)

## Priority: Low (Future)

### Performance
- [ ] LOD (level of detail) — fewer nodes at distance
- [ ] Reduce bundle size further
- [ ] Mobile GPU optimization
- [ ] Memory leak checks

### Platform
- [ ] PWA support (offline mode)
- [ ] iOS / Android webview wrappers
- [ ] Push notifications

