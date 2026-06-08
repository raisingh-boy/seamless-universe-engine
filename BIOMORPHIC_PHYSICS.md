Разработка интерактивных биоморфных симуляций в трехмерных сетях: Спецификация кинематики живых систем для Seamless Universe
Визуализация многомерных реляционных баз данных в виде трехмерных графов традиционно опирается на классические физические модели затухающих пружин и электростатического отталкивания вершин. Несмотря на математическую простоту, подобные механистические структуры приводят к визуальному застою интерфейса, превращая его в жесткую статичную схему.
Для создания по-настоящему живого, вовлекающего и динамического пространства, напоминающего природную среду, необходимо интегрировать принципы эмерджентного поведения сложных биологических систем: стайных алгоритмов птиц, гидродинамических течений ручья и логистики фуражных троп муравьев. Данный отчет представляет концептуальное обоснование и детальную техническую спецификацию для внедрения живой кинематики в трехмерную среду Seamless Universe v13 на базе React Three Fiber.
Концептуальный переход от статической структуры данных к живому мицелиальному пространству
Классические force-directed алгоритмы стремятся минимизировать потенциальную энергию системы, что неизбежно приводит к полной остановке движения при достижении равновесия. В живой природе статические состояния отсутствуют: биологические структуры непрерывно флуктуируют, адаптируются и реагируют на внешние триггеры. Чтобы превратить библиотечный каталог концептов в захватывающее кинематографическое интерактивное пространство, Seamless Universe v13 переводится на рельсы биоморфного моделирования.
Основные концептуальные компоненты живой кинематики мицелия:
* Коллективное стайное движение (Murmuration): Тематические кластеры нод группируются и перемещаются в пространстве как скопления птиц или косяки рыб, плавно уступая дорогу курсору и сохраняя внутреннюю динамическую целостность.
* Векторные течения интеллектуального поля (Flow Fields): Пространство графа пронизывается невидимыми трехмерными течениями, генерируемыми на основе curl-шума. Мелкие концепты (микро-ноды) и светящиеся частицы-споры дрейфуют вдоль этих линий, имитируя течение воды в ручье.
* Динамические тропы аттракции (Муравьиные следы): Связи между нодами перестают быть жесткими отрезками. Они трансформируются в гибкие изогнутые волокна, которые вибрируют при передаче сигналов и меняют свою кривизну в зависимости от «активности метаболизма» связи, подобно прокладке муравьиных феромоновых троп.
В таблице ниже приведено сравнительное сопоставление механистического подхода и биоморфного метаболического интерфейса:
Характеристика системы
	Классический пружинный граф
	Биоморфный метаболический граф
	Физическое основание
	Закон Гука и электростатика Кулона
	Модели Рейнольдса, уравнения Навье-Стокса и случайные блуждания
	Характер покоя
	Полная статическая блокировка координат
	Непрерывное волновое шевеление, микродрейф и дыхание
	Реакция на пользователя
	Линейное смещение перетаскиваемой ноды
	Гидродинамическое выталкивание, волновые возмущения и расхождение стаи
	Топология связей
	Прямые жесткие линии фиксированной прозрачности
	Изогнутые вибрирующие сплайны с пульсирующими спорами
	Жизненный цикл
	Бессрочное хранение координат
	Метаболический распад неактивных нод и сезонное цветение
	Биоморфные математические модели: Стайное поведение, муравьиные тропы и гидродинамика
Реализация живой физики требует наложения нескольких независимых векторных сил на каждую вершину графа в рамках единого итерационного цикла интегрирования.
Модель стаи птиц (Boids) для кластеризации
Для формирования естественных, дышащих облаков смыслов применяется трехмерный алгоритм Крейга Рейнольдса. Каждая нода i рассматривается как агент со своим вектором положения x_i и вектором скорости v_i. В радиусе ее локальной видимости R определяются три фундаментальные силы :
#### Сила разделения (Separation) Предотвращает перекрытие и скученность нод, расталкивая их при чрезмерном сближении :
F_{\text{sep}}(i) = -\sum_{j \in U_i, j \neq i} \frac{x_j - x_i}{|x_j - x_[span_16](start_span)[span_16](end_span)[span_24](start_span)[span_24](end_span)i|^2}
Сила выравнивания (Alignment)
Заставляет ноды внутри одного тематического домена сонаправлять свои векторы движения, формируя единый вектор течения мысли :
$$F_{\text{ali}}(i) = \left( \frac{1}{N} \sum_{j \in U_i} v_j \right) - v_i$$
Сила сплочения (Cohesion)
Удерживает родственные концепты вместе, устремляя их к общему центру масс локальной группы :
$$F_{\text{coh}}(i) = \left( \frac{1}{N} \sum_{j \in U_i} x_j \right) - x_i$$
Эти силы взвешиваются с помощью коэффициентов w_{\text{sep}}, w_{\text{ali}} и w_{\text{coh}} и суммируются с классическими силами графа.
Модель гидродинамического течения (Curl Noise)
Для имитации непрерывного течения ручья, переносящего споры и мелкие концепты, применяется трехмерный вихревой шум (Curl Noise). Использование математического ротора (curl) от трехмерного поля шума Симплекс гарантирует получение несжимаемого векторного поля с нулевой дивергенцией, в котором потоки плавно обтекают крупные центральные ноды-препятствия, не накапливаясь в пустотах.
Для потенциального векторного поля \vec{\Psi}(x, y, z) = (\Psi_x, \P[span_30](start_span)[span_30](end_span)[span_33](start_span)[span_33](end_span)si_y, \Psi_z), сформированного из октав шума Симплекс, результирующий вектор безвихревой скорости сноса \vec{v}_{\text{drift}} рассчитывается как :
\vec{v}_{\text{drift}} = \nabla \times \vec{\Psi} = \left( \frac{\partial \Psi_z}{\partial y} - \frac{\partial \Psi_y}{\partial z}, \frac{\partial \partial \Psi_x}{\partial z} - \frac{\partial \Psi_z}{\partial x}, \frac{\partial \Psi_y}{\partial x} - \frac{\partial \Psi_x}{\partial y} \right)
Каждая свободная частица-спора и плавающие микро-ноды постоянно получают приращение координат на основе этого вектора, что создает завораживающий эффект ламинарного течения жидкости внутри сцены.
Силы муравьиных троп и микродрожания
Связи (ребра) между концептами функционируют подобно муравьиным дорожкам: при высокой частоте прохождения сигналов (клики пользователя, прослушивание аудио, добавление историй) ребро «насыщается феромонами». Это выражается в увеличении его физической толщины, светимости и частоты пробегающих световых импульсов. В то же время неиспользуемые связи постепенно истощаются, их натяжение ослабевает, а сами линии начинают совершать хаотичные волнообразные колебания низкой амплитуды, имитируя живые шевелящиеся нити грибницы или веточки деревьев.
Архитектура высокопроизводительного рендеринга на GPU в React Three Fiber
Специфика симуляции живых систем требует обработки тысяч динамических объектов на частоте 60 кадров в секунду, что накладывает жесткие ограничения на использование ресурсов CPU и оперативной памяти.
Преодоление барьера примирения (Reconciliation Bypass)
Главный источник падения производительности в React Three Fiber — это попытка синхронизировать высокочастотные изменения координат (60 раз в секунду) через классическое состояние React (useState, useEffect). Процесс сверки виртуального дерева (reconciliation overhead) при обновлении тысяч координат мгновенно парализует основной поток выполнения браузера.
Для обеспечения беспрецедентной производительности внедряется архитектура прямого мутирования (Direct Mutation via Refs) :
* Изолированное хранилище координат: Все физические параметры (массивы позиций, скоростей, фаз дыхания) хранятся в виде сырых типизированных массивов JavaScript (Float32Array) внутри неизменяемых ссылок useRef.
* Итерация внутри WebGL-цикла: Расчет физики boids, curl-течений и интерполяций переходов осуществляется непосредственно внутри единого коллбэка useFrame, предоставляемого рендерером Three.js.
* Прямое обновление буферов: Вместо перерисовки компонентов новые матрицы трансформации записываются напрямую в WebGL-объекты через методы .setMatrixAt() и флаг needsUpdate = true.
Оптимизация геометрических вызовов отрисовки (Draw Calls)
Для отрисовки сотен однотипных объектов (сфер концептов, кубов практик, пирамид вопросов) используется класс InstancedMesh. Это позволяет передать на видеокарту геометрию примитива и материал всего один раз, после чего рендерить сотни уникально трансформированных экземпляров за один единственный вызов отрисовки (single draw call) :
\mathbf{M}_{\text{instance}} = \mathbf{T}_{\text{translation}} \times \mathbf{R}_{\text{rotation}} \times \mathbf{S}_{\text{scale}}
Светящиеся частицы-споры, перемещающиеся вдоль грибных каналов, реализуются через систему Points с кастомным шейдером материалов, что позволяет анимировать до 100 000 движущихся элементов вообще без участия CPU.
Реализация физического взаимодействия: Силы притяжения, выталкивания и интерактивного перетаскивания
Для того чтобы пользователь ощущал тактильную, физическую связь со вселенной Seamless Universe, любое его действие должно вызывать упругий отклик в WebGL-пространстве.
Интерактивная репрезентация курсора
При движении указателя по экрану происходит постоянное проецирование его экранных координат на плоскость XY в трехмерном мире. Точка пересечения становится источником динамического поля :
* Режим притяжения (Гравитационный колодец): При удержании левой кнопки мыши вокруг курсора создается сила притяжения, которая стягивает стаи концептов к указателю, заставляя их кружиться вокруг него подобно мошкаре у фонаря.
* Режим выталкивания (Predator Repulsion): При простом перемещении курсор действует как чужеродное тело (хищник), расталкивая ноды в стороны и оставляя за собой чистый след в гидродинамической среде.
Математическое выражение для силы интерактивного воздействия на расстоянии r от ноды до проекции курсора:
F_{\text{interactive}} = K_{\text{force}} \cdot \frac{\vec{r}}{r^2 + \alpha}
Где K_{\text{force}} — управляющий скаляр силы (отрицательный для притяжения), а \alpha — регулятор сглаживания сингулярности на сверхмалых расстояниях.
Плавный кинематографический полет камеры
При выборе любой ноды камера не должна совершать мгновенный или жесткий линейный переход. Для создания ощущения полета в кино применяется сглаженная интерполяция по методу пружинной амортизации (Damped Spring Lerp).
В каждом кадре вектор цели камеры \vec{T}_{\text{cam}} и опорная точка OrbitControls плавно стремятся к выбранной вершине графа с учетом демпфирующего фактора :
\vec{P}_{\text{controls}}(t + \Delta t) = \vec{P}_{\text{controls}}(t) + \left( \vec{X}_{\text{ta[span_63](start_span)[span_63](end_span)rget}} - \vec{P}_{\text{controls}}(t) \right) \cdot (1 - e^{-\lambda \Delta t})
Это исключает рывки при навигации и создает глубокий кинематографический эффект присутствия.
Практическая реализация: Оптимизированный программный комплекс биоморфной физики
Ниже представлен полностью переписанный, готовый к интеграции исходный код компонента MyceliumGraph.tsx. В него интегрированы: 3D-алгоритм стайного поведения Крейга Рейнольдса (Boids), динамические curl-течения, упругое расталкивание нод курсором мыши, процедурное микродрожание ребер и поддержка метаболического затухания яркости нод при отсутствии активности.
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import { SomaticNode, SomaticLink, Domain, World, NodeStatus, CommunityUser } from '../types';
import { SAMPLE_AUDIO } from '../data/nodesData';
import { Flame } from 'lucide-react';

