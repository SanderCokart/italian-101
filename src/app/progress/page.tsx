"use client";

import Link from "next/link";
import { useProgress } from "@/components/ProgressProvider";
import { getAllLessonIds, getLessonsForUnit, getUnits } from "@/lib/content";
import { courseStats, PASS_THRESHOLD } from "@/lib/progress";

export default function ProgressPage() {
  const { progress, ready, getProgress, isUnlocked } = useProgress();
  const units = getUnits();
  const allIds = getAllLessonIds();
  const overall = courseStats(allIds, progress);

  return (
    <div className="progress-page">
      <p className="eyebrow">Your path</p>
      <h1 className="page-title">Progress</h1>
      <p className="lede">
        Complete practice with at least {PASS_THRESHOLD}% to unlock the next
        lesson. Progress is saved in this browser.
      </p>

      <div className="stat-row">
        <div className="stat">
          <strong>{ready ? `${overall.percent}%` : "—"}</strong>
          <span>course complete</span>
        </div>
        <div className="stat">
          <strong>
            {ready ? `${overall.completed}/${overall.total}` : "—"}
          </strong>
          <span>lessons passed</span>
        </div>
      </div>

      <div className="progress-units">
        {units.map((unit) => {
          const lessons = getLessonsForUnit(unit.id);
          const stats = courseStats(unit.lessonIds, progress);
          return (
            <section key={unit.id} className="progress-unit">
              <h3>
                <Link href={`/units/${unit.id}`}>
                  Unit {unit.number}: {unit.title}
                </Link>
              </h3>
              <div className="mini-bar" aria-hidden>
                <span style={{ width: `${ready ? stats.percent : 0}%` }} />
              </div>
              <ol className="lesson-list">
                {lessons.map((lesson) => {
                  const lp = getProgress(lesson.id);
                  const unlocked = !ready || isUnlocked(lesson.id);
                  return (
                    <li
                      key={lesson.id}
                      className={`lesson-item ${unlocked ? "" : "is-locked"} ${lp.completed ? "is-done" : ""}`}
                    >
                      <div className="lesson-item-main">
                        <span className="lesson-num">
                          Lesson {lesson.number}
                        </span>
                        <h3>{lesson.title}</h3>
                        <p>
                          {!unlocked
                            ? "Locked"
                            : lp.attempts === 0
                              ? "Not started"
                              : `Best ${lp.bestScore}% · ${lp.attempts} attempt${lp.attempts === 1 ? "" : "s"}`}
                        </p>
                      </div>
                      {unlocked ? (
                        <Link
                          className="btn btn-ghost"
                          href={`/lessons/${lesson.id}`}
                        >
                          Open
                        </Link>
                      ) : (
                        <span className="lock-label">Locked</span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </div>
  );
}
