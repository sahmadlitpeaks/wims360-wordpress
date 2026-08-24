export type ExamCategory =
  | 'Metabolic'
  | 'Cardio'
  | 'Cognition'
  | 'Mind'
  | 'Sleep'
  | 'Gut'
  | 'Movement'
  | 'Performance'
  | 'Respiratory'
  | 'Body';

export interface Exam {
  name: string;
  category: ExamCategory;
  note: string;
}

/**
 * The examination chips. Names follow the approved content direction, and
 * each one records its findings in structured fields so it can be compared
 * against the same examination taken earlier in the journey.
 */
export const EXAMS: Exam[] = [
  {
    name: 'Metabolic',
    category: 'Metabolic',
    note: 'Metabolic status recorded and followed across the journey',
  },
  {
    name: 'RMR',
    category: 'Metabolic',
    note: 'Resting metabolic rate, measured and tracked against intake',
  },
  {
    name: 'Cardiometabolic',
    category: 'Cardio',
    note: 'Blood pressure, lipids and related findings in one view',
  },
  {
    name: 'ECG',
    category: 'Cardio',
    note: 'Resting trace with interpretation and practitioner sign-off',
  },
  {
    name: 'Cognition',
    category: 'Cognition',
    note: 'Memory, attention and processing speed, recorded by domain',
  },
  {
    name: 'Brain',
    category: 'Cognition',
    note: 'Neurological screen with structured, domain-level findings',
  },
  {
    name: 'Mind',
    category: 'Mind',
    note: 'Psychological wellbeing and perceived stress load',
  },
  {
    name: 'Mood',
    category: 'Mind',
    note: 'Mood assessment, repeatable and readable over time',
  },
  {
    name: 'Sleep',
    category: 'Sleep',
    note: 'Sleep quality and pattern, alongside data from supported devices',
  },
  {
    name: 'Gut',
    category: 'Gut',
    note: 'Digestive symptoms, bowel patterns and food triggers',
  },
  {
    name: 'Movement',
    category: 'Movement',
    note: 'Functional movement screen with mobility findings',
  },
  {
    name: 'Muscle',
    category: 'Movement',
    note: 'Strength and muscular findings recorded region by region',
  },
  {
    name: 'Spine',
    category: 'Movement',
    note: 'Spinal assessment with structured, repeatable findings',
  },
  {
    name: 'Performance',
    category: 'Performance',
    note: 'Strength, power and endurance benchmarks over time',
  },
  {
    name: 'VO₂ Max',
    category: 'Performance',
    note: 'Aerobic capacity with a test-to-test trend',
  },
  {
    name: 'Breath',
    category: 'Respiratory',
    note: 'Breathing pattern and respiratory function assessment',
  },
  {
    name: 'Body',
    category: 'Body',
    note: 'Body composition, including fat mass, lean mass and distribution',
  },
];