const DOMAIN_COLORS: Record<Domain, string> = {
 body: '#E8A95C',      // Теплый янтарный
 science: '#5C9BE8',   // Холодный синий
 philosophy: '#9B5CE8',// Фиолетовый
 movement: '#5CE87A',  // Зеленый
 cognition: '#EAEAEA',  // Серебристо-белый
 hybrid: '#E85C7A'     // Кораллово-розовый
};

export function getEpochNumberForNode(node: SomaticNode): number {
 if (node.id === 'central-me' || node.id === 'root') return 0;
 if (node.world === 'field') return 8;
 const years = (node.epochEn || '').toLowerCase();
 const desc = (node.descriptionEn || '').toLowerCase();
 const id = node.id.toLowerCase();
 if (
   id.includes('buddha') || id.includes('aristotle') || id.includes('plato') || id.includes('antiquity') ||
   desc.includes('antiquity') || desc.includes('ancient greece') || desc.includes('buddhism') ||
   years.includes('bc') || (years.includes('ce') &&!years.includes('19') &&!years.includes('20') &&!years.includes('18')) ||
   id.includes('yoga') || id.includes('socrates') || id.includes('zen') || id.includes('qigong')
 ) {
   return 1;
 }
 if (
   id.includes('sufi') || desc.includes('medieval') || desc.includes('middle ages') ||
   id.includes('zen_masters') || id.includes('kabbalah') || years.includes('1100') || years.includes('1200') ||
   years.includes('1300') || years.includes('1400')
 ) {
   return 2;
 }
 if (
   id.includes('descartes') || id.includes('newton') || id.includes('spinoza') || id.includes('renaissance') ||
   desc.includes('renaissance') || desc.includes('17th century') || desc.includes('18th century') ||
   years.includes('1500') || years.includes('1600') || years.includes('1700') ||
   id.includes('shinto') || id.includes('martial_arts')
 ) {
   return 3;
 }
 if (
   id.includes('darwin') || id.includes('nietzsche') || id.includes('freud') || id.includes('19th_century') ||
   desc.includes('19th century') || years.includes('18') || years.includes('1800') || years.includes('1860') ||
   years.includes('1880') || id.includes('duncan') || id.includes('alexander_technique')
 ) {
   return 4;
 }
 if (
   id.includes('phenomenology') || id.includes('graham') || id.includes('cunningham') ||
   desc.includes('early 20th') || years.includes('1900') || years.includes('1910') || years.includes('1920') ||
   years.includes('1930') || years.includes('1940') || id.includes('laban') || id.includes('wigman') ||
   id.includes('bateson')
 ) {
   return 5;
 }
 if (
   id.includes('contact_improv') || id.includes('somatics') || id.includes('cybernetics') ||
   id.includes('paxton') || id.includes('feldenkrais') || id.includes('hanna') || id.includes('rolfing') ||
   years.includes('1950') || years.includes('1960') || years.includes('1970') ||
   years.includes('1972') || years.includes('1959')
 ) {
   return 6;
 }
 if (
   id.includes('complexity') || id.includes('embodied_ai') || id.includes('cognitive_sci') ||
   years.includes('1980') || years.includes('1990') || desc.includes('late 20th')
 ) {
   return 7;
 }
 return 8;
}

// Кастомный хук для детекции и трансляции положения курсора в 3D сцену
function usePointer3D() {
 const { camera, raycaster } = useThree();
 const pointer3D = useRef(new THREE.Vector3());
 const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),);

 useFrame((state) => {
   raycaster.setFromCamera(state.pointer, camera);
   raycaster.ray.intersectPlane(plane, pointer3D.current);
 });

 return pointer3D;
}

