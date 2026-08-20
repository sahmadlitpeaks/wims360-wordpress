export type ExamCategory =
  | 'Metabolic'
  | 'Cardio'
  | 'Movement'
  | 'Cognitive'
  | 'Respiratory'
  | 'Body'
  | 'Point of care'
  | 'Gut'
  | 'Nutrition'
  | 'Your own';

export interface Exam {
  name: string;
  category: ExamCategory;
  note: string;
}

/** Display order for the chip grid. */
export const EXAM_CATEGORIES: ExamCategory[] = [
  'Metabolic',
  'Cardio',
  'Movement',
  'Cognitive',
  'Respiratory',
  'Body',
  'Point of care',
  'Gut',
  'Nutrition',
  'Your own',
];

export const EXAMS: Exam[] = [
  {
    name: 'RMR Chex',
    category: 'Metabolic',
    note: 'Resting metabolic rate, measured and tracked against target intake',
  },
  {
    name: 'VO₂ Max Chex',
    category: 'Metabolic',
    note: 'Aerobic capacity with test-to-test trend',
  },
  {
    name: 'ECG Chex',
    category: 'Cardio',
    note: 'Resting trace, interpretation and clinician sign-off',
  },
  {
    name: 'Cardiometabolic Chex',
    category: 'Cardio',
    note: 'Blood pressure, lipids and risk scoring in one view',
  },
  {
    name: 'Physical Chex',
    category: 'Movement',
    note: 'Full physical examination with structured findings',
  },
  {
    name: 'Movement Chex',
    category: 'Movement',
    note: 'Functional movement screen and mobility limits',
  },
  {
    name: 'Performance Chex',
    category: 'Movement',
    note: 'Strength, power and endurance benchmarks over time',
  },
  {
    name: 'Brain Chex',
    category: 'Cognitive',
    note: 'Neuro screen with domain-level scoring',
  },
  {
    name: 'Mind Chex',
    category: 'Cognitive',
    note: 'Mood, stress load and psychological wellbeing',
  },
  {
    name: 'Cognition Chex',
    category: 'Cognitive',
    note: 'Memory, attention and processing speed dials',
  },
  {
    name: 'Breath Chex',
    category: 'Respiratory',
    note: 'Spirometry and breathing pattern assessment',
  },
  {
    name: 'Sleep Chex',
    category: 'Respiratory',
    note: 'Sleep quality, apnoea risk and wearable-confirmed patterns',
  },
  {
    name: 'Body Composition',
    category: 'Body',
    note: 'Fat mass, lean mass and segmental distribution',
  },
  {
    name: 'MSK Chex',
    category: 'Body',
    note: 'Musculoskeletal examination, joint by joint',
  },
  {
    name: 'Radiology',
    category: 'Body',
    note: 'Imaging orders, reports and images in the client record',
  },
  {
    name: 'Zinc Taste Test',
    category: 'Point of care',
    note: 'Chair-side zinc status check, recorded in seconds',
  },
  {
    name: 'Saliva pH',
    category: 'Point of care',
    note: 'Point-of-care acid-base reading with trend',
  },
  {
    name: 'Gut Chex',
    category: 'Gut',
    note: 'Digestive symptoms, bowel patterns and food triggers',
  },
  {
    name: 'NutriChex',
    category: 'Nutrition',
    note: 'Dietary intake, deficiencies and eating patterns',
  },
  {
    name: 'Your own Chex form',
    category: 'Your own',
    note: 'Bring a protocol you already run on paper and we build it as a Chex form',
  },
];
