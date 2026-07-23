import type { LessonProgress, ProgressMap } from "./types";

const STORAGE_KEY = "italian-101-progress";
export const PASS_THRESHOLD = 70;

export function emptyProgress(): ProgressMap {
  return {};
}

export function loadProgress(): ProgressMap {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    return JSON.parse(raw) as ProgressMap;
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(progress: ProgressMap): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getLessonProgress(
  progress: ProgressMap,
  lessonId: string,
): LessonProgress {
  return (
    progress[lessonId] ?? {
      completed: false,
      bestScore: 0,
      attempts: 0,
    }
  );
}

export function recordAttempt(
  progress: ProgressMap,
  lessonId: string,
  score: number,
): ProgressMap {
  const prev = getLessonProgress(progress, lessonId);
  const bestScore = Math.max(prev.bestScore, score);
  const completed = prev.completed || score >= PASS_THRESHOLD;
  const next: ProgressMap = {
    ...progress,
    [lessonId]: {
      completed,
      bestScore,
      attempts: prev.attempts + 1,
      lastAttemptAt: new Date().toISOString(),
    },
  };
  saveProgress(next);
  return next;
}

export function isLessonUnlocked(
  lessonIds: string[],
  lessonId: string,
  progress: ProgressMap,
): boolean {
  const index = lessonIds.indexOf(lessonId);
  if (index <= 0) return true;
  const prevId = lessonIds[index - 1];
  return getLessonProgress(progress, prevId).completed;
}

export function courseStats(
  lessonIds: string[],
  progress: ProgressMap,
): { completed: number; total: number; percent: number } {
  const completed = lessonIds.filter(
    (id) => getLessonProgress(progress, id).completed,
  ).length;
  const total = lessonIds.length;
  return {
    completed,
    total,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}