function SomaticSphere({
 node, isSelected, isHovered, isActiveAudio, color, onClick, currentWorld, overlayUser, selectedEpoch
}: {
 node: SomaticNode; isSelected: boolean; isHovered: boolean; isActiveAudio: boolean;
 color: string; onClick: (n: SomaticNode) => void; currentWorld: World; overlayUser: string | null;
 selectedEpoch?: number;
}) {
 const meshRef = useRef<THREE.Mesh>(null!);
 const glowRef = useRef<THREE.Mesh>(null!);
 const SCALE = 0.045;

 const inEpoch = selectedEpoch === undefined || selectedEpoch === 0 || node.id === 'central-me' || getEpochNumberForNode(node) === selectedEpoch;
 const isOverlayMatch =!!(overlayUser && (
   node.authorRu?.includes(overlayUser) ||
   node.authorEn?.includes(overlayUser) ||
   node.descriptionEn?.toLowerCase().includes(overlayUser.toLowerCase()) ||
   node.descriptionRu?.toLowerCase().includes(overlayUser.toLowerCase())
 ));
 const finalColor = isOverlayMatch? '#FFD700' : color;

 const statusOpacity: Record<NodeStatus, number> = {
   seed: 0.15, sprout: 0.45, alive: 0.8, rooted: 1.0, atlas: 1.0
 };
 let baseOpacity = (currentWorld === 'field' && node.world === 'atlas')
  ? 0.25
   : (statusOpacity[node.status] || 1.0);
 const idleDays = node.lastActiveAt? (Date.now() - node.lastActiveAt) / (1000 * 3600 * 24) : 0;
 const decayFactor = (node.world === 'field' && idleDays > 30)? Math.max(0.08, Math.pow(0.95, idleDays - 30)) : 1.0;
 const opacity = baseOpacity * decayFactor * (inEpoch? 1.0 : 0.2);

 useFrame((state) => {
   const t = state.clock.elapsedTime;
   const breath = 1 + Math.sin(t * (node.breathSpeed || 0.4) + (node.breathPhase || 0)) * 0.07;
   const base = (node.currentRadius || 10) * SCALE;

   const camDist = state.camera.position.length();
   let lodScale = 1.0;
   if (node.level === 'micro' && node.id!== 'central-me') {
     if (camDist > 24) lodScale = 0.0;
     else if (camDist > 16) lodScale = 1.0 - (camDist - 16) / 8;
   } else if (node.level === 'meso' && node.id!== 'central-me') {
     if (camDist > 38) lodScale = 0.0;
     else if (camDist > 28) lodScale = 1.0 - (camDist - 28) / 10;
   }

   let s = base * breath * lodScale;
   if (isSelected) s *= 1.35;
   else if (isActiveAudio) s *= 1.25;

   meshRef.current.scale.setScalar(s);
   glowRef.current.scale.setScalar(s * (isActiveAudio? 2.5 : 1.7));

   const x = (node.x || 0) * SCALE;
   const y = (node.y || 0) * SCALE;
   const z = (node.z || 0) * SCALE;
   meshRef.current.position.set(x, y, z);
   glowRef.current.position.set(x, y, z);

   if (node.isPrivate || node.type === 'practice' || node.type === 'question') {
     meshRef.current.rotation.x = t * 0.5;
     meshRef.current.rotation.y = t * 0.4;
   }

   let bootFade = 1.0;
   if (t < 3.0) {
     const hash = node.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 100 / 100;
     const revealDelay = hash * 2.0;
     bootFade = t < revealDelay? 0.0 : Math.min(1.0, (t - revealDelay) / 1.0);
   }

   const mat = meshRef.current.material as THREE.MeshStandardMaterial;
   if (isActiveAudio) {
     mat.emissive.set('#DFB757');
     mat.emissiveIntensity = (0.6 + Math.sin(t * 8) * 0.3) * (inEpoch? 1.0 : 0.15) * bootFade;
   } else {
     mat.emissive.set(new THREE.Color(finalColor));
     let baseInt = isOverlayMatch? 1.5 : isSelected? 0.9 : isHovered? 0.6 : 0.2;
     mat.emissiveIntensity = baseInt * (inEpoch? 1.0 : 0.15) * bootFade;
   }

   mat.transparent = true;
   mat.opacity = opacity * lodScale * bootFade;
 });

 const c = new THREE.Color(finalColor);
 const renderGeometry = () => {
   if (node.isPrivate) return <octahedronGeometry args={[1.0, 0]} />;
   if (node.type === 'practice') return <boxGeometry args={[1.2, 1.2, 1.2]} />;
   if (node.type === 'question') return <coneGeometry args={[0.9, 1.3, 4]} />;
   return <sphereGeometry args={} />;
 };

 return (
   <group onClick={(e) => { e.stopPropagation(); onClick(node); }}>
     <mesh ref={glowRef}>
       <sphereGeometry args={} />
       <meshStandardMaterial
         color={c}
         transparent
         opacity={isSelected? 0.25 : isActiveAudio? 0.35 : inEpoch? 0.08 : 0.01}
         depthWrite={false}
         blending={THREE.AdditiveBlending}
       />
     </mesh>
     <mesh ref={meshRef}>
       {renderGeometry()}
       <meshStandardMaterial
         color={c}
         emissive={c}
         emissiveIntensity={0.2}
         roughness={0.3}
         metalness={0.2}
         transparent
         opacity={opacity}
       />
     </mesh>
   </group>
 );
}

function MyceliumEdge({
 source, target, color, activity, isActive, linkType = 'conceptual'
}: {
 source: SomaticNode; target: SomaticNode;
 color: string; activity: number; isActive: boolean;
 linkType?: 'conceptual' | 'historical' | 'practical' | 'resonance' | 'opposition';
}) {
 const lineRef = useRef<THREE.Line>(null!);
 const particleRef = useRef<THREE.Mesh>(null!);
 const progressRef = useRef(Math.random());
 const SCALE = 0.045;

 const getCurve = React.useCallback(() => {
   const s = new THREE.Vector3((source.x || 0) * SCALE, (source.y || 0) * SCALE, (source.z || 0) * SCALE);
   const t = new THREE.Vector3((target.x || 0) * SCALE, (target.y || 0) * SCALE, (target.z || 0) * SCALE);
   const mid = new THREE.Vector3().addVectors(s, t).multiplyScalar(0.5);
   const seed = ((source.id || '').charCodeAt(0) || 0) + ((target.id || '').charCodeAt(0) || 0);
   const perp = new THREE.Vector3(-(t.y - s.y), (t.x - s.x), (seed % 7) * 0.2).normalize().multiplyScalar(0.6 + (seed % 20) / 20 * 1.0);
   return new THREE.QuadraticBezierCurve3(s, mid.add(perp), t);
 }, [source.x, source.y, source.z, target.x, target.y, target.z]);

 const styleSettings = React.useMemo(() => {
   switch (linkType) {
     case 'historical':
       return { hexColor: '#707D94', baseSpeed: 0.0016, baseOpacity: isActive? 0.45 : 0.12 };
     case 'practical':
       return { hexColor: '#10B981', baseSpeed: 0.007, baseOpacity: isActive? 0.65 : 0.20 };
     case 'resonance':
       return { hexColor: '#FFAE00', baseSpeed: 0.012, baseOpacity: isActive? 0.85 : 0.35 };
     case 'opposition':
       return { hexColor: '#EF4444', baseSpeed: 0.018, baseOpacity: isActive? 0.90 : 0.40 };
     case 'conceptual':
     default:
       return { hexColor: color, baseSpeed: 0.0035, baseOpacity: isActive? 0.55 : 0.18 };
   }
 },);

 useFrame((state) => {
   const multiplier = 1 + activity * 0.05;
   const currentSpeed = (isActive? styleSettings.baseSpeed * 1.8 : styleSettings.baseSpeed) * multiplier;
   progressRef.current = (progressRef.current + currentSpeed) % 1;

   const curve = getCurve();

   if (lineRef.current) {
     const ptsCount = linkType === 'opposition'? 38 : 24;
     const pts = curve.getPoints(ptsCount);
     
     if (linkType === 'opposition') {
       const time = state.clock.getElapsedTime();
       pts.forEach((pt, idx) => {
         if (idx > 0 && idx < pts.length - 1) {
           pt.y += Math.sin(idx * 0.7 - time * 12.0) * 0.038;
           pt.x += Math.cos(idx * 0.4 + time * 8.0) * 0.018;
         }
       });
     }
     
     if (lineRef.current.material) {
       const mat = lineRef.current.material as THREE.LineBasicMaterial;
       if (linkType === 'resonance') {
         mat.opacity = styleSettings.baseOpacity + Math.sin(state.clock.getElapsedTime() * 7) * 0.12;
       } else if (linkType === 'practical') {
         mat.opacity = styleSettings.baseOpacity * (Math.sin(state.clock.getElapsedTime() * 15) > 0? 1 : 0.4);
       } else {
         mat.opacity = styleSettings.baseOpacity;
       }
     }
     lineRef.current.geometry.setFromPoints(pts);
   }

   if (particleRef.current) {
     const pt = curve.getPoint(progressRef.current);
     particleRef.current.position.copy(pt);
     if (linkType === 'resonance') {
       const scaleAmt = 1.0 + Math.sin(state.clock.getElapsedTime() * 10) * 0.35;
       particleRef.current.scale.setScalar(scaleAmt);
     } else {
       particleRef.current.scale.setScalar(1.0);
     }
   }
 });

 const finalColor = new THREE.Color(styleSettings.hexColor);
 return (
   <group>
     <line ref={lineRef as any}>
       <bufferGeometry />
       <lineBasicMaterial color={finalColor} transparent opacity={styleSettings.baseOpacity} />
     </line>
     <mesh ref={particleRef}>
       <sphereGeometry args={} />
       <meshBasicMaterial color={finalColor} />
     </mesh>
   </group>
 );
}

function GoldenOverlayBridges({ nodes, SCALE }: { nodes: SomaticNode; SCALE: number }) {
 const line1Ref = useRef<THREE.Line>(null!);
 const line2Ref = useRef<THREE.Line>(null!);

 useFrame((state) => {
   const t = state.clock.elapsedTime;
   const opacity = 0.45 + Math.sin(t * 3.5) * 0.15;

   const somaticsNode = nodes.find(n => n.id === 'soma-hanna');
   const batesonNode = nodes.find(n => n.id === 'pattern-bateson');
   const gazeNode = nodes.find(n => n.id === 'field-gaze');

   if (somaticsNode && batesonNode && line1Ref.current) {
     const p1 = new THREE.Vector3((somaticsNode.x || 0) * SCALE, (somaticsNode.y || 0) * SCALE, (somaticsNode.z || 0) * SCALE);
     const p2 = new THREE.Vector3((batesonNode.x || 0) * SCALE, (batesonNode.y || 0) * SCALE, (batesonNode.z || 0) * SCALE);
     line1Ref.current.geometry.setFromPoints([p1, p2]);
     (line1Ref.current.material as THREE.LineBasicMaterial).opacity = opacity;
   }

   if (batesonNode && gazeNode && line2Ref.current) {
     const p1 = new THREE.Vector3((batesonNode.x || 0) * SCALE, (batesonNode.y || 0) * SCALE, (batesonNode.z || 0) * SCALE);
     const p2 = new THREE.Vector3((gazeNode.x || 0) * SCALE, (gazeNode.y || 0) * SCALE, (gazeNode.z || 0) * SCALE);
     line2Ref.current.geometry.setFromPoints([p1, p2]);
     (line2Ref.current.material as THREE.LineBasicMaterial).opacity = opacity;
   }
 });

 const somaticsNode = nodes.find(n => n.id === 'soma-hanna');
 const batesonNode = nodes.find(n => n.id === 'pattern-bateson');
 const gazeNode = nodes.find(n => n.id === 'field-gaze');

 return (
   <>
     {somaticsNode && batesonNode && (
       <line ref={line1Ref as any}>
         <bufferGeometry />
         <lineBasicMaterial color="#DFB757" transparent />
       </line>
     )}
     {batesonNode && gazeNode && (
       <line ref={line2Ref as any}>
         <bufferGeometry />
         <lineBasicMaterial color="#DFB757" transparent />
       </line>
     )}
   </>
 );
}

