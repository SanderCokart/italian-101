export type Gender = "m" | "f" | "mf" | null;

export interface VocabItem {
  it: string;
  en: string;
  gender?: Gender;
  note?: string;
}

export interface GrammarPoint {
  title: string;
  explanation: string;
  examples: { it: string; en: string }[];
}

export interface DialogueLine {
  speaker: string;
  it: string;
  en: string;
}

export interface MultipleChoiceExercise {
  id: string;
  type: "multiple-choice";
  prompt: string;
  options: string[];
  answer: number;
  explanation?: string;
}

export interface FillBlankExercise {
  id: string;
  type: "fill-blank";
  prompt: string;
  /** Sentence with ___ for the blank */
  sentence: string;
  answer: string;
  /** Acceptable alternate answers (case-insensitive) */
  accept?: string[];
  hint?: string;
}

export interface MatchExercise {
  id: string;
  type: "match";
  prompt: string;
  pairs: { left: string; right: string }[];
}

export interface ReorderExercise {
  id: string;
  type: "reorder";
  prompt: string;
  /** Lines in correct order */
  lines: string[];
  /** Optional English glosses aligned with lines */
  glosses?: string[];
}

export type Exercise =
  | MultipleChoiceExercise
  | FillBlankExercise
  | MatchExercise
  | ReorderExercise;

export interface Lesson {
  id: string;
  unitId: string;
  number: number;
  title: string;
  titleIt: string;
  summary: string;
  objectives: string[];
  vocabulary: VocabItem[];
  grammar: GrammarPoint[];
  dialogue: DialogueLine[];
  exercises: Exercise[];
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  titleIt: string;
  description: string;
  lessonIds: string[];
}

export interface LessonProgress {
  completed: boolean;
  bestScore: number;
  attempts: number;
  lastAttemptAt?: string;
}

export type ProgressMap = Record<string, LessonProgress>;
