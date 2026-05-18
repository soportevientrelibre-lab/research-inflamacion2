// ===== VIENTRE LIBRE · RESET 21 — Quiz Scoring Engine =====
// Locked from ANTIGRAVITY-BRIEF-v1.0.md — DO NOT MODIFY without re-lock

export type Perfil = "glucemico" | "hormonal" | "mixto-sibo";

export interface QuizScores {
  glucemico: number;
  hormonal: number;
  mixto: number;
}

export interface QuizResult {
  perfil: Perfil;
  scores: QuizScores;
  percentages: {
    glucemico: number;
    hormonal: number;
    mixto: number;
  };
}

// ===== Quiz Questions Definition =====

export interface QuizOption {
  label: string;
  value: string;
}

export interface QuizQuestion {
  id: string;
  number: number;
  question: string;
  subtitle?: string;
  options: QuizOption[];
  multiSelect?: boolean;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    number: 1,
    question: "¿En qué franja de edad estás?",
    options: [
      { label: "Menos de 35", value: "<35" },
      { label: "35 – 42", value: "35-42" },
      { label: "43 – 49", value: "43-49" },
      { label: "50 o más", value: "50+" },
    ],
  },
  {
    id: "q2",
    number: 2,
    question: "¿Cuándo notas más hinchazón?",
    subtitle: "Piensa en un día normal",
    options: [
      { label: "Por la mañana", value: "Mañana" },
      { label: "Al mediodía", value: "Mediodía" },
      { label: "Por la tarde", value: "Tarde" },
      { label: "Por la noche", value: "Noche" },
      { label: "Todo el día", value: "Todo el día" },
    ],
  },
  {
    id: "q3",
    number: 3,
    question: "¿Comes regularmente alguno de estos?",
    subtitle: "Selecciona todos los que apliquen",
    multiSelect: true,
    options: [
      { label: "🥣 Avena", value: "Avena" },
      { label: "🥦 Brócoli", value: "Brócoli" },
      { label: "🫘 Garbanzos", value: "Garbanzos" },
      { label: "🥬 Kale", value: "Kale" },
      { label: "🧅 Cebolla/ajo cocinados", value: "Cebolla/ajo cocinados" },
    ],
  },
  {
    id: "q4",
    number: 4,
    question: "¿Tus ciclos menstruales son…?",
    options: [
      { label: "Regulares", value: "Regulares" },
      { label: "Irregulares hace menos de 1 año", value: "Irregulares <1 año" },
      { label: "Irregulares hace más de 1 año", value: "Irregulares >1 año" },
      { label: "Ya no tengo regla", value: "Sin regla" },
      { label: "Tomo anticonceptivo continuo", value: "Anticonceptivo continuo" },
    ],
  },
  {
    id: "q5",
    number: 5,
    question: "¿Has notado que el estrés te afecta físicamente MÁS que antes?",
    options: [
      { label: "Sí, mucho más", value: "Mucho más" },
      { label: "Algo más", value: "Algo más" },
      { label: "Igual que siempre", value: "Igual" },
      { label: "No, la verdad que no", value: "No" },
    ],
  },
  {
    id: "q6",
    number: 6,
    question: "¿Has eliminado gluten/lácteos al menos 1 mes y volviste a comerlos?",
    options: [
      { label: "Sí, pero no noté gran cambio", value: "Sin gran cambio" },
      { label: "Sí, mejoré pero al volver empeoró", value: "Mejoré y empeoró al volver" },
      { label: "Lo eliminé y lo mantengo", value: "Mantengo" },
      { label: "Nunca lo he probado", value: "Nunca lo probé" },
    ],
  },
  {
    id: "q7",
    number: 7,
    question: "¿Qué te ha dicho tu médico cuando te has quejado de inflamación?",
    options: [
      { label: "\"Es estrés\"", value: "Es estrés" },
      { label: "\"Es la edad\"", value: "Es la edad" },
      { label: "\"Tus análisis están bien\"", value: "Análisis bien" },
      { label: "Me dieron probióticos", value: "Probióticos" },
      { label: "Nunca he ido por esto", value: "Nunca he ido" },
    ],
  },
  {
    id: "q8",
    number: 8,
    question: "¿Cuál de estas frases te describe MÁS?",
    subtitle: "Elige la que más resuene contigo",
    options: [
      { label: "Como sano y sigo inflamada", value: "Como sano y sigo inflamada" },
      { label: "Me hincho con cualquier cosa", value: "Me hincho con cualquier cosa" },
      { label: "Parezco embarazada por la tarde", value: "Parezco embarazada por la tarde" },
      { label: "Empeoré después de los 40", value: "Empeoré después de los 40" },
    ],
  },
];

