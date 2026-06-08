# SEAMLESS UNIVERSE — ПОЛНАЯ ТЕХНИЧЕСКАЯ СПЕЦИФИКАЦИЯ
## Rebuild v2.0 — Living Field Engine

### Original from Roman Singh, 8 June 2026
### 16 секций, полное описание продукта

## СОДЕРЖАНИЕ

1. Концепция и философия
2. Архитектура данных (Concept, Flow, Story, Article, Recording, AgendaQuestion, CommunityUser)
3. Движок визуализации (Three.js + R3F)
4. Физика и поведение (гравитация 0.045, репульсия 2200, damping 0.82)
5. Визуальные объекты (геометрия по типу, цвета по домену, LOD, выделение, glow)
6. Целевые позиции (Atlas кластеры, Field диск, Me орбиты)
7. Взаимодействия (навигация, клик, long-press, drag в 3D)
8. UI: все панели (header, фильтры, NodeCard, AddSenseModal, профиль, 
   повестка, аудиоплеер, онбординг, vibe mode, уведомления, радиальное меню)
9. Миры: Atlas / Field / Me
10. Фильтрация и поиск
11. Механики эволюции (жизненный цикл, decay, сила потоков)
12. Данные: контент (170+ концепций, 60+ связей)
13. Технический стек (React, Three.js, Vite, Tailwind)
14. Responsive (breakpoint 768px)
15. Цветовая система
16. UX Манифест (8 ключевых ощущений)

## КЛЮЧЕВЫЕ ПАРАМЕТРЫ

Физика:
- gravityStrength: 0.045
- repulsionStrength: 2200
- attractionStrength: 0.038
- damping: 0.82
- swellAmplitude: 0.16 XY, 0.10 Z

Потоки:
- 22 частицы на поток (28 для resonance, 18 для opposition)
- Путь: A→B + 3-октавный шум (freq 9.3, 17.1, 31.9)
- InstancedMesh рендеринг
- Scatter & Reform при смещении > 1.5 ед.

### Полный текст см. в inbound-файле: seamless-universe-spec-1
### Fractal River Delta Engine: FRACTAL_RIVER_ENGINE.md
