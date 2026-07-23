"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getLessonProgress,
  isLessonUnlocked,
  loadProgress,
  recordAttempt,
} from "@/lib/progress";
import { getAllLessonIds } from "@/lib/content";
import type { LessonProgress, ProgressMap } from "@/lib/types";

interface ProgressContextValue {
  progress: ProgressMap;
  ready: boolean;
  getProgress: (lessonId: string) => LessonProgress;
  isUnlocked: (lessonId: string) => boolean;
  submitScore: (lessonId: string, score: number) => void;
  refresh: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [ready, setReady] = useState(false);
  const lessonIds = useMemo(() => getAllLessonIds(), []);

  useEffect(() => {
    setProgress(loadProgress());
    setReady(true);
  }, []);

  const getProgress = useCallback(
    (lessonId: string) => getLessonProgress(progress, lessonId),
    [progress],
  );

  const isUnlocked = useCallback(
    (lessonId: string) => isLessonUnlocked(lessonIds, lessonId, progress),
    [lessonIds, progress],
  );

  const submitScore = useCallback((lessonId: string, score: number) => {
    setProgress((prev) => recordAttempt(prev, lessonId, score));
  }, []);

  const refresh = useCallback(() => {
    setProgress(loadProgress());
  }, []);

  const value = useMemo(
    () => ({
      progress,
      ready,
      getProgress,
      isUnlocked,
      submitScore,
      refresh,
    }),
    [progress, ready, getProgress, isUnlocked, submitScore, refresh],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return ctx;
}
