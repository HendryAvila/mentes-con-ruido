export interface Source {
  name: string;
  url: string;
}

export interface ModuleInfo {
  id: number;
  pillar: string;
  title: string;
  subtitle: string;
  icon: string;
  duration: string;
  type: string;
  description: string;
  objectives: string[];
  sources: Source[];
}

export const modules: ModuleInfo[] = [
  // PILAR 0 — El Despertar
  {
    id: 1,
    pillar: 'Pilar 0 — El Despertar',
    title: 'Tu atencion dura 47 segundos',
    subtitle: 'El diagnostico brutal que necesitas escuchar',
    icon: '⏱️',
    duration: '20 min',
    type: 'Teoria + Quiz interactivo',
    description: 'Descubri cuanto dura realmente tu atencion en pantalla, por que te auto-interrumpis mas de lo que crees, y cuanto te cuesta cada cambio de tarea. Con datos de 20 anios de investigacion.',
    objectives: [
      'Entender el dato de 47 segundos de span atencional (Gloria Mark)',
      'Conocer el costo real de las interrupciones (23 min para re-enfocarse)',
      'Calcular tu perdida personal de productividad por cambio de contexto',
      'Distinguir entre auto-interrupcion e interrupcion externa'
    ],
    sources: [
      { name: 'Gloria Mark — Attention Span (2023)', url: 'https://gloriamark.com/attention-span/' },
      { name: 'Mark, Gudith & Klocke — The Cost of Interrupted Work (2008)', url: 'https://dl.acm.org/doi/10.1145/1357054.1357072' },
      { name: 'Sophie Leroy — Attention Residue (2009)', url: 'https://www.researchgate.net/publication/46489122' },
      { name: 'Adam Gazzaley — The Distracted Mind (MIT Press)', url: 'https://mitpress.mit.edu/9780262534437/' }
    ]
  },
  {
    id: 2,
    pillar: 'Pilar 0 — El Despertar',
    title: 'No estas roto, sos creativo',
    subtitle: 'Tu cerebro no tiene un defecto — tiene un superpoder',
    icon: '🎨',
    duration: '25 min',
    type: 'Teoria + Auto-diagnostico interactivo',
    description: 'Descubri por que las mentes creativas pierden el foco mas facil, que es la "atencion permeable", y cual es tu modelo multipotencial. Incluye auto-diagnostico basado en el trabajo de Emilie Wapnick.',
    objectives: [
      'Entender la atencion permeable (leaky attention) y por que es un superpoder creativo',
      'Conocer la diferencia entre multipotencialita y persona con falta de foco',
      'Identificar tu modelo multipotencial (Group Hug, Slash, Einstein, Phoenix)',
      'Reencuadrar la perdida de foco como caracteristica, no como defecto'
    ],
    sources: [
      { name: 'Zabelina et al. — Flexible or Leaky Attention (Northwestern, 2015)', url: 'https://psychology.northwestern.edu/people/faculty/core/profiles/zabelina-saporta-beeman-2015-flexible-or-leaky-attention-in-creative-people-preprint.pdf' },
      { name: 'Emilie Wapnick — How to Be Everything (2017)', url: 'https://puttylike.com/' },
      { name: 'Barbara Sher — Refuse to Choose (Scanner personality)', url: 'https://www.barbarasher.com/' },
      { name: 'Frontiers in Psychiatry — Creative Thinking and ADHD (2022)', url: 'https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2022.909202/full' }
    ]
  },
  // PILAR 1-5 + Final — Placeholder metadata for homepage navigation
  // These will be populated as each Pilar is generated
  { id: 3, pillar: 'Pilar 1 — Entende Tu Cerebro', title: 'La Corteza Prefrontal', subtitle: 'Tu director de orquesta agotado', icon: '🎭', duration: '20 min', type: 'Teoria + Quiz', description: 'La corteza prefrontal como recurso agotable.', objectives: [], sources: [] },
  { id: 4, pillar: 'Pilar 1 — Entende Tu Cerebro', title: 'La Red por Defecto', subtitle: 'Tu mente errante no es tu enemiga', icon: '🌊', duration: '20 min', type: 'Teoria + Ejercicio', description: 'La DMN y por que tu mente divaga.', objectives: [], sources: [] },
  { id: 5, pillar: 'Pilar 1 — Entende Tu Cerebro', title: 'Los Loops de Dopamina', subtitle: 'Por que no podes dejar de scrollear', icon: '🔄', duration: '20 min', type: 'Teoria + Quiz', description: 'El sistema dopaminergico y las redes sociales.', objectives: [], sources: [] },
  { id: 6, pillar: 'Pilar 1 — Entende Tu Cerebro', title: 'Residuo Atencional', subtitle: 'El costo invisible de cambiar de tarea', icon: '💨', duration: '20 min', type: 'Teoria + Simulacion', description: 'Sophie Leroy y el residuo que te persigue.', objectives: [], sources: [] },
  { id: 7, pillar: 'Pilar 2 — Construi Tus Habitos', title: 'Las 4 Leyes', subtitle: 'El sistema que reemplaza la motivacion', icon: '⚙️', duration: '25 min', type: 'Teoria + Ejercicio', description: 'James Clear + BJ Fogg: el framework completo.', objectives: [], sources: [] },
  { id: 8, pillar: 'Pilar 2 — Construi Tus Habitos', title: 'Planes Si-Entonces', subtitle: 'La tecnica con d=0.65', icon: '🎯', duration: '20 min', type: 'Teoria + Ejercicio practico', description: 'Implementation intentions de Gollwitzer.', objectives: [], sources: [] },
  { id: 9, pillar: 'Pilar 2 — Construi Tus Habitos', title: 'Identidad Primero', subtitle: 'Quien queres SER antes de que queres HACER', icon: '🪞', duration: '20 min', type: 'Teoria + Reflexion', description: 'Cambio basado en identidad.', objectives: [], sources: [] },
  { id: 10, pillar: 'Pilar 2 — Construi Tus Habitos', title: 'Disenia Tu Entorno', subtitle: 'El truco que vale mas que la voluntad', icon: '🏠', duration: '25 min', type: 'Teoria + Auditoria', description: 'Wendy Wood y el diseno de entorno.', objectives: [], sources: [] },
  { id: 11, pillar: 'Pilar 3 — Domina Tu Energia', title: 'Tu Cronotipo', subtitle: 'Cuando hacer que', icon: '🌅', duration: '20 min', type: 'Teoria + Auto-diagnostico', description: 'Daniel Pink y los cronotipos.', objectives: [], sources: [] },
  { id: 12, pillar: 'Pilar 3 — Domina Tu Energia', title: 'El Estado de Flow', subtitle: 'Tu superpoder de 500%', icon: '🌀', duration: '25 min', type: 'Teoria + Protocolo', description: 'Csikszentmihalyi y Kotler.', objectives: [], sources: [] },
  { id: 13, pillar: 'Pilar 3 — Domina Tu Energia', title: 'Suenio y Cerebro', subtitle: 'La base que ignoramos', icon: '🌙', duration: '20 min', type: 'Teoria + Quiz', description: 'Consolidacion de memoria y suenio.', objectives: [], sources: [] },
  { id: 14, pillar: 'Pilar 3 — Domina Tu Energia', title: 'Movimiento y Mente', subtitle: 'Por que caminar es pensar', icon: '🚶', duration: '15 min', type: 'Teoria + Ejercicio', description: 'BDNF y restauracion atencional.', objectives: [], sources: [] },
  { id: 15, pillar: 'Pilar 4 — Aprende de Verdad', title: 'Deja de Subrayar', subtitle: 'Las tecnicas que no funcionan vs las que si', icon: '🖍️', duration: '20 min', type: 'Teoria + Quiz', description: 'Dunlosky y el ranking de tecnicas.', objectives: [], sources: [] },
  { id: 16, pillar: 'Pilar 4 — Aprende de Verdad', title: 'Recuperacion Activa', subtitle: 'El combo imbatible con d=1.26', icon: '🔁', duration: '20 min', type: 'Teoria + Ejercicio', description: 'Roediger, Wozniak y la repeticion espaciada.', objectives: [], sources: [] },
  { id: 17, pillar: 'Pilar 4 — Aprende de Verdad', title: 'Tu Segundo Cerebro', subtitle: 'Obsidian como extension de tu mente', icon: '💎', duration: '25 min', type: 'Teoria + Setup practico', description: 'PARA, Zettelkasten, Obsidian.', objectives: [], sources: [] },
  { id: 18, pillar: 'Pilar 4 — Aprende de Verdad', title: 'IA Sin Descarga Cognitiva', subtitle: 'Pensar CON la maquina', icon: '🤖', duration: '20 min', type: 'Teoria + Quiz', description: 'METR 2025, Anthropic, descarga cognitiva.', objectives: [], sources: [] },
  { id: 19, pillar: 'Pilar 5 — Integra Todo', title: 'Tu Sistema de Rotacion', subtitle: 'El arte de ser multipotencial sin ahogarse', icon: '🎪', duration: '25 min', type: 'Ejercicio guiado', description: 'Los 4 modelos de Wapnick en practica.', objectives: [], sources: [] },
  { id: 20, pillar: 'Pilar Final — Tu Mapa', title: 'El Manifiesto del Creativo', subtitle: 'Tu declaracion personal de identidad', icon: '📜', duration: '20 min', type: 'Reflexion + Integracion', description: 'Arma tu sistema personal completo.', objectives: [], sources: [] }
];
