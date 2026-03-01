import { browser } from '$app/environment';

const STORAGE_KEY = 'mentes-con-ruido-progress';

interface ModuleProgress {
  completed: boolean;
  score: number;
  maxScore: number;
  startedAt?: string;
  completedAt?: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt?: string;
}

interface CourseState {
  currentModule: number;
  modules: Record<number, ModuleProgress>;
  totalScore: number;
  badges: Badge[];
  vocabularyDismissed: string[];
  userName: string;
  startedAt: string;
  multipotentialProfile?: string;
}

export const allBadges: Badge[] = [
  { id: 'despertar', name: 'El Despertar', icon: '👁️', description: 'Completaste el Pilar 0 y entendiste por que tu cerebro funciona asi' },
  { id: 'neurocientista', name: 'Neurocientista Amateur', icon: '🧠', description: 'Completaste el Pilar 1 — Entende Tu Cerebro' },
  { id: 'arquitecto-habitos', name: 'Arquitecto de Habitos', icon: '🏗️', description: 'Completaste el Pilar 2 — Construi Tus Habitos' },
  { id: 'gestor-energia', name: 'Gestor de Energia', icon: '⚡', description: 'Completaste el Pilar 3 — Domina Tu Energia' },
  { id: 'aprendiz-real', name: 'Aprendiz de Verdad', icon: '📚', description: 'Completaste el Pilar 4 — Aprende de Verdad' },
  { id: 'integrador', name: 'El Integrador', icon: '🎯', description: 'Completaste el Pilar 5 — Integra Todo' },
  { id: 'creativo-productivo', name: 'Creativo Productivo', icon: '🎨', description: 'Completaste todo el curso y armaste tu sistema personal' },
  { id: 'full-nerd', name: 'Full Nerd', icon: '🔬', description: 'Respondiste correctamente todas las preguntas de ciencia' },
  { id: 'multipotencial', name: 'Multipotencialita', icon: '🌈', description: 'Descubriste tu modelo multipotencial' },
  { id: 'primer-paso', name: 'Primer Paso', icon: '👣', description: 'Completaste tu primer modulo' }
];

function createDefaultState(): CourseState {
  return {
    currentModule: 0,
    modules: {},
    totalScore: 0,
    badges: [],
    vocabularyDismissed: [],
    userName: '',
    startedAt: new Date().toISOString(),
    multipotentialProfile: undefined
  };
}

function loadState(): CourseState {
  if (!browser) return createDefaultState();
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return createDefaultState();
}

function saveState(state: CourseState) {
  if (!browser) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

function createCourseStore() {
  let state = $state<CourseState>(loadState());

  $effect(() => {
    saveState(state);
  });

  return {
    get state() { return state; },

    get progressPercent() {
      const completed = Object.values(state.modules).filter(m => m.completed).length;
      return Math.round((completed / 20) * 100); // 20 total modules
    },

    get completedCount() {
      return Object.values(state.modules).filter(m => m.completed).length;
    },

    setUserName(name: string) {
      state.userName = name;
    },

    setMultipotentialProfile(profile: string) {
      state.multipotentialProfile = profile;
    },

    startModule(id: number) {
      if (!state.modules[id]) {
        state.modules[id] = {
          completed: false,
          score: 0,
          maxScore: 0,
          startedAt: new Date().toISOString()
        };
      }
      state = { ...state };
    },

    completeModule(id: number, score: number, maxScore: number) {
      state.modules[id] = {
        completed: true,
        score,
        maxScore,
        startedAt: state.modules[id]?.startedAt ?? new Date().toISOString(),
        completedAt: new Date().toISOString()
      };
      state.totalScore = Object.values(state.modules).reduce((sum, m) => sum + m.score, 0);
      if (id >= state.currentModule) {
        state.currentModule = id + 1;
      }
      state = { ...state };
    },

    unlockBadge(badgeId: string): Badge | null {
      if (state.badges.find(b => b.id === badgeId)) return null;
      const badge = allBadges.find(b => b.id === badgeId);
      if (!badge) return null;
      const unlocked = { ...badge, unlockedAt: new Date().toISOString() };
      state.badges = [...state.badges, unlocked];
      state = { ...state };
      return unlocked;
    },

    dismissVocabulary(termId: string) {
      if (!state.vocabularyDismissed.includes(termId)) {
        state.vocabularyDismissed = [...state.vocabularyDismissed, termId];
        state = { ...state };
      }
    },

    reset() {
      state = createDefaultState();
    }
  };
}

export const courseStore = createCourseStore();