// ===== Scoring Map (from ANTIGRAVITY-BRIEF-v1.0.md) =====

type ScoreMap = Record<string, { glucemico: number; hormonal: number; mixto: number }>;

const scoringMap: Record<string, ScoreMap> = {
  q1: {
    "<35": { glucemico: 1, hormonal: 0, mixto: 0 },
    "35-42": { glucemico: 1, hormonal: 2, mixto: 1 },
    "43-49": { glucemico: 1, hormonal: 3, mixto: 2 },
    "50+": { glucemico: 1, hormonal: 3, mixto: 2 },
  },
  q2: {
    Mañana: { glucemico: 0, hormonal: 0, mixto: 3 },
    Mediodía: { glucemico: 2, hormonal: 1, mixto: 1 },
    Tarde: { glucemico: 3, hormonal: 1, mixto: 1 },
    Noche: { glucemico: 1, hormonal: 2, mixto: 2 },
    "Todo el día": { glucemico: 1, hormonal: 2, mixto: 3 },
  },
  q3: {
    Avena: { glucemico: 2, hormonal: 0, mixto: 1 },
    Brócoli: { glucemico: 0, hormonal: 0, mixto: 2 },
    Garbanzos: { glucemico: 1, hormonal: 0, mixto: 2 },
    Kale: { glucemico: 0, hormonal: 0, mixto: 2 },
    "Cebolla/ajo cocinados": { glucemico: 0, hormonal: 0, mixto: 3 },
  },
  q4: {
    Regulares: { glucemico: 1, hormonal: 0, mixto: 1 },
    "Irregulares <1 año": { glucemico: 0, hormonal: 2, mixto: 1 },
    "Irregulares >1 año": { glucemico: 0, hormonal: 3, mixto: 2 },
    "Sin regla": { glucemico: 0, hormonal: 3, mixto: 1 },
    "Anticonceptivo continuo": { glucemico: 1, hormonal: 1, mixto: 1 },
  },
  q5: {
    "Mucho más": { glucemico: 1, hormonal: 3, mixto: 2 },
    "Algo más": { glucemico: 1, hormonal: 2, mixto: 1 },
    Igual: { glucemico: 1, hormonal: 0, mixto: 0 },
    No: { glucemico: 1, hormonal: 0, mixto: 0 },
  },
  q6: {
    "Sin gran cambio": { glucemico: 1, hormonal: 1, mixto: 3 },
    "Mejoré y empeoró al volver": { glucemico: 1, hormonal: 1, mixto: 3 },
    Mantengo: { glucemico: 0, hormonal: 1, mixto: 1 },
    "Nunca lo probé": { glucemico: 1, hormonal: 1, mixto: 0 },
  },
  q7: {
    "Es estrés": { glucemico: 1, hormonal: 2, mixto: 1 },
    "Es la edad": { glucemico: 1, hormonal: 3, mixto: 1 },
    "Análisis bien": { glucemico: 1, hormonal: 1, mixto: 2 },
    Probióticos: { glucemico: 0, hormonal: 1, mixto: 2 },
    "Nunca he ido": { glucemico: 0, hormonal: 0, mixto: 0 },
  },
  q8: {
    "Como sano y sigo inflamada": { glucemico: 2, hormonal: 1, mixto: 3 },
    "Me hincho con cualquier cosa": { glucemico: 1, hormonal: 1, mixto: 3 },
    "Parezco embarazada por la tarde": { glucemico: 3, hormonal: 2, mixto: 1 },
    "Empeoré después de los 40": { glucemico: 1, hormonal: 3, mixto: 2 },
  },
};

// ===== Scoring Function =====

