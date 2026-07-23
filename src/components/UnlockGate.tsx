"use client";

import Link from "next/link";
import { useProgress } from "./ProgressProvider";

export function UnlockGate({
  lessonId,
  children,
}: {
  lessonId: string;
  children: React.ReactNode;
}) {
  const { ready, isUnlocked } = useProgress();

  if (!ready) {
    return <p className="lede">Loading progress…</p>;
  }

  if (!isUnlocked(lessonId)) {
    return (
      <div className="practice-result">
        <p className="eyebrow">Locked</p>
        <h1 className="page-title">Complete the previous lesson first</h1>
        <p className="lede">
          Pass the previous practice with at least 70% to unlock this lesson.
        </p>
        <div className="btn-row">
          <Link className="btn btn-primary" href="/progress">
            View progress
          </Link>
          <Link className="btn btn-ghost" href="/">
            Home
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
