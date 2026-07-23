import type { OrderMode, SpeakingMode } from "@/content/speaking";

const STORAGE_KEY = "italian-101-speaking";

export type SpeakingSlotKey = `${SpeakingMode}:${OrderMode}`;

export interface SpeakingSlot {
  index: number;
  done: boolean;
  /** Ordered prompt ids for this session */
  sessionIds: string[];
}

export interface SpeakingStorage {
  mode: SpeakingMode;
  orderMode: OrderMode;
  slots: Partial<Record<SpeakingSlotKey, SpeakingSlot>>;
}

const DEFAULTS: SpeakingStorage = {
  mode: "sentence",
  orderMode: "progressive",
  slots: {},
};

function slotKey(mode: SpeakingMode, orderMode: OrderMode): SpeakingSlotKey {
  return `${mode}:${orderMode}`;
}

export function loadSpeakingStorage(): SpeakingStorage {
  if (typeof window === "undefined") return { ...DEFAULTS, slots: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS, slots: {} };
    const parsed = JSON.parse(raw) as Partial<SpeakingStorage>;
    const mode =
      parsed.mode === "word" || parsed.mode === "sentence"
        ? parsed.mode
        : DEFAULTS.mode;
    const orderMode =
      parsed.orderMode === "progressive" || parsed.orderMode === "random"
        ? parsed.orderMode
        : DEFAULTS.orderMode;
    return {
      mode,
      orderMode,
      slots: parsed.slots && typeof parsed.slots === "object" ? parsed.slots : {},
    };
  } catch {
    return { ...DEFAULTS, slots: {} };
  }
}

export function saveSpeakingStorage(state: SpeakingStorage): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getSpeakingSlot(
  state: SpeakingStorage,
  mode: SpeakingMode,
  orderMode: OrderMode,
): SpeakingSlot | null {
  return state.slots[slotKey(mode, orderMode)] ?? null;
}

export function upsertSpeakingSlot(
  state: SpeakingStorage,
  mode: SpeakingMode,
  orderMode: OrderMode,
  slot: SpeakingSlot,
): SpeakingStorage {
  const next: SpeakingStorage = {
    mode,
    orderMode,
    slots: {
      ...state.slots,
      [slotKey(mode, orderMode)]: slot,
    },
  };
  saveSpeakingStorage(next);
  return next;
}

export function saveSpeakingSettings(
  state: SpeakingStorage,
  mode: SpeakingMode,
  orderMode: OrderMode,
): SpeakingStorage {
  const next = { ...state, mode, orderMode };
  saveSpeakingStorage(next);
  return next;
}