export function calculateQuizResult(
  answers: Record<string, string | string[]>
): QuizResult {
  const scores: QuizScores = { glucemico: 0, hormonal: 0, mixto: 0 };

  for (const [questionId, answer] of Object.entries(answers)) {
    const questionScores = scoringMap[questionId];
    if (!questionScores) continue;

    if (Array.isArray(answer)) {
      // Multi-select (q3): sum all selected
      for (const selection of answer) {
        const s = questionScores[selection];
        if (s) {
          scores.glucemico += s.glucemico;
          scores.hormonal += s.hormonal;
          scores.mixto += s.mixto;
        }
      }
    } else {
      const s = questionScores[answer];
      if (s) {
        scores.glucemico += s.glucemico;
        scores.hormonal += s.hormonal;
        scores.mixto += s.mixto;
      }
    }
  }

  // Determine winner
  let perfil: Perfil;
  if (
    scores.glucemico === scores.hormonal &&
    scores.glucemico >= scores.mixto
  ) {
    // Tie glucemico-hormonal → assign mixto (per brief)
    perfil = "mixto-sibo";
  } else if (
    scores.glucemico >= scores.hormonal &&
    scores.glucemico >= scores.mixto
  ) {
    perfil = "glucemico";
  } else if (scores.hormonal >= scores.mixto) {
    perfil = "hormonal";
  } else {
    perfil = "mixto-sibo";
  }

  // Calculate percentages for display
  const total = scores.glucemico + scores.hormonal + scores.mixto || 1;
  const percentages = {
    glucemico: Math.round((scores.glucemico / total) * 100),
    hormonal: Math.round((scores.hormonal / total) * 100),
    mixto: Math.round((scores.mixto / total) * 100),
  };

  return { perfil, scores, percentages };
}

// ===== Profile Descriptions =====

export interface PerfilInfo {
  title: string;
  subtitle: string;
  emoji: string;
  description: string;
  bullets: string[];
  color: string;
  colorLight: string;
}

export const perfilDescriptions: Record<Perfil, PerfilInfo> = {
  glucemico: {
    title: "La Paradoja Glucémica",
    subtitle: "Tu inflamación tiene raíz metabólica",
    emoji: "📊",
    description:
      "Tu inflamación viene principalmente de picos de glucosa provocados por la resistencia a la insulina creciente que tu cuerpo desarrolla a partir de los 35. Alimentos como la avena, el pan integral o la fruta a deshora están disparando cascadas inflamatorias silenciosas que se manifiestan como hinchazón a media tarde.",
    bullets: [
      "Reordenar el orden glucémico de tus comidas para eliminar los picos que te inflaman — desde el día 1",
      "Identificar tus 3-5 alimentos \"sanos\" específicos que a TU cuerpo le provocan pico de glucosa",
      "Crear tu protocolo personalizado de desayuno, comida y cena que mantiene la glucosa estable sin contar calorías",
    ],
    color: "#E07856",
    colorLight: "#FDF0EB",
  },
  hormonal: {
    title: "La Paradoja Hormonal-Perimenopausia",
    subtitle: "Tu cuerpo está en una transición que nadie te explicó",
    emoji: "🌙",
    description:
      "Tu inflamación está vinculada al cambio hormonal de la perimenopausia — una fase que puede empezar a los 38 y durar hasta 10 años. La caída de progesterona y las oscilaciones de estrógeno están ralentizando tu intestino, aumentando la retención y disparando inflamación de bajo grado constante.",
    bullets: [
      "Adaptar tu alimentación a cada fase de tu ciclo menstrual — las reglas cambian según estés en folicular, lútea o premenstrual",
      "Neutralizar la inflamación hormonal con el protocolo específico del Módulo 3 (que ningún otro programa en español tiene)",
      "Recuperar el escudo que tu microbiota perdió al cambiar tus niveles hormonales",
    ],
    color: "#7B68AE",
    colorLight: "#F3F0F9",
  },
  "mixto-sibo": {
    title: "La Paradoja Mixta (SIBO + Hormonal)",
    subtitle: "Varios sistemas te inflaman a la vez",
    emoji: "🔬",
    description:
      "Tu inflamación tiene un origen compuesto: bacterias en el lugar equivocado del intestino (SIBO) combinadas con cambios hormonales. Cuando comes alimentos con FODMAP altos (brócoli, cebolla, garbanzos) las bacterias fermentan en el intestino delgado generando gas y distensión — y tus hormonas amplifican la respuesta.",
    bullets: [
      "Retirar estratégicamente los 5 Villanos que más fermentan en TU intestino durante los primeros 14 días",
      "Implementar el protocolo de reintroducción sistemática para saber exactamente cuáles son TUS detonadores y cuáles puedes volver a comer",
      "Reconstruir tu microbiota con la secuencia correcta — resetear antes de repoblar (no al revés, como hacen los probióticos genéricos)",
    ],
    color: "#5C6F47",
    colorLight: "#F0F3EC",
  },
};