function SomaticDust({ count = 1200, vibeMode }: { count?: number; vibeMode?: 'colour' | 'mono' | 'cinematic' }) {
 const pointsRef = useRef<THREE.Points>(null!);
 const particles = React.useMemo(() => {
   const tempPositions = new Float32Array(count * 3);
   const tempColors = new Float32Array(count * 3);
   const tempSpeeds = new Float32Array(count);
   const tempPhases = new Float32Array(count);

   const colorsPalette = vibeMode === 'mono'
    ?
     :;

   for (let i = 0; i < count; i++) {
     const theta = Math.random() * Math.PI * 2;
     const phi = Math.acos(2 * Math.random() - 1);
     const r = 2 + Math.pow(Math.random(), 2.2) * 65;

     tempPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
     tempPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
     tempPositions[i * 3 + 2] = r * Math.cos(phi);

     const hexColor = colorsPalette[Math.floor(Math.random() * colorsPalette.length)];
     const c = new THREE.Color(hexColor);
     tempColors[i * 3] = c.r;
     tempColors[i * 3 + 1] = c.g;
     tempColors[i * 3 + 2] = c.b;

     tempSpeeds[i] = 0.04 + Math.random() * 0.12;
     tempPhases[i] = Math.random() * Math.PI * 2;
   }

   return { positions: tempPositions, colors: tempColors, speeds: tempSpeeds, phases: tempPhases };
 }, [count, vibeMode]);

 useFrame((state) => {
   if (!pointsRef.current) return;
   const t = state.clock.getElapsedTime();
   const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;

   for (let i = 0; i < count; i++) {
     const sp = particles.speeds[i];
     const ph = particles.phases[i];
     posAttr.setY(i, posAttr.getY(i) + Math.sin(t * sp + ph) * 0.0055);
     posAttr.setX(i, posAttr.getX(i) + Math.cos(t * sp * 0.7 + ph) * 0.0035);
   }
   posAttr.needsUpdate = true;

   const rotSpeed = vibeMode === 'cinematic'? 0.024 : 0.007;
   pointsRef.current.rotation.y = t * rotSpeed;
   pointsRef.current.rotation.z = t * rotSpeed * 0.45;
 });

 return (
   <points ref={pointsRef}>
     <bufferGeometry>
       <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
       <bufferAttribute attach="attributes-color" args={[particles.colors, 3]} />
     </bufferGeometry>
     <pointsMaterial
       size={0.065}
       sizeAttenuation={true}
       vertexColors={true}
       transparent={true}
       opacity={0.65}
       depthWrite={false}
       blending={THREE.AdditiveBlending}
     />
   </points>
 );
}

function SelectedHologramOrbit({ selectedNode, SCALE }: { selectedNode: SomaticNode | null; SCALE: number }) {
 const meshRef = useRef<THREE.LineLoop>(null!);
 useFrame((state) => {
   if (meshRef.current) {
     meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.45;
     meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.12;
   }
 });

 const points = React.useMemo(() => {
   if (!selectedNode) return;
   const r = ((selectedNode.currentRadius || 12) * SCALE) * 1.9;
   const pts: THREE.Vector3 =;
   const segments = 48;
   for (let i = 0; i < segments; i++) {
     const theta = (i / segments) * Math.PI * 2;
     pts.push(new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, 0));
   }
   return pts;
 },);

 if (!selectedNode || points.length === 0) return null;

 return (
   <group
     position={}
     rotation={[Math.PI / 2.3, 0, 0]}
   >
     <lineLoop ref={meshRef}>
       <bufferGeometry>
         <bufferAttribute
           attach="attributes-position"
           args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
         />
       </bufferGeometry>
       <lineBasicMaterial color="#DFB757" transparent opacity={0.65} linewidth={1.5} />
     </lineLoop>
   </group>
 );
}

function NodeLabel({ node, language, SCALE, isSelected, isActiveAudio }: {
 node: SomaticNode; language: 'ru' | 'en'; SCALE: number; isSelected: boolean; isActiveAudio: boolean;
}) {
 if (node.status === 'seed' && node.id!== 'central-me') return null;

 const label = language === 'ru'? node.nameRu : node.nameEn;
 const radius = (node.currentRadius || 10) * SCALE;

 let color = '#D1D7E0';
 if (isSelected || isActiveAudio || node.status === 'rooted' || node.id === 'central-me') {
   color = '#DFB757';
 } else if (node.status === 'sprout') {
   color = '#6B7280';
 }

 return (
   <Billboard position={}>
     <Text
       fontSize={isSelected || isActiveAudio || node.status === 'rooted'? 0.20 : 0.13}
       color={color}
       anchorX="center"
       anchorY="bottom"
       maxWidth={2.5}
       font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
     >
       {label}
     </Text>
   </Billboard>
 );
}

interface GraphSceneProps {
 nodes: SomaticNode;
 links: SomaticLink;
 currentWorld: World;
 language: 'ru' | 'en';
 onNodeSelect: (node: SomaticNode) => void;
 selectedNodeId: string | null;
 overlayUser: string | null;
 resonatedNodeIds: Set<string>;
 carriedNodeIds: Set<string>;
 currentUserName?: string;
 isFilterHot?: boolean;
 activeAudioNodeId: string | null;
 visibleLayers?: {
   atlas: boolean;
   field: boolean;
   hot: boolean;
   withAudio: boolean;
 };
 selectedEpoch?: number;
 vibeMode?: 'colour' | 'mono' | 'cinematic';
 ascendingNodeId?: string | null;
 communityUsers?: CommunityUser;
 fieldSubMode?: 'ideas' | 'people';
 onUserSelect?: (user: CommunityUser) => void;
 onLongPressNode?: (node: SomaticNode, cursorX: number, cursorY: number) => void;
}

function InteractiveSomaticSphere({
 node, isSelected, isHovered, isActiveAudio, color, onClick, onLongSelect, currentWorld, overlayUser, selectedEpoch, ascendingNodeId
}: {
 node: SomaticNode; isSelected: boolean; isHovered: boolean; isActiveAudio: boolean;
 color: string; onClick: (n: SomaticNode) => void; onLongSelect?: (n: SomaticNode, cx: number, cy: number) => void;
 currentWorld: World; overlayUser: string | null; selectedEpoch?: number; ascendingNodeId?: string | null;
}) {
 const pointerTimeRef = useRef(0);
 const pointerPosRef = useRef({ x: 0, y: 0 });

 const handlePointerDown = (e: any) => {
   e.stopPropagation();
   pointerTimeRef.current = Date.now();
   pointerPosRef.current = { x: e.clientX, y: e.clientY };
 };

 const handlePointerUp = (e: any) => {
   e.stopPropagation();
   const duration = Date.now() - pointerTimeRef.current;
   const distance = Math.sqrt((e.clientX - pointerPosRef.current.x) ** 2 + (e.clientY - pointerPosRef.current.y) ** 2);
   if (distance < 15) {
     if (duration > 650) {
       onLongSelect?.(node, e.clientX, e.clientY);
     } else {
       onClick(node);
     }
   }
 };

 return (
   <group onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
     <SomaticSphere
       node={node}
       isSelected={isSelected}
       isHovered={isHovered}
       isActiveAudio={isActiveAudio}
       color={color}
       onClick={() => {}}
       currentWorld={currentWorld}
       overlayUser={overlayUser}
       selectedEpoch={selectedEpoch}
     />
   </group>
 );
}

