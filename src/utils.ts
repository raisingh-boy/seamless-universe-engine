import { SomaticNode } from './types';

// ============================================================
// Epoch assignment for nodes (shared between graph engines)
// ============================================================
export function getEpochNumberForNode(node: SomaticNode): number {
  if (node.id === 'central-me') return 0;
  if (node.id === 'root') return 0; // All time
  if (node.world === 'field') return 8;

  const years = (node.epochEn || '').toLowerCase();
  const desc = (node.descriptionEn || '').toLowerCase();
  const id = node.id.toLowerCase();

  // 1: Antiquity (–500 CE to 500 CE) — Plato, Aristotle, Buddha
  if (
    id.includes('buddha') || id.includes('aristotle') || id.includes('plato') || id.includes('antiquity') ||
    desc.includes('antiquity') || desc.includes('ancient greece') || desc.includes('buddhism') ||
    years.includes('bc') || (years.includes('ce') && !years.includes('19') && !years.includes('20') && !years.includes('18')) ||
    id.includes('yoga') || id.includes('socrates') || id.includes('zen') || id.includes('qigong')
  ) {
    return 1;
  }

  // 2: Medieval (500–1500) — Sufis, Zen masters
  if (
    id.includes('sufi') || desc.includes('medieval') || desc.includes('middle ages') ||
    id.includes('zen_masters') || id.includes('kabbalah') || years.includes('1100') || years.includes('1200') ||
    years.includes('1300') || years.includes('1400')
  ) {
    return 2;
  }

  // 3: Renaissance (1500–1800) — Descartes, Newton
  if (
    id.includes('descartes') || id.includes('newton') || id.includes('spinoza') || id.includes('renaissance') ||
    desc.includes('renaissance') || desc.includes('17th century') || desc.includes('18th century') ||
    years.includes('1500') || years.includes('1600') || years.includes('1700') ||
    id.includes('shinto') || id.includes('martial_arts')
  ) {
    return 3;
  }

  // 4: 19th Century (1800–1900) — Darwin, Nietzsche, Freud
  if (
    id.includes('darwin') || id.includes('nietzsche') || id.includes('freud') || id.includes('19th_century') ||
    desc.includes('19th century') || years.includes('18') || years.includes('1800') || years.includes('1860') ||
    years.includes('1880') || id.includes('duncan') || id.includes('alexander_technique')
  ) {
    return 4;
  }

  // 5: Early 20th (1900–1950) — Modern dance, Phenomenology
  if (
    id.includes('phenomenology') || id.includes('graham') || id.includes('cunningham') ||
    desc.includes('early 20th') || years.includes('1900') || years.includes('1910') || years.includes('1920') ||
    years.includes('1930') || years.includes('1940') || id.includes('laban') || id.includes('wigman') ||
    id.includes('bateson')
  ) {
    return 5;
  }

  // 6: Mid 20th (1950–1980) — Contact Improv, Somatics, Cybernetics
  if (
    id.includes('contact_improv') || id.includes('somatics') || id.includes('cybernetics') ||
    id.includes('paxton') || id.includes('feldenkrais') || id.includes('hanna') || id.includes('rolfing') ||
    years.includes('1950') || years.includes('1960') || years.includes('1970') ||
    years.includes('1972') || years.includes('1959')
  ) {
    return 6;
  }

  // 7: Late 20th (1980–2000) — Embodied AI, Complexity
  if (
    id.includes('complexity') || id.includes('embodied_ai') || id.includes('cognitive_sci') ||
    years.includes('1980') || years.includes('1990') || desc.includes('late 20th')
  ) {
    return 7;
  }

  // 8: Contemporary (2000–present) — Current research
  return 8;
}

// ============================================================
// Layer visibility configuration (shared between graph engines)
// ============================================================
export interface VisibleLayers {
  atlas: boolean;
  field: boolean;
  hot: boolean;
  withAudio: boolean;
}
