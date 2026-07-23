"use client";

import Link from "next/link";
import { useProgress } from "./ProgressProvider";
import { courseStats } from "@/lib/progress";
import type { Unit } from "@/lib/types";

export function UnitCard({ unit }: { unit: Unit }) {
  const { progress, ready } = useProgress();
  const stats = courseStats(unit.lessonIds, progress);
  const firstLesson = unit.lessonIds[0];

  return (
    <article className="unit-row">
      <div className="unit-row-index" aria-hidden>
        {String(unit.number).padStart(2, "0")}
      </div>
      <div className="unit-row-body">
        <p className="unit-row-it">{unit.titleIt}</p>
        <h3 className="unit-row-title">{unit.title}</h3>
        <p className="unit-row-desc">{unit.description}</p>
        <div className="unit-row-meta">
          <span>
            {ready ? `${stats.completed}/${stats.total} lessons` : "…"}
          </span>
          <div className="mini-bar" aria-hidden>
            <span style={{ width: `${ready ? stats.percent : 0}%` }} />
          </div>
        </div>
      </div>
      <Link className="btn btn-ghost" href={`/units/${unit.id}`}>
        Open unit
      </Link>
      <Link className="sr-only" href={`/lessons/${firstLesson}`}>
        Start first lesson
      </Link>
    </article>
  );
}
