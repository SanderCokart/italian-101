"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type {
  Exercise,
  FillBlankExercise,
  MatchExercise,
  MultipleChoiceExercise,
  ReorderExercise,
} from "@/lib/types";
import { getNextLessonId } from "@/lib/content";
import { PASS_THRESHOLD } from "@/lib/progress";
import { useProgress } from "./ProgressProvider";

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function checkFill(ex: FillBlankExercise, value: string) {
  const n = normalize(value);
  if (n === normalize(ex.answer)) return true;
  return (ex.accept ?? []).some((a) => normalize(a) === n);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function MultipleChoiceCard({
  exercise,
  onResult,
}: {
  exercise: MultipleChoiceExercise;
  onResult: (correct: boolean) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const locked = picked !== null;

  return (
    <div className="ex-card">
      <p className="ex-prompt">{exercise.prompt}</p>
      <div className="ex-options">
        {exercise.options.map((opt, i) => {
          let cls = "ex-option";
          if (locked) {
            if (i === exercise.answer) cls += " is-correct";
            else if (i === picked) cls += " is-wrong";
          }
          return (
            <button
              key={opt}
              type="button"
              className={cls}
              disabled={locked}
              onClick={() => {
                setPicked(i);
                onResult(i === exercise.answer);
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {locked && exercise.explanation ? (
        <p className="ex-explain">{exercise.explanation}</p>
      ) : null}
    </div>
  );
}

function FillBlankCard({
  exercise,
  onResult,
}: {
  exercise: FillBlankExercise;
  onResult: (correct: boolean) => void;
}) {
  const [value, setValue] = useState("");
  const [done, setDone] = useState(false);
  const correct = done && checkFill(exercise, value);

  return (
    <div className="ex-card">
      <p className="ex-prompt">{exercise.prompt}</p>
      <p className="ex-sentence" lang="it">
        {exercise.sentence.split("___").map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 ? (
              <input
                className="ex-blank"
                value={value}
                disabled={done}
                onChange={(e) => setValue(e.target.value)}
                aria-label="Answer"
                autoFocus
              />
            ) : null}
          </span>
        ))}
      </p>
      {exercise.hint && !done ? (
        <p className="ex-hint">Hint: {exercise.hint}</p>
      ) : null}
      {!done ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setDone(true);
            onResult(checkFill(exercise, value));
          }}
          disabled={!value.trim()}
        >
          Check
        </button>
      ) : (
        <p className={correct ? "ex-feedback ok" : "ex-feedback bad"}>
          {correct
            ? "Correct!"
            : `Not quite — answer: ${exercise.answer}`}
        </p>
      )}
    </div>
  );
}

function MatchCard({
  exercise,
  onResult,
}: {
  exercise: MatchExercise;
  onResult: (correct: boolean) => void;
}) {
  const lefts = exercise.pairs.map((p) => p.left);
  const rights = useMemo(
    () => shuffle(exercise.pairs.map((p) => p.right)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [exercise.id],
  );
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [wrongFlash, setWrongFlash] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const answerMap = useMemo(() => {
    const m: Record<string, string> = {};
    for (const p of exercise.pairs) m[p.left] = p.right;
    return m;
  }, [exercise.pairs]);

  function pickRight(right: string) {
    if (!selectedLeft || done) return;
    if (Object.values(matched).includes(right)) return;
    if (answerMap[selectedLeft] === right) {
      const next = { ...matched, [selectedLeft]: right };
      setMatched(next);
      setSelectedLeft(null);
      if (Object.keys(next).length === exercise.pairs.length) {
        setDone(true);
        onResult(true);
      }
    } else {
      setWrongFlash(right);
      setTimeout(() => setWrongFlash(null), 450);
      setSelectedLeft(null);
    }
  }

  return (
    <div className="ex-card">
      <p className="ex-prompt">{exercise.prompt}</p>
      <p className="ex-hint">Tap a left item, then its match on the right.</p>
      <div className="match-grid">
        <div className="match-col">
          {lefts.map((l) => (
            <button
              key={l}
              type="button"
              className={`match-chip ${selectedLeft === l ? "is-selected" : ""} ${matched[l] ? "is-matched" : ""}`}
              disabled={!!matched[l] || done}
              onClick={() => setSelectedLeft(l)}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="match-col">
          {rights.map((r) => (
            <button
              key={r}
              type="button"
              className={`match-chip ${Object.values(matched).includes(r) ? "is-matched" : ""} ${wrongFlash === r ? "is-wrong" : ""}`}
              disabled={Object.values(matched).includes(r) || done}
              onClick={() => pickRight(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      {done ? <p className="ex-feedback ok">All matched!</p> : null}
    </div>
  );
}

function ReorderCard({
  exercise,
  onResult,
}: {
  exercise: ReorderExercise;
  onResult: (correct: boolean) => void;
}) {
  const [order, setOrder] = useState(() =>
    shuffle(exercise.lines.map((_, i) => i)),
  );
  const [done, setDone] = useState(false);
  const correct =
    done && order.every((idx, position) => idx === position);

  function move(i: number, dir: -1 | 1) {
    if (done) return;
    const j = i + dir;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[i], next[j]] = [next[j], next[i]];
    setOrder(next);
  }

  return (
    <div className="ex-card">
      <p className="ex-prompt">{exercise.prompt}</p>
      <ol className="reorder-list">
        {order.map((lineIdx, i) => (
          <li key={`${lineIdx}-${i}`}>
            <span lang="it">{exercise.lines[lineIdx]}</span>
            <div className="reorder-btns">
              <button
                type="button"
                aria-label="Move up"
                disabled={done || i === 0}
                onClick={() => move(i, -1)}
              >
                ↑
              </button>
              <button
                type="button"
                aria-label="Move down"
                disabled={done || i === order.length - 1}
                onClick={() => move(i, 1)}
              >
                ↓
              </button>
            </div>
          </li>
        ))}
      </ol>
      {!done ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            const ok = order.every((idx, position) => idx === position);
            setDone(true);
            onResult(ok);
          }}
        >
          Check order
        </button>
      ) : (
        <p className={correct ? "ex-feedback ok" : "ex-feedback bad"}>
          {correct ? "Perfect order!" : "Not quite — study the dialogue again."}
        </p>
      )}
    </div>
  );
}

function ExerciseSwitch({
  exercise,
  onResult,
}: {
  exercise: Exercise;
  onResult: (correct: boolean) => void;
}) {
  switch (exercise.type) {
    case "multiple-choice":
      return <MultipleChoiceCard exercise={exercise} onResult={onResult} />;
    case "fill-blank":
      return <FillBlankCard exercise={exercise} onResult={onResult} />;
    case "match":
      return <MatchCard exercise={exercise} onResult={onResult} />;
    case "reorder":
      return <ReorderCard exercise={exercise} onResult={onResult} />;
  }
}

export function ExerciseRunner({
  lessonId,
  exercises,
  title,
}: {
  lessonId: string;
  exercises: Exercise[];
  title: string;
}) {
  const { submitScore } = useProgress();
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [awaitingNext, setAwaitingNext] = useState(false);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const total = exercises.length;
  const exercise = exercises[index];
  const nextId = getNextLessonId(lessonId);

  function handleResult(correct: boolean) {
    const nextCorrect = correctCount + (correct ? 1 : 0);
    setCorrectCount(nextCorrect);
    setAwaitingNext(true);

    if (index >= total - 1) {
      const score = Math.round((nextCorrect / total) * 100);
      setFinalScore(score);
      submitScore(lessonId, score);
      setFinished(true);
    }
  }

  function goNext() {
    setAwaitingNext(false);
    setIndex((i) => i + 1);
  }

  if (finished) {
    const passed = finalScore >= PASS_THRESHOLD;
    return (
      <div className="practice-result">
        <p className="eyebrow">Practice complete</p>
        <h1>{finalScore}%</h1>
        <p>
          You got {correctCount} of {total} right on <strong>{title}</strong>.
        </p>
        <p className={passed ? "ex-feedback ok" : "ex-feedback bad"}>
          {passed
            ? "Passed — next lesson unlocked."
            : `Need ${PASS_THRESHOLD}% to unlock the next lesson. Try again!`}
        </p>
        <div className="btn-row">
          <Link className="btn btn-ghost" href={`/lessons/${lessonId}`}>
            Review lesson
          </Link>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setIndex(0);
              setCorrectCount(0);
              setAwaitingNext(false);
              setFinished(false);
              setFinalScore(0);
            }}
          >
            Retry
          </button>
          {passed && nextId ? (
            <Link className="btn btn-primary" href={`/lessons/${nextId}`}>
              Next lesson
            </Link>
          ) : (
            <Link className="btn btn-primary" href="/progress">
              View progress
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="practice-shell">
      <div className="practice-top">
        <p className="eyebrow">{title}</p>
        <div className="practice-progress">
          <span>
            {index + 1} / {total}
          </span>
          <div className="mini-bar">
            <span style={{ width: `${((index + (awaitingNext ? 1 : 0)) / total) * 100}%` }} />
          </div>
        </div>
      </div>

      <ExerciseSwitch
        key={exercise.id}
        exercise={exercise}
        onResult={handleResult}
      />

      {awaitingNext && !finished ? (
        <button type="button" className="btn btn-primary" onClick={goNext}>
          Next
        </button>
      ) : null}
    </div>
  );
}
