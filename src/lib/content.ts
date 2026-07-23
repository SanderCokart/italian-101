import { units } from "@/content/units";
import { allLessons } from "@/content/lessons";
import type { Lesson, Unit } from "./types";

export function getUnits(): Unit[] {
  return units;
}

export function getUnit(unitId: string): Unit | undefined {
  return units.find((u) => u.id === unitId);
}

export function getLesson(lessonId: string): Lesson | undefined {
  return allLessons.find((l) => l.id === lessonId);
}

export function getLessonsForUnit(unitId: string): Lesson[] {
  return allLessons
    .filter((l) => l.unitId === unitId)
    .sort((a, b) => a.number - b.number);
}

export function getAllLessonIds(): string[] {
  return units.flatMap((u) => u.lessonIds);
}

export function getNextLessonId(lessonId: string): string | null {
  const ids = getAllLessonIds();
  const i = ids.indexOf(lessonId);
  if (i < 0 || i >= ids.length - 1) return null;
  return ids[i + 1];
}

export function getPrevLessonId(lessonId: string): string | null {
  const ids = getAllLessonIds();
  const i = ids.indexOf(lessonId);
  if (i <= 0) return null;
  return ids[i - 1];
}
