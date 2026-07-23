"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  buildPool,
  SPEAKING_STAGES,
  type OrderMode,
  type SpeakingMode,
  type SpeakingPrompt,
  type SpeakingStageId,
} from "@/content/speaking";
import {
  getSpeakingSlot,
  loadSpeakingStorage,
  saveSpeakingSettings,
  upsertSpeakingSlot,
  type SpeakingStorage,
} from "@/lib/speaking-progress";

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function orderByIds(
  pool: SpeakingPrompt[],
  sessionIds: string[],
): SpeakingPrompt[] {
  const map = new Map(pool.map((p) => [p.id, p]));
  const ordered: SpeakingPrompt[] = [];
  const used = new Set<string>();
  for (const id of sessionIds) {
    const item = map.get(id);
    if (item) {
      ordered.push(item);
      used.add(id);
    }
  }
  for (const p of pool) {
    if (!used.has(p.id)) ordered.push(p);
  }
  return ordered.length > 0 ? ordered : pool;
}

export function SpeakingPractice() {
  const [mode, setMode] = useState<SpeakingMode>("sentence");
  const [orderMode, setOrderMode] = useState<OrderMode>("progressive");
  const [order, setOrder] = useState<SpeakingPrompt[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);
  const storageRef = useRef<SpeakingStorage | null>(null);
  const skipPersist = useRef(true);

  const persistSlot = useCallback(
    (
      nextMode: SpeakingMode,
      nextOrderMode: OrderMode,
      prompts: SpeakingPrompt[],
      nextIndex: number,
      nextDone: boolean,
    ) => {
      const base = storageRef.current ?? loadSpeakingStorage();
      const withSettings = saveSpeakingSettings(base, nextMode, nextOrderMode);
      storageRef.current = upsertSpeakingSlot(
        withSettings,
        nextMode,
        nextOrderMode,
        {
          index: nextIndex,
          done: nextDone,
          sessionIds: prompts.map((p) => p.id),
        },
      );
    },
    [],
  );

  const applySession = useCallback(
    (
      nextMode: SpeakingMode,
      nextOrderMode: OrderMode,
      opts?: { reshuffle?: boolean; reset?: boolean },
    ) => {
      skipPersist.current = true;
      const base = storageRef.current ?? loadSpeakingStorage();
      const canonical = buildPool(nextMode, "progressive");
      const saved = getSpeakingSlot(base, nextMode, nextOrderMode);

      let prompts: SpeakingPrompt[];

      if (nextOrderMode === "progressive") {
        prompts = canonical;
      } else if (opts?.reshuffle || !saved?.sessionIds?.length) {
        prompts = shuffle(canonical);
      } else {
        prompts = orderByIds(canonical, saved.sessionIds);
      }

      let nextIndex = 0;
      let nextDone = false;

      if (opts?.reshuffle || opts?.reset) {
        nextIndex = 0;
        nextDone = false;
      } else if (saved) {
        nextDone = Boolean(saved.done);
        nextIndex = nextDone
          ? Math.max(0, prompts.length - 1)
          : Math.min(
              Math.max(0, saved.index),
              Math.max(0, prompts.length - 1),
            );
      }

      setMode(nextMode);
      setOrderMode(nextOrderMode);
      setOrder(prompts);
      setIndex(nextIndex);
      setRevealed(false);
      setDone(nextDone);
      setReady(true);
      persistSlot(nextMode, nextOrderMode, prompts, nextIndex, nextDone);
      queueMicrotask(() => {
        skipPersist.current = false;
      });
    },
    [persistSlot],
  );

  useEffect(() => {
    const stored = loadSpeakingStorage();
    storageRef.current = stored;
    applySession(stored.mode, stored.orderMode);
  }, [applySession]);

  useEffect(() => {
    if (!ready || skipPersist.current || order.length === 0) return;
    persistSlot(mode, orderMode, order, index, done);
  }, [ready, mode, orderMode, order, index, done, persistSlot]);

  const current = order[index];
  const total = order.length;
  const modeLabel = mode === "word" ? "Woorden" : "Zinnen";
  const stageMeta = SPEAKING_STAGES.find((s) => s.id === current?.stage);

  useEffect(() => {
    setRevealed(false);
  }, [index]);

  function reveal() {
    setRevealed(true);
  }

  function hideAgain() {
    setRevealed(false);
  }

  function next() {
    if (index >= total - 1) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
  }

  function prev() {
    if (index <= 0) return;
    setDone(false);
    setIndex((i) => i - 1);
  }

  function changeMode(nextMode: SpeakingMode) {
    if (nextMode === mode) return;
    applySession(nextMode, orderMode);
  }

  function changeOrderMode(nextOrder: OrderMode) {
    if (nextOrder === orderMode) return;
    applySession(mode, nextOrder);
  }

  function reshuffle() {
    applySession(mode, orderMode, { reshuffle: true });
  }

  function restart() {
    applySession(mode, orderMode, { reset: true });
  }

  function jumpToStage(stageId: SpeakingStageId) {
    const start = order.findIndex((p) => p.stage === stageId);
    if (start < 0) return;
    setDone(false);
    setRevealed(false);
    setIndex(start);
  }

  const modeToggle = (
    <div className="mode-toggle" role="group" aria-label="Oefenmodus">
      <button
        type="button"
        className={`mode-btn ${mode === "word" ? "is-active" : ""}`}
        onClick={() => changeMode("word")}
      >
        Woorden
      </button>
      <button
        type="button"
        className={`mode-btn ${mode === "sentence" ? "is-active" : ""}`}
        onClick={() => changeMode("sentence")}
      >
        Zinnen
      </button>
    </div>
  );

  const orderToggle = (
    <div className="mode-toggle" role="group" aria-label="Volgorde">
      <button
        type="button"
        className={`mode-btn ${orderMode === "progressive" ? "is-active" : ""}`}
        onClick={() => changeOrderMode("progressive")}
      >
        Opbouw
      </button>
      <button
        type="button"
        className={`mode-btn ${orderMode === "random" ? "is-active" : ""}`}
        onClick={() => changeOrderMode("random")}
      >
        Willekeurig
      </button>
    </div>
  );

  if (!ready || total === 0 || (!current && !done)) {
    return (
      <div className="speaking-shell">
        <div className="speaking-toggles">
          {modeToggle}
          {orderToggle}
        </div>
        <p className="lede">Laden…</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="speaking-shell">
        <div className="speaking-toggles">
          {modeToggle}
          {orderToggle}
        </div>
        <div className="practice-result">
          <p className="eyebrow">Spreken · {modeLabel}</p>
          <h1>Klaar!</h1>
          <p>
            Je hebt {total} {mode === "word" ? "woorden" : "zinnen"} geoefend
            {orderMode === "progressive"
              ? " in opbouwende volgorde."
              : " in willekeurige volgorde."}{" "}
            Voortgang is opgeslagen in deze browser.
          </p>
          {orderMode === "progressive" ? (
            <nav className="speaking-stage-nav" aria-label="Sectie kiezen">
              {SPEAKING_STAGES.map((s) => {
                const hasStage = order.some((p) => p.stage === s.id);
                if (!hasStage) return null;
                return (
                  <button
                    key={s.id}
                    type="button"
                    className="speaking-stage-chip"
                    onClick={() => jumpToStage(s.id)}
                  >
                    {s.titleNl}
                  </button>
                );
              })}
            </nav>
          ) : null}
          <div className="btn-row">
            <button type="button" className="btn btn-primary" onClick={restart}>
              Opnieuw
            </button>
            {orderMode === "random" ? (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={reshuffle}
              >
                Nieuwe shuffle
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="speaking-shell">
      <div className="speaking-toggles">
        {modeToggle}
        {orderToggle}
      </div>

      <div className="practice-top">
        <p className="eyebrow">
          Spreken · {modeLabel}
          {stageMeta ? ` · ${stageMeta.titleNl}` : ""}
          {orderMode === "progressive" ? " · opbouw" : " · willekeurig"}
        </p>
        <div className="practice-progress">
          <span>
            {index + 1} / {total}
          </span>
          <div className="mini-bar" aria-hidden>
            <span style={{ width: `${((index + 1) / total) * 100}%` }} />
          </div>
        </div>
      </div>

      {orderMode === "progressive" ? (
        <nav className="speaking-stage-nav" aria-label="Sectie kiezen">
          {SPEAKING_STAGES.map((s) => {
            const hasStage = order.some((p) => p.stage === s.id);
            if (!hasStage) return null;
            return (
              <button
                key={s.id}
                type="button"
                className={`speaking-stage-chip ${
                  current?.stage === s.id ? "is-active" : ""
                }`}
                onClick={() => jumpToStage(s.id)}
                aria-current={current?.stage === s.id ? "true" : undefined}
              >
                {s.titleNl}
              </button>
            );
          })}
        </nav>
      ) : null}

      {orderMode === "progressive" && stageMeta ? (
        <p className="speaking-stage">{stageMeta.titleEn}</p>
      ) : null}

      <p className="speaking-hint">
        Lees het Nederlands, zeg het Italiaans hardop, en tik om te controleren.
        {orderMode === "progressive"
          ? " Kies hierboven een sectie om te oefenen of over te slaan."
          : " Willekeurige volgorde = moeilijker."}{" "}
        Instellingen en voortgang blijven bewaard.
      </p>

      <button
        type="button"
        className={`speaking-card ${revealed ? "is-revealed" : ""}`}
        onClick={revealed ? hideAgain : reveal}
        aria-label={
          revealed
            ? "Verberg Italiaans, toon Nederlands"
            : "Toon Italiaanse vertaling"
        }
      >
        <span className="speaking-lang">
          {revealed ? "Italiaans" : "Nederlands"}
        </span>
        <span
          className="speaking-text"
          lang={revealed ? "it" : "nl"}
          key={revealed ? current.it : current.nl}
        >
          {revealed ? current.it : current.nl}
        </span>
        {revealed && current.note ? (
          <span className="speaking-note">{current.note}</span>
        ) : null}
        <span className="speaking-tap">
          {revealed
            ? "Tik om Nederlands weer te tonen"
            : "Tik om Italiaans te tonen"}
        </span>
      </button>

      <div className="btn-row speaking-actions">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={prev}
          disabled={index === 0}
        >
          Vorige
        </button>
        {!revealed ? (
          <button type="button" className="btn btn-primary" onClick={reveal}>
            Toon Italiaans
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={next}>
            {index >= total - 1 ? "Afronden" : "Volgende"}
          </button>
        )}
        {orderMode === "random" ? (
          <button type="button" className="btn btn-ghost" onClick={reshuffle}>
            Shuffle
          </button>
        ) : (
          <span className="speaking-spacer" aria-hidden />
        )}
      </div>
    </div>
  );
}
