"use client";

import Link from "next/link";
import { useProgress } from "./ProgressProvider";
import { PASS_THRESHOLD } from "@/lib/progress";
import type { Lesson } from "@/lib/types";

export function LessonList({ lessons }: { lessons: Lesson[] }) {
  const { getProgress, isUnlocked, ready } = useProgress();

  return (
    <ol className="lesson-list">
      {lessons.map((lesson) => {
        const unlocked = !ready || isUnlocked(lesson.id);
        const lp = getProgress(lesson.id);
        return (
          <li
            key={lesson.id}
            className={`lesson-item ${unlocked ? "" : "is-locked"} ${lp.completed ? "is-done" : ""}`}
          >
            <div className="lesson-item-main">
              <span className="lesson-num">Lesson {lesson.number}</span>
              <h3>
                {lesson.title}{" "}
                <em className="lesson-it">{lesson.titleIt}</em>
              </h3>
              <p>{lesson.summary}</p>
              {ready && lp.attempts > 0 && (
                <p className="lesson-score">
                  Best score: {lp.bestScore}%
                  {lp.completed
                    ? " · completed"
                    : ` · need ${PASS_THRESHOLD}% to unlock next`}
                </p>
              )}
            </div>
            {unlocked ? (
              <div className="lesson-actions">
                <Link className="btn btn-ghost" href={`/lessons/${lesson.id}`}>
                  Study
                </Link>
                <Link className="btn btn-primary" href={`/practice/${lesson.id}`}>
                  Practice
                </Link>
              </div>
            ) : (
              <span className="lock-label">Locked</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
