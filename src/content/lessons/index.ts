import { unit1Lessons } from "./unit1";
import { unit2Lessons } from "./unit2";
import { unit3Lessons } from "./unit3";
import { unit4Lessons } from "./unit4";
import { unit5Lessons } from "./unit5";
import { unit6Lessons } from "./unit6";
import type { Lesson } from "@/lib/types";

export const allLessons: Lesson[] = [
  ...unit1Lessons,
  ...unit2Lessons,
  ...unit3Lessons,
  ...unit4Lessons,
  ...unit5Lessons,
  ...unit6Lessons,
];

export {
  unit1Lessons,
  unit2Lessons,
  unit3Lessons,
  unit4Lessons,
  unit5Lessons,
  unit6Lessons,
};