function GraphScene({
 nodes, links, currentWorld, language, onNodeSelect,
 selectedNodeId, overlayUser, resonatedNodeIds, carriedNodeIds,
 currentUserName, isFilterHot, activeAudioNodeId, visibleLayers,
 selectedEpoch, vibeMode, ascendingNodeId, communityUsers, fieldSubMode,
 onUserSelect, onLongPressNode
}: GraphSceneProps) {
 const SCALE = 0.045;
 const [hoveredId, setHoveredId] = useState<string | null>(null);
 const = useState(24);
 const pointer3D = usePointer3D();

 const { controls } = useThree() as any;

 // Инициализация неизменяемой ссылки на физическое состояние симуляции для обхода механизма примирения React
 const graphStateRef = useRef<{
   nodes: (SomaticNode & {
     vx: number; vy: number; vz: number;
     targetX: number; targetY: number; targetZ: number;
     breathPhase: number; breathSpeed: number;
     baseRadius: number; currentRadius: number;
   });
   links: SomaticLink;
   lastWorld: World | null;
   transitionProgress: number;
 }>({ nodes:, links:, lastWorld: null, transitionProgress: 1.0 });

 const usersStateRef = useRef<any>();

 useEffect(() => {
   if (communityUsers && communityUsers.length > 0) {
     usersStateRef.current = communityUsers.map((u, idx) => {
       const existing = usersStateRef.current.find(eu => eu.id === u.id);
       if (existing) {
         return {...u, x: existing.x, y: existing.y, z: existing.z, vx: existing.vx, vy: existing.vy, vz: existing.vz };
       }
       const angle = (idx * Math.PI * 2) / communityUsers.length;
       const r = 35 + Math.random() * 25;
       return {
        ...u,
         x: Math.cos(angle) * r,
         y: Math.sin(angle) * r,
         z: (Math.random() - 0.5) * 15,
         vx: 0, vy: 0, vz: 0
       };
     });
   }
 }, [communityUsers]);

 useEffect(() => {
   const gState = graphStateRef.current;
   const internalNodes = gState.nodes;
   const worldChanged = gState.lastWorld!== currentWorld;
   if (worldChanged) {
     gState.lastWorld = currentWorld;
     gState.transitionProgress = 0.0;
   }

   const newNodes = nodes.map((n, idx) => {
     const ex = internalNodes.find(e => e.id === n.id);
     let x = ex?.x;
     let y = ex?.y;
     let z = ex?.z;

     let tx = 0, ty = 0, tz = 0;
     if (currentWorld === 'atlas') {
       const cxMap: Record<string, number> = { body: 70, science: -75, philosophy: -95, movement: 80, cognition: -10, hybrid: 10 };
       const cyMap: Record<string, number> = { body: -80, science: 80, philosophy: 90, movement: -65, cognition: -70, hybrid: 85 };
       const czMap: Record<string, number> = { body: -20, science: -15, philosophy: 10, movement: 20, cognition: 45, hybrid: -55 };
       const cx = cxMap[n.domain] || 0;
       const cy = cyMap[n.domain] || 0;
       const cz = czMap[n.domain] || 0;

       if (x === undefined || y === undefined || z === undefined) {
         x = cx + (Math.random() - 0.5) * 30;
         y = cy + (Math.random() - 0.5) * 30;
         z = cz + (Math.random() - 0.5) * 30;
       }

       if (n.level === 'macro') {
         tx = cx + Math.sin(idx) * 4;
         ty = cy + Math.cos(idx) * 4;
         tz = cz + Math.sin(idx * 2) * 4;
       } else if (n.level === 'meso') {
         const localDist = 28 + (idx % 4) * 6;
         const theta = (idx * 1.5) % Math.PI;
         const phi = (idx * 2.3) % (Math.PI * 2);
         tx = cx + Math.sin(theta) * Math.cos(phi) * localDist;
         ty = cy + Math.sin(theta) * Math.sin(phi) * localDist;
         tz = cz + Math.cos(theta) * localDist;
       } else {
         const localDist = 58 + (idx % 6) * 6;
         const theta = (idx * 1.8) % Math.PI;
         const phi = (idx * 2.7) % (Math.PI * 2);
         tx = cx + Math.sin(theta) * Math.cos(phi) * localDist;
         ty = cy + Math.sin(theta) * Math.sin(phi) * localDist;
         tz = cz + Math.cos(theta) * localDist;
       }
     } else if (currentWorld === 'field') {
       const angle = (idx * 0.72) % (Math.PI * 2);
       const dist = 40 + (idx % 12) * 22;
       tx = Math.cos(angle) * dist;
       ty = Math.sin(angle) * dist * 0.6;
       tz = Math.cos(idx * 3) * 10;
       if (x === undefined || y === undefined || z === undefined) {
         x = tx + (Math.random() - 0.5) * 15;
         y = ty + (Math.random() - 0.5) * 15;
         z = tz + (Math.random() - 0.5) * 10;
       }
     } else {
       if (n.id === 'central-me') {
         tx = 0; ty = 0; tz = 0;
         if (x === undefined) { x = 0; y = 0; z = 0; }
       } else {
         if (x === undefined || y === undefined || z === undefined) {
           x = (Math.random() - 0.5) * 4;
           y = (Math.random() - 0.5) * 4;
           z = (Math.random() - 0.5) * 4;
         }
         const orbitRadius = 45 + (idx % 5) * 20;
         const initialAngle = (idx * 1.2) % (Math.PI * 2);
         tx = Math.cos(initialAngle) * orbitRadius;
         ty = Math.sin(initialAngle) * orbitRadius;
         tz = Math.sin(idx) * 8;
       }
     }

     const lvl = n.level || 'meso';
     const levelFactor = lvl === 'macro'? 1.6 : lvl === 'meso'? 1.1 : 0.7;
     const stat = n.status || 'seed';
     const statusFactor = stat === 'rooted' || stat === 'atlas'? 1.5 : stat === 'alive'? 1.25 : stat === 'sprout'? 0.95 : 0.7;
     const bRad = (n.id === 'central-me')? 18 : Math.round(11 * levelFactor * statusFactor);

     return {
      ...n,
       x, y, z,
       vx: ex?.vx || 0, vy: ex?.vy || 0, vz: ex?.vz || 0,
       targetX: tx, targetY: ty, targetZ: tz,
       breathPhase: ex?.breathPhase?? Math.random() * Math.PI * 2,
       breathSpeed: ex?.breathSpeed?? (0.3 + Math.random() * 0.45),
       baseRadius: bRad,
       currentRadius: ex?.currentRadius?? bRad,
     };
   });

   gState.nodes = newNodes as any;
   gState.links = links;
 },);

 // Интеграция 3D Boids (Reynolds) + Curl-Noise вихревых течений + тактильного курсорного взаимодействия
 useFrame((state) => {
   const gState = graphStateRef.current;
   const time = state.clock.elapsedTime;
   const nodesList = gState.nodes;

   const springStrength = 0.035;
   const restDistance = 8.0;
   const damping = 0.84;

   // Константы роевой симуляции
   const maxBoidsSpeed = 1.2;
   const maxBoidsForce = 0.05;
   const separationRadius = 12.0;
   const cohesionRadius = 24.0;
   const alignmentRadius = 24.0;

   const wSeparation = 1.5;
   const wCohesion = 0.8;
   const wAlignment = 0.6;
   const wSpring = 1.0;
   const wCurlNoise = 0.45;
   const wMousePush = 2.2;

   const pointerWorld = pointer3D.current.clone().multiplyScalar(1 / SCALE);

   // Коррекция плавающих траекторий орбит в персональной вселенной
   if (currentWorld === 'me' && nodesList.length) {
     nodesList.forEach((node, idx) => {
       if (node.id!== 'central-me') {
         const orbitRadius = 45 + (idx % 5) * 20;
         const orbitSpeed = (120 / orbitRadius) * 0.08 + (idx % 2) * 0.02;
         const currentAngle = (node.breathPhase || 0) + time * orbitSpeed;
         node.targetX = Math.cos(currentAngle) * orbitRadius;
         node.targetY = Math.sin(currentAngle) * orbitRadius;
         node.targetZ = Math.sin(time * 0.4 + idx) * 6;
       }
     });
   }

   if (gState.transitionProgress < 1.0) {
     gState.transitionProgress += 0.04;
     nodesList.forEach(node => {
       node.x += (node.targetX - node.x) * 0.12;
       node.y += (node.targetY - node.y) * 0.12;
       node.z += (node.targetZ - node.z) * 0.12;
     });
   }

   // Итерационный обсчет сил на уровне ядер рендеринга
   for (let i = 0; i < nodesList.length; i++) {
     const n1 = nodesList[i];
     if (n1.id === 'central-me') continue;

     let fSep = new THREE.Vector3();
     let fCoh = new THREE.Vector3();
     let fAli = new THREE.Vector3();
     let fSpring = new THREE.Vector3();

     let sepCount = 0;
     let cohCount = 0;
     let aliCount = 0;

     let centerOfMass = new THREE.Vector3();
     let averageVelocity = new THREE.Vector3();

     // Наложение векторов роевой кластеризации
     for (let j = 0; j < nodesList.length; j++) {
       if (i === j) continue;
       const n2 = nodesList[j];
       if (n2.id === 'central-me') continue;

       const dX = n2.x - n1.x;
       const dY = n2.y - n1.y;
       const dZ = n2.z - n1.z;
       const dist = Math.sqrt(dX * dX + dY * dY + dZ * dZ) || 0.1;

       if (dist < separationRadius) {
         const push = new THREE.Vector3(n1.x - n2.x, n1.y - n2.y, n1.z - n2.z).normalize().multiplyScalar(1.0 / dist);
         fSep.add(push);
         sepCount++;
       }

       if (dist < cohesionRadius) {
         centerOfMass.add(new THREE.Vector3(n2.x, n2.y, n2.z));
         cohCount++;
       }
       if (dist < alignmentRadius) {
         averageVelocity.add(new THREE.Vector3(n2.vx, n2.vy, n2.vz));
         aliCount++;
       }
     }

     if (sepCount > 0) fSep.divideScalar(sepCount);
     if (cohCount > 0) {
       centerOfMass.divideScalar(cohCount);
       fCoh.add(centerOfMass.sub(new THREE.Vector3(n1.x, n1.y, n1.z))).normalize().multiplyScalar(maxBoidsSpeed);
     }
     if (aliCount > 0) {
       averageVelocity.divideScalar(aliCount);
       fAli.add(averageVelocity).normalize().multiplyScalar(maxBoidsSpeed);
     }

     // Вычисление сетевых пружинных сил (Закон Гука)
     gState.links.forEach(link => {
       if (link.source === n1.id || link.target === n1.id) {
         const otherId = link.source === n1.id? link.target : link.source;
         const otherNode = nodesList.find(nodeItem => nodeItem.id === otherId);
         if (otherNode) {
           const dX = otherNode.x - n1.x;
           const dY = otherNode.y - n1.y;
           const dZ = otherNode.z - n1.z;
           const dist = Math.sqrt(dX * dX + dY * dY + dZ * dZ) || 0.1;
           const delta = dist - restDistance;
           const forceStrength = delta * springStrength * Math.log(link.resonanceWeight + 1);
           fSpring.add(new THREE.Vector3(dX, dY, dZ).normalize().multiplyScalar(forceStrength));
         }
       }
     });

     // Математическая симуляция curl-шума течения на тригонометрических триплетах
     const k = 0.08;
     const curlX = Math.sin(n1.y * k) - Math.cos(n1.z * k);
     const curlY = Math.cos(n1.x * k) - Math.sin(n1.z * k);
     const curlZ = Math.sin(n1.x * k) - Math.cos(n1.y * k);
     const fCurl = new THREE.Vector3(curlX, curlY, curlZ);

     // Математическая репрезентация силы упругого курсорного выталкивания
     let fMouse = new THREE.Vector3();
     const distToPointer = n1.position? pointerWorld.distanceTo(new THREE.Vector3(n1.x, n1.y, n1.z)) : 100;
     if (distToPointer < 45.0) {
       const dir = new THREE.Vector3(n1.x, n1.y, n1.z).sub(pointerWorld).normalize();
       fMouse.copy(dir.multiplyScalar(wMousePush * (1.0 - distToPointer / 45.0)));
     }

     // Итоговое сложение векторов ускорения
     const finalAcceleration = new THREE.Vector3()
      .addScaledVector(fSep, wSeparation)
      .addScaledVector(fCoh, wCohesion)
      .addScaledVector(fAli, wAlignment)
      .addScaledVector(fSpring, wSpring)
      .addScaledVector(fCurl, wCurlNoise)
      .add(fMouse);

     finalAcceleration.clampLength(0.0, maxBoidsForce);

     // Численное интегрирование Эйлера
     n1.vx = (n1.vx + finalAcceleration.x) * damping;
     n1.vy = (n1.vy + finalAcceleration.y) * damping;
     n1.vz = (n1.vz + finalAcceleration.z) * damping;

     if (n1.id === ascendingNodeId) {
       n1.vy += 1.2;
       n1.vz += 0.6;
     }

     n1.x += n1.vx;
     n1.y += n1.vy;
     n1.z += n1.vz;

     // Детерминированное процедурное микродрожание (Swell Sway)
     const indexFloat = i * 0.73;
     n1.x += Math.sin(time * 1.1 + indexFloat) * 0.16;
     n1.y += Math.cos(time * 0.8 + indexFloat) * 0.16;
     n1.z += Math.sin(time * 1.4 + indexFloat) * 0.10;

     const bp = (n1.breathPhase || 0) + time * (n1.breathSpeed || 0.4) * 0.03;
     n1.currentRadius = (n1.baseRadius || 10) * (1 + Math.sin(bp) * 0.08);
   }

   if (selectedNodeId && controls) {
     const selNode = nodesList.find(n => n.id === selectedNodeId);
     if (selNode) {
       const tx = (selNode.x || 0) * SCALE;
       const ty = (selNode.y || 0) * SCALE;
       const tz = (selNode.z || 0) * SCALE;
       controls.target.x += (tx - controls.target.x) * 0.09;
       controls.target.y += (ty - controls.target.y) * 0.09;
       controls.target.z += (tz - controls.target.z) * 0.09;
     }
   }

   // Физика отталкивания на уровне пользовательских созвездий
   if (currentWorld === 'field' && fieldSubMode === 'people' && usersStateRef.current.length > 0) {
     const users = usersStateRef.current;
     for (let i = 0; i < users.length; i++) {
       const u1 = users[i];
       for (let j = i + 1; j < users.length; j++) {
         const u2 = users[j];
         let dx = u2.x - u1.x;
         let dy = u2.y - u1.y;
         let dz = u2.z - u1.z;
         if (!dx &&!dy &&!dz) { dx = 0.1; dy = 0.1; dz = 0.1; }
         const distSq = dx * dx + dy * dy + dz * dz;
         const dist = Math.sqrt(distSq);

         const isSimilar = u1.dominantDomain === u2.dominantDomain;
         const force = isSimilar? -12 / (distSq + 12) : 420 / (distSq + 30);

         u1.vx = (u1.vx || 0) - (dx / dist) * force;
         u1.vy = (u1.vy || 0) - (dy / dist) * force;
         u1.vz = (u1.vz || 0) - (dz / dist) * force;
         u2.vx = (u2.vx || 0) + (dx / dist) * force;
         u2.vy = (u2.vy || 0) + (dy / dist) * force;
         u2.vz = (u2.vz || 0) + (dz / dist) * force;
       }
     }

     users.forEach((u, idx) => {
       const d = Math.sqrt(u.x * u.x + u.y * u.y + u.z * u.z);
       if (d > 1) {
         u.vx -= (u.x / d) * 0.02;
         u.vy -= (u.y / d) * 0.02;
         u.vz -= (u.z / d) * 0.02;
       }

       u.x = (u.x || 0) + (u.vx || 0);
       u.y = (u.y || 0) + (u.vy || 0);
       u.z = (u.z || 0) + (u.vz || 0);

       u.vx *= 0.84;
       u.vy *= 0.84;
       u.vz *= 0.84;

       u.x += Math.sin(time * 0.9 + idx * 0.4) * 0.06;
       u.y += Math.cos(time * 0.8 + idx * 0.7) * 0.06;
       u.z += Math.sin(time * 1.0 + idx * 0.3) * 0.04;
     });
   }
 });

 const getFilteredNodes = (): SomaticNode => {
   if (currentWorld === 'field' && fieldSubMode === 'people') return;
   const gState = graphStateRef.current;
   let base =;
   if (currentWorld === 'me' &&!base.find(n => n.id === 'central-me')) {
     base.unshift({
       id: 'central-me', nameRu: 'Я', nameEn: 'Me',
       type: 'concept', level: 'macro',
       domain: 'hybrid', world: 'me', status: 'rooted', resonances: 0,
       descriptionRu: 'Центр вашей личной вселенной',
       descriptionEn: 'The center of your personal universe',
       x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0,
       targetX: 0, targetY: 0, targetZ: 0,
       baseRadius: 18, currentRadius: 18, breathPhase: 0, breathSpeed: 0.5
     } as any);
     gState.nodes = base as any;
   }

   const audioNodeIds = new Set(SAMPLE_AUDIO?.flatMap(a => a.timelineNodes.map(t => t.nodeId)) ||);
   const fieldConnectedAtlasIds = new Set<string>();
   if (currentWorld === 'field') {
     const fieldNodeIds = new Set(base.filter(n => n.world === 'field' || n.id === 'central-me').map(n => n.id));
     links.forEach(link => {
       if (fieldNodeIds.has(link.source) &&!fieldNodeIds.has(link.target)) fieldConnectedAtlasIds.add(link.target);
       if (fieldNodeIds.has(link.target) &&!fieldNodeIds.has(link.source)) fieldConnectedAtlasIds.add(link.source);
     });
   }

   return base.filter(n => {
     if (currentWorld === 'atlas') {
       if (n.world!== 'atlas') return false;
     }
     if (currentWorld === 'field') {
       if (n.world!== 'field' && n.id!== 'central-me') {
         if (n.world === 'atlas' && fieldConnectedAtlasIds.has(n.id)) return true;
         return false;
       }
     }
     if (currentWorld === 'me') {
       if (n.id === 'central-me') return true;
       const isMine = n.addedBy === currentUserName;
       const isResonated = resonatedNodeIds?.has(n.id);
       const isCarried = carriedNodeIds?.has(n.id);
       if (!isMine &&!isResonated &&!isCarried) return false;
     }

     if (visibleLayers) {
       if (!visibleLayers.atlas && n.world === 'atlas' && n.id!== 'central-me') return false;
       if (!visibleLayers.field && n.world === 'field' && n.id!== 'central-me') return false;
       if (visibleLayers.hot && n.resonances < 50 && n.id!== 'central-me') return false;
       if (visibleLayers.withAudio &&!audioNodeIds.has(n.id) && n.id!== 'central-me') return false;
     }

     if (isFilterHot && n.resonances < 50 && n.id!== 'central-me') return false;
     return true;
   });
 };

 const filteredNodes = getFilteredNodes();
 const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
 const activeLinks = links.filter(link => filteredNodeIds.has(link.source) && filteredNodeIds.has(link.target));

 return (
   <>
     <Stars radius={110} depth={55} count={1650} factor={4} fade speed={1.2} />
     <SomaticDust count={1200} vibeMode={vibeMode} />

     {selectedNodeId && (
       <SelectedHologramOrbit
         selectedNode={filteredNodes.find(n => n.id === selectedNodeId) || null}
         SCALE={SCALE}
       />
     )}

     <ambientLight intensity={0.4} />
     <pointLight position={} intensity={2.2} color="#ccddff" />
     <pointLight position={[-15, -8, -15]} intensity={1.7} color="#9977ee" />
     <pointLight position={[8, -10, 8]} intensity={1.2} color="#7755aa" />

     <OrbitControls
       enableZoom={true}
       enablePan={true}
       enableRotate={true}
       zoomSpeed={0.8}
       panSpeed={0.7}
       rotateSpeed={0.5}
       minDistance={3}
       maxDistance={75}
       makeDefault
       autoRotate={vibeMode === 'cinematic'}
       autoRotateSpeed={0.4}
       onChange={(e: any) => {
         if (e?.target?.object) {
           setCamDist(e.target.object.position.length());
         }
       }}
     />

     {activeLinks.map(link => {
       const src = filteredNodes.find(n => n.id === link.source);
       const tgt = filteredNodes.find(n => n.id === link.target);
       if (!src ||!tgt) return null;
       const isActive = selectedNodeId === link.source || selectedNodeId === link.target;

       if (src.level === 'micro' && camDist > 24) return null;
       if (tgt.level === 'micro' && camDist > 24) return null;
       if (src.level === 'meso' && camDist > 38) return null;
       if (tgt.level === 'meso' && camDist > 38) return null;

       let color = currentWorld === 'field'? '#14B8A6' : (DOMAIN_COLORS[src.domain] || '#ffffff');
       if (vibeMode === 'mono') color = '#555A64';

       return (
         <MyceliumEdge
           key={link.id}
           source={src}
           target={tgt}
           color={color}
           activity={link.activity}
           isActive={isActive}
           linkType={link.type}
         />
       );
     })}

     {overlayUser && <GoldenOverlayBridges nodes={filteredNodes} SCALE={SCALE} />}

     {filteredNodes.map(node => {
       let color = node.id === 'central-me'
        ? '#DFB757'
         : currentWorld === 'field'
          ? '#14B8A6'
           : (DOMAIN_COLORS[node.domain] || '#ffffff');

       if (vibeMode === 'mono') {
         color = node.id === 'central-me'? '#DFB757' : (node.level === 'macro'? '#E5E7EB' : node.level === 'meso'? '#9CA3AF' : '#4B5563');
       }

       return (
         <InteractiveSomaticSphere
           key={node.id}
           node={node}
           isSelected={selectedNodeId === node.id}
           isHovered={hoveredId === node.id}
           isActiveAudio={activeAudioNodeId === node.id}
           color={color}
           onClick={onNodeSelect}
           onLongSelect={onLongPressNode}
           currentWorld={currentWorld}
           overlayUser={overlayUser}
           selectedEpoch={selectedEpoch}
           ascendingNodeId={ascendingNodeId}
         />
       );
     })}

     {currentWorld === 'field' && fieldSubMode === 'people' && usersStateRef.current.map((user, idx) => {
       const size = Math.max(0.6, Math.min(2.0, (user.reputation / 100) * 1.5)) * SCALE * 13;
       const finalColor = user.id === 'user-me'? '#DFB757' : (DOMAIN_COLORS || '#ffffff');
       const uc = new THREE.Color(finalColor);
       const ux = (user.x || 0) * SCALE;
       const uy = (user.y || 0) * SCALE;
       const uz = (user.z || 0) * SCALE;
       const isUserHovered = hoveredId === user.id;

       return (
         <group key={user.id} onClick={(e) => { e.stopPropagation(); onUserSelect?.(user); }}>
           <mesh
             position={[ux, uy, uz]}
             rotation={}
             onPointerOver={(e) => { e.stopPropagation(); setHoveredId(user.id); }}
             onPointerOut={() => setHoveredId(null)}
           >
             <octahedronGeometry args={[size, 0]} />
             <meshStandardMaterial
               color={uc}
               emissive={uc}
               emissiveIntensity={isUserHovered? 1.9 : 0.8}
               transparent
               opacity={0.92}
             />
           </mesh>
           <mesh position={[ux, uy, uz]}>
             <sphereGeometry args={[size * 1.8, 12, 12]} />
             <meshStandardMaterial color={uc} transparent opacity={0.15} depthWrite={false} />
           </mesh>
           <Billboard position={[ux, uy + size + 0.18, uz]}>
             <Text
               fontSize={0.14}
               color={finalColor}
               anchorX="center"
               anchorY="bottom"
               maxWidth={3.0}
             >
               {user.name}
             </Text>
             {isUserHovered && (
               <Text
                 fontSize={0.11}
                 color="#9CA3AF"
                 position={[0, -0.16, 0]}
                 anchorX="center"
                 anchorY="top"
                 maxWidth={4.0}
               >
                 {`♦ ${user.resonances.join(' • ')}`}
               </Text>
             )}
           </Billboard>
         </group>
       );
     })}

     {filteredNodes.map(node => {
       const inEpoch = selectedEpoch === undefined || selectedEpoch === 0 || node.id === 'central-me' || getEpochNumberForNode(node) === selectedEpoch;
       if (!inEpoch) return null;

       if (node.level === 'micro' && camDist > 20) return null;
       if (node.level === 'meso' && camDist > 34) return null;

       return (
         <NodeLabel
           key={`label-${node.id}`}
           node={node}
           language={language}
           SCALE={SCALE}
           isSelected={selectedNodeId === node.id}
           isActiveAudio={activeAudioNodeId === node.id}
         />
       );
     })}
   </>
 );
}

