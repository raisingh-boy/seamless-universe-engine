# V13 Merge Plan — Seamless Universe

## База
**v13 от AI Studio** — Three.js + Bloom постпроцессинг. Чистый UI, AudioPlayer с таймлайном, AddSenseModal упрощённый.
Расположение: `/root/.openclaw/nextcloud_data/data/admin/files/Offer/Universe /seamless-universe (13).zip`

## Что нужно накатить (из нашей рабочей версии)

### 1. Монохром / Cinematic переключение (#1 priority UX)
**Откуда:** `/root/.openclaw-personal/workspace/seamless-v12-fix/src/App.tsx`
- Header: три состояния (colour → mono → cinematic)
- Передаётся в MyceliumGraph как `vibeMode` prop
- В MyceliumGraph: при `mono` — grayscale цвета, при `cinematic` — контрастные

### 2. Аудиоплеер: 3 состояния (#2 priority UX)  
**Откуда:** наш AudioPlayer.tsx + App.tsx
- Collapsed: маленькая иконка в углу (paused)
- Mini-bar: полоска с названием и play/pause (playing)
- Full player: прогресс-бар, плейлист, громкость
- Плавная анимация между состояниями
- AudioContext создаётся по первому жесту

### 3. Mobile: footer fixed, z-index (#3 priority UX)
**Откуда:** наш App.tsx
- Footer: `fixed bottom-0 left-0 right-0 z-40`
- Main content: `pb-16` (padding для footer)
- Все z-index: header < footer < modal < AI overlay

### 4. Физика: стабильная (#4 priority)
**Откуда:** `seamless-v12-fix/src/components/MyceliumGraph.tsx`
- Repulsion: 1300 (было 2200)
- Gravity: 0.065
- Damping: 0.88
- Начальный разброс: ±3 (было ±18)

### 5. AI Integration (#5 priority)
**Откуда:** весь бэкенд + nginx
- nginx: `location /api/ { proxy_pass http://localhost:3001; }`
- Backend: server.js с AbortController (30s таймаут)
- Fallback ответ при холодном старте Ollama
- Keep-alive каждые 2 минуты
- Gemini API (код готов, ждёт billing)

### 6. Galaxy layout: 6 domain arms (#6)
**Откуда:** наш MyceliumGraph.tsx galaxyLayout/6 созвездий
- body=0°, science=60°, philosophy=120°, cognition=180°, movement=240°, hybrid=300°
- macro → центр, micro → периферия

### 7. Ghost nodes (#7)
**Откуда:** nodesData.ts
- Серые, полупрозрачные, пульсируют через opacity
- Отличаются от реальных нод (isGhost флаг)

### 8. Edge particles (#8)
**Откуда:** Edge3D компонент в нашем MyceliumGraph.tsx
- 5 типов рёбер: historical (серая), conceptual (стандарт), practical (зелёная пульсация), resonance (золотая), opposition (красная)
- Анимированные частицы (dot) вдоль рёбер

### 9. Long-press → Radial Menu (#9)
**Откуда:** App.tsx
- 4 кнопки вокруг ноды: ♦ Резонирую, ⟷ Связать, ↗ В мой мир, + История
- Триггер: зажать ноду >650мс

### 10. ErrorBoundary + glError
**Откуда:** WebGLGraph.tsx (но адаптировать под Three.js)
- ErrorBoundary обёртка вокруг MyceliumGraph
- Показывает сообщение если Three.js упал
- Retry button

### 11. Цвет нод по доменам + статусу
**Откуда:** наш MyceliumGraph.tsx
- Domain → цвет (body/amber, science/blue, philosophy/purple, etc.)
- Status → размер + прозрачность (rooted > active > seedling > seed)
- Level → размер (macro > meso > micro)
- Decay: полевые ноды угасают после 30 дней

### 12. Brain → внутри плюса
- Убираем отдельную 🧠 кнопку
- В AddSenseModal две вкладки: "Мост" (Connect) и "Предложить" (Suggest/AI)
- AI живёт внутри окна плюсика

## Порядок действий
1. Скопировать v13 как основу
2. Накатить: монохром → аудиоплеер → mobile → физика
3. Накатить: AI → galaxy → ghost → edges
4. Накатить: long-press → error → цвета → brain in plus
5. Протестировать сборку (npm run build)
6. Задеплоить

## Файлы для замены/мержа
- `App.tsx` — мерж (монохром, footer, audio state, AI)
- `MyceliumGraph.tsx` — мерж (физика, galaxy, edge, ghost, monochrome prop)
- `AudioPlayer.tsx` — заменить на наш (3 состояния + timeline от v13)
- `AddSenseModal.tsx` — заменить на v13 + AI tabs
- `NodeCard.tsx` — оставить v13
- `nodesData.ts` — взять ghost nodes из нашего
- `index.css` — взять наш (fixed footer, mobile)
- `server.js` — взять наш (AI proxy, fallback)
