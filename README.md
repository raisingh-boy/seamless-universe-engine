# Seamless Universe

A 3D knowledge graph exploring connections between somatic practices, science, philosophy, cognition, movement, and performance.

## Architecture

- **Frontend**: React + TypeScript + Vite + WebGL2 (custom engine from Claude)
- **Backend**: Node.js + Express + PostgreSQL
- **AI**: Uses Ollama (qwen2.5:3b) with fallback; Gemini 2.0 Flash pre-configured

## Structure

```
src/
├── engine/          # WebGL2 renderer (custom shaders, camera, physics)
├── components/      # React components (WebGLGraph, AudioPlayer, AddSenseModal)
├── api/             # API clients (universeApi, nodeSounds)
├── data/            # Node/edge data files
├── types.ts         # TypeScript type definitions
└── utils.ts         # Shared utilities (epoch helpers)
```

## Quick Start

```bash
npm install
npm run dev
```

Backend:
```bash
cd /root/universe-api
npm install
node server.js
```