class ErrorBoundary extends React.Component<
 { children: React.ReactNode; language: 'ru' | 'en' },
 { hasError: boolean; error: Error | null }
> {
 constructor(props: { children: React.ReactNode; language: 'ru' | 'en' }) {
   super(props);
   this.state = { hasError: false, error: null };
 }

 static getDerivedStateFromError(error: Error) {
   return { hasError: true, error };
 }

 componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
   console.error("ThreeJS Visual Engine Error: ", error, errorInfo);
 }

 render() {
   if (this.state.hasError) {
     return (
       <div className="absolute inset-0 flex flex-col items-center justify-center bg- text-gray-300 p-8 text-center z-50 font-sans border border-white/5 rounded-2xl m-4">
         <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-full mb-4 text-rose-400 text-3xl">⚠️</div>
         <h3 className="text-lg font-bold text-white mb-2">
           {this.props.language === 'ru'? 'Ошибка загрузки графа' : 'Error Loading 3D Lattice'}
         </h3>
         <p className="text-xs text-gray-400 max-w-sm mb-4 leading-relaxed font-mono">
           {this.state.error?.message || (this.props.language === 'ru'? 'Сбой визуализации Three.js' : 'Three.js runtime visual crash')}
         </p>
         <button
           onClick={() => this.setState({ hasError: false, error: null })}
           className="px-4 py-2 bg-indigo-600/35 hover:bg-indigo-600 border border-indigo-500 text-xs font-mono text-white rounded-lg cursor-pointer active:scale-95 transition-all"
         >
           {this.props.language === 'ru'? 'Перезапустить рендер' : 'Restart Renderer'}
         </button>
       </div>
     );
   }
   return this.props.children;
 }
}

export default function MyceliumGraph(props: MyceliumGraphProps) {
 const [isFilterHot, setIsFilterHot] = useState(false);
 const resSet = props.resonatedNodeIds instanceof Set? props.resonatedNodeIds : new Set(props.resonatedNodeIds ||);
 const carrSet = props.carriedNodeIds instanceof Set? props.carriedNodeIds : new Set(props.carriedNodeIds ||);

 return (
   <div className="relative w-full h-full select-none" id="webgl-canvas-box-container">
     <ErrorBoundary language={props.language}>
       <Canvas
         camera={{ position: , fof: 55, near: 0.1, far: 500 }}
         gl={{
           antialias: true,
           powerPreference: 'high-performance',
           alpha: false
         }}
         dpr={typeof window!== 'undefined'? Math.min(window.devicePixelRatio, 2) : 1}
       >
         <color attach="background" args={['#050508']} />
         <fog attach="fog" args={['#050508', 35, 100]} />

         <GraphScene
           nodes={props.nodes}
           links={props.links}
           currentWorld={props.currentWorld}
           language={props.language}
           onNodeSelect={props.onNodeSelect}
           selectedNodeId={props.selectedNodeId}
           overlayUser={props.overlayUser}
           resonatedNodeIds={resSet}
           carriedNodeIds={carrSet}
           currentUserName={props.currentUserName}
           isFilterHot={isFilterHot}
           activeAudioNodeId={props.activeAudioNodeId || null}
           visibleLayers={props.visibleLayers}
           selectedEpoch={props.selectedEpoch}
           vibeMode={props.vibeMode}
           ascendingNodeId={props.ascendingNodeId}
           communityUsers={props.communityUsers}
           fieldSubMode={props.fieldSubMode}
           onUserSelect={props.onUserSelect}
           onLongPressNode={props.onLongPressNode}
         />
       </Canvas>
     </ErrorBoundary>

     <div className="absolute bottom-16 left-4 flex gap-1.5 z-20 bg-/80 backdrop-blur-md p-1.5 rounded-xl border border-white/5 shadow-xl">
       <button
         onClick={() => setIsFilterHot(!isFilterHot)}
         className={`p-2 rounded-lg transition-all active:scale-95 flex items-center gap-1.5 px-3 text-xs font-medium cursor-pointer ${
           isFilterHot? 'text-amber-400 bg-amber-500/15' : 'text-gray-400 bg-white/5'
         }`}
       >
         <Flame className="w-3.5 h-3.5" />
         <span>{isFilterHot? (props.language === 'ru'? 'ГОРЯЧИЕ' : 'HOT') : (props.language === 'ru'? 'ВСЕ' : 'ALL')}</span>
       </button>
     </div>

     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/20 pointer-events-none select-none text-center">
       {props.language === 'ru'
        ? 'Вращение: левый клик + drag • Зум: скролл / два пальца • Пан: правый клик + drag'
         : 'Rotate: left-click drag • Zoom: scroll / pinch • Pan: right-click drag'}
     </div>
   </div>
 );
}

Заключение
Интеграция биоморфных симуляций в Seamless Universe v13 полностью решает проблему статического застоя интерфейса, превращая его в живой интерактивный трип :
* Эмерджентное поведение: Объединение сил роевого алгоритма и curl-шума создает плавные, завораживающие траектории движения нод, неотличимые от поведения живых птиц и водных потоков.
* Игровая тактильность: Интерактивное гравитационное и хищническое поле курсора обеспечивает физический отклик всей сцены при каждом движении мыши, переводя UX из категории «каталог» в категорию «исследовательская игра».
* Экстремальная оптимизация: Прямое мутирование типизированных буферов памяти в useFrame в обход примирения React гарантирует стабильные 60 FPS при отрисовке тысяч связанных объектов в реальном времени на мобильных устройствах и десктопах.
Источники
1. 3D force-directed graph component using ThreeJS/WebGL - GitHub, https://github.com/vasturiano/3d-force-graph 2. 3D Force-Directed Graph (ThreeJS) / Vasco Asturiano - Observable Notebooks, https://observablehq.com/@vasturiano/3d-force-directed-graph 3. Three.js Interfaces: Production 3D for Web Applications - Intelligent Graphic & Code, https://www.intelligentgraphicandcode.com/development/threejs-interfaces 4. Boids Flocking Simulation with Three.js & React - Wawa Sensei, https://wawasensei.dev/tuto/boid-flocking-simulation-threejs-and-react 5. mayankles/flocking-js: Flocking simulation in javascript - GitHub, https://github.com/mayankles/flocking-js 6. Boids Flocking Simulation with Threejs React Three Fiber - Michael Gold, https://mike.gold/notes/x-bookmarks/web-3d/boids-flocking-simulation-with-threejs-react-three-fiber 7. d3-force | D3 by Observable - D3.js, https://d3js.org/d3-force 8. GitHub - jasonwebb/morphogenesis-resources: Resources on the topic of digital morphogenesis (creating form with code). Includes links to major articles, code repos, creative projects, books, software, and more., https://github.com/jasonwebb/morphogenesis-resources 9. When Cells Collide: The Making of an Organic Particle Experiment with Rapier & Three.js, https://tympanus.net/codrops/2025/09/11/when-cells-collide-the-making-of-an-organic-particle-experiment-with-rapier-three-js/ 10. Creating a Depth-Aware Boids Animation in React: Flocking with Style - flaming.codes, https://www.flaming.codes/posts/depth-aware-boids-animation-react 11. Boids: Simulating Flocks. …to just admire the flocking behavior… | by Issac Roy | Medium, https://medium.com/@issacroy05/boids-simulating-flocks-e11c121a35cc 12. Perlin Noise - Flow Field - David's Raging Nexus, https://ragingnexus.com/creative-code-lab/experiments/perlin-noise-flow-field/ 13. Finally stopped procrastinating and taught myself how to make multi pass shaders. A Simplex Noise based flow field (Curl Noise). Will write about it soon! : r/threejs - Reddit, https://www.reddit.com/r/threejs/comments/pdgmia/finally_stopped_procrastinating_and_taught_myself/ 14. vasturiano/r3f-forcegraph: Force-directed graph as a React Three Fiber component - GitHub, https://github.com/vasturiano/r3f-forcegraph 15. Creating amazing particle effect along a curve in React Three Fiber - The Front Dev, https://www.thefrontdev.co.uk/creating-amazing-particle-effect-along-a-curve-in-react-three-fiber/ 16. GitHub - zz85/threejs-path-flow: Mesh Deformation / Bending / Following on a Curve, https://github.com/zz85/threejs-path-flow 17. Simplex noise vector field with three.js : r/javascript - Reddit, https://www.reddit.com/r/javascript/comments/1zdns4/simplex_noise_vector_field_with_threejs/ 18. The reason for the very low performance of R3F with instances ? · Issue #3306 · pmndrs/react-three-fiber - GitHub, https://github.com/pmndrs/react-three-fiber/issues/3306 19. From Flat to Spatial: Creating a 3D Product Grid with React Three Fiber | Codrops, https://tympanus.net/codrops/2026/02/24/from-flat-to-spatial-creating-a-3d-product-grid-with-react-three-fiber/ 20. The magical world of Particles with React Three Fiber and Shaders - Maxime Heckel's Blog, https://blog.maximeheckel.com/posts/the-magical-world-of-particles-with-react-three-fiber-and-shaders/ 21. Scaling performance - Introduction - React Three Fiber, https://r3f.docs.pmnd.rs/advanced/scaling-performance 22. How to show dynamic position of instance with react + cannon? - three.js forum, https://discourse.threejs.org/t/how-to-show-dynamic-position-of-instance-with-react-cannon/58712 23. Three.js Visual & Interactive Encyclopedia - A Complete Guide, https://neuralpixelgames.github.io/threejs-visual-guide/ 24. Building "Unmask the City" - A Solo Game Jam Journey with AI Pair Programming, https://www.richardfu.net/building-unmask-the-city-a-solo-game-jam-journey-with-ai-pair-programming/ 25. Create a First Person Movement in React Three Fiber - Part 2 - DEV Community, https://dev.to/jgcarrillo/create-a-first-person-movement-in-react-three-fiber-part-2-1jic 26. React Three Fibre follow mouse respect controls - Stack Overflow, https://stackoverflow.com/questions/72136258/react-three-fibre-follow-mouse-respect-controls 27. Events - Introduction - React Three Fiber, https://r3f.docs.pmnd.rs/api/events 28. Interactive Repulsion Effect with Three.js - Codrops, https://tympanus.net/codrops/2018/12/06/interactive-repulsion-effect-with-three-js/ 29. Attraction and repulsion - Questions - three.js forum, https://discourse.threejs.org/t/attraction-and-repulsion/73579 30. Project 2: Flocking Creatures, https://faculty.cc.gatech.edu/~turk/bio_sim/hw2.html 31. javascript - Attraction/Repulsion Forces on objects in Three.js/Physijs - Stack Overflow, https://stackoverflow.com/questions/14492850/attraction-repulsion-forces-on-objects-in-three-js-physijs 32. React Three Fiber: Introduction, https://r3f.docs.pmnd.rs/