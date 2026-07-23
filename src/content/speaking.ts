export type SpeakingMode = "word" | "sentence";
export type OrderMode = "progressive" | "random";
export type Gender = "m" | "f";

export interface SpeakingPrompt {
  id: string;
  mode: SpeakingMode;
  nl: string;
  it: string;
  note?: string;
  /** Curriculum stage for progressive practice */
  stage?: SpeakingStageId;
}

export type SpeakingStageId =
  | "cafe"
  | "greetings"
  | "origin"
  | "family"
  | "personality"
  | "places";

export const SPEAKING_STAGES: {
  id: SpeakingStageId;
  titleNl: string;
  titleEn: string;
}[] = [
  { id: "cafe", titleNl: "Café", titleEn: "Ordering at a café" },
  { id: "greetings", titleNl: "Begroetingen", titleEn: "Greetings" },
  { id: "origin", titleNl: "Herkomst", titleEn: "Where someone is from" },
  { id: "family", titleNl: "Familie & vrienden", titleEn: "Family & friends" },
  {
    id: "personality",
    titleNl: "Persoonlijkheid",
    titleEn: "Personality (è, allora, lui/lei)",
  },
  { id: "places", titleNl: "Plaatsen", titleEn: "Places (qui / lì)" },
];

type Person = { it: string; nl: string; gender: Gender };
type Labeled = { it: string; nl: string };
type ArtNoun = { it: string; nl: string; art: "un" | "una" | "un'" };
type Adj = { m: string; f: string; nl: string };

const drinks: ArtNoun[] = [
  { it: "tè", nl: "thee", art: "un" },
  { it: "caffè", nl: "koffie", art: "un" },
  { it: "cornetto", nl: "croissant", art: "un" },
  { it: "cappuccino", nl: "cappuccino", art: "un" },
  { it: "gelato", nl: "ijs", art: "un" },
];

const cities: Labeled[] = [
  { it: "Londra", nl: "Londen" },
  { it: "Roma", nl: "Rome" },
  { it: "Berlino", nl: "Berlijn" },
  { it: "Milano", nl: "Milaan" },
];

const people: Person[] = [
  { it: "Mario", nl: "Mario", gender: "m" },
  { it: "Marco", nl: "Marco", gender: "m" },
  { it: "Leo", nl: "Leo", gender: "m" },
  { it: "Ugo", nl: "Ugo", gender: "m" },
  { it: "Anna", nl: "Anna", gender: "f" },
  { it: "Giulia", nl: "Giulia", gender: "f" },
  { it: "Isa", nl: "Isa", gender: "f" },
  { it: "Sara", nl: "Sara", gender: "f" },
];

const family: ArtNoun[] = [
  { it: "figlio", nl: "zoon", art: "un" },
  { it: "figlia", nl: "dochter", art: "una" },
  { it: "fratello", nl: "broer", art: "un" },
  { it: "sorella", nl: "zus", art: "una" },
  { it: "amico", nl: "vriend", art: "un" },
  { it: "amica", nl: "vriendin", art: "un'" },
  { it: "ragazzo", nl: "jongen / vriendje", art: "un" },
  { it: "ragazza", nl: "meisje / vriendin", art: "una" },
];

const adjectives: Adj[] = [
  { m: "timido", f: "timida", nl: "verlegen" },
  { m: "allegro", f: "allegra", nl: "vrolijk" },
  { m: "serio", f: "seria", nl: "serieus" },
  { m: "simpatico", f: "simpatica", nl: "aardig" },
];

const places: ArtNoun[] = [
  { it: "teatro", nl: "theater", art: "un" },
  { it: "parco", nl: "park", art: "un" },
  { it: "negozio", nl: "winkel", art: "un" },
  { it: "panificio", nl: "bakkerij", art: "un" },
  { it: "museo", nl: "museum", art: "un" },
  { it: "hotel", nl: "hotel", art: "un" },
  { it: "ristorante", nl: "restaurant", art: "un" },
  { it: "gelateria", nl: "ijssalon", art: "una" },
  { it: "scuola", nl: "school", art: "una" },
  { it: "banca", nl: "bank", art: "una" },
  { it: "biblioteca", nl: "bibliotheek", art: "una" },
  { it: "piazza", nl: "plein", art: "una" },
  { it: "farmacia", nl: "apotheek", art: "una" },
];

const greetings: Labeled[] = [
  { it: "Ciao", nl: "Hallo" },
  { it: "Salve", nl: "Hallo (formeel)" },
  { it: "Buongiorno", nl: "Goedemorgen" },
  { it: "Buonasera", nl: "Goedenavond" },
];

const farewells: Labeled[] = [
  { it: "Arrivederci", nl: "Tot ziens" },
  { it: "A presto", nl: "Tot snel" },
];

const hereThere: Labeled[] = [
  { it: "qui", nl: "hier" },
  { it: "lì", nl: "daar" },
];

function adjFor(gender: Gender, adj: Adj) {
  return gender === "m" ? adj.m : adj.f;
}

function artPhrase(noun: ArtNoun): string {
  // un'amica
  if (noun.art === "un'") return `un'${noun.it}`;
  return `${noun.art} ${noun.it}`;
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Stable string → uint32 seed (FNV-1a). */
function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Looks random, but identical every load for the same seed. */
function seededShuffle<T>(items: T[], seed: string): T[] {
  const arr = [...items];
  const rand = mulberry32(hashSeed(seed));
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Fixed round-robin mix — varies frames without randomizing. */
function interleaveGroups<T>(...groups: T[][]): T[] {
  const out: T[] = [];
  const max = Math.max(0, ...groups.map((g) => g.length));
  for (let i = 0; i < max; i++) {
    for (const g of groups) {
      if (i < g.length) out.push(g[i]);
    }
  }
  return out;
}

type Draft = { nl: string; it: string; stage: SpeakingStageId };

function stageCafe(): Draft[] {
  const bare: Draft[] = [];
  const please: Draft[] = [];
  const thanks: Draft[] = [];
  const perfect: Draft[] = [];
  const barePairs: Draft[] = [];
  const pleasePairs: Draft[] = [];

  for (const d of drinks) {
    // Plain order — "per favore" is optional in real café talk
    bare.push({
      stage: "cafe",
      nl: `Een ${d.nl}.`,
      it: `${artPhrase(d)}.`,
    });
    please.push({
      stage: "cafe",
      nl: `Een ${d.nl}, alsjeblieft.`,
      it: `${artPhrase(d)}, per favore.`,
    });
    thanks.push({
      stage: "cafe",
      nl: `Dank je. Een ${d.nl}.`,
      it: `Grazie. ${artPhrase(d)}.`,
    });
    perfect.push({
      stage: "cafe",
      nl: `Perfect, een ${d.nl}.`,
      it: `Perfetto, ${artPhrase(d)}.`,
    });
  }
  for (let i = 0; i < drinks.length; i++) {
    for (let j = i + 1; j < drinks.length; j++) {
      const a = drinks[i];
      const b = drinks[j];
      barePairs.push({
        stage: "cafe",
        nl: `Een ${a.nl} en een ${b.nl}.`,
        it: `${artPhrase(a)} e ${artPhrase(b)}.`,
      });
      pleasePairs.push({
        stage: "cafe",
        nl: `Een ${a.nl} en een ${b.nl}, alsjeblieft.`,
        it: `${artPhrase(a)} e ${artPhrase(b)}, per favore.`,
      });
    }
  }
  return interleaveGroups(
    bare,
    please,
    thanks,
    perfect,
    barePairs,
    pleasePairs,
  );
}

function stageGreetings(): Draft[] {
  const hellos: Draft[] = [];
  const withGrazie: Draft[] = [];
  const withPiacere: Draft[] = [];
  const byes: Draft[] = [];
  const extras: Draft[] = [
    { stage: "greetings", nl: "Aangenaam!", it: "Piacere!" },
    { stage: "greetings", nl: "Perfect, dank je.", it: "Perfetto, grazie." },
    { stage: "greetings", nl: "Goed, dank je.", it: "Bene, grazie." },
    { stage: "greetings", nl: "Ja, perfect.", it: "Sì, perfetto." },
    { stage: "greetings", nl: "Nee, dank je.", it: "No, grazie." },
  ];
  const cafeGreet: Draft[] = [];

  for (const g of greetings) {
    hellos.push({ stage: "greetings", nl: `${g.nl}!`, it: `${g.it}!` });
    withGrazie.push({
      stage: "greetings",
      nl: `${g.nl}, dank je.`,
      it: `${g.it}, grazie.`,
    });
    withPiacere.push({
      stage: "greetings",
      nl: `${g.nl}, aangenaam.`,
      it: `${g.it}, piacere.`,
    });
  }
  for (const f of farewells) {
    byes.push({
      stage: "greetings",
      nl: `Dank je, ${f.nl.toLowerCase()}!`,
      it: `Grazie, ${f.it.toLowerCase()}!`,
    });
    byes.push({
      stage: "greetings",
      nl: `Perfect, ${f.nl.toLowerCase()}!`,
      it: `Perfetto, ${f.it.toLowerCase()}!`,
    });
    byes.push({
      stage: "greetings",
      nl: `Goed, ${f.nl.toLowerCase()}!`,
      it: `Bene, ${f.it.toLowerCase()}!`,
    });
  }
  for (const g of [greetings[2], greetings[3]]) {
    drinks.forEach((d, i) => {
      if (i % 2 === 0) {
        cafeGreet.push({
          stage: "greetings",
          nl: `${g.nl}, een ${d.nl}.`,
          it: `${g.it}, ${artPhrase(d)}.`,
        });
      } else {
        cafeGreet.push({
          stage: "greetings",
          nl: `${g.nl}, een ${d.nl} alsjeblieft.`,
          it: `${g.it}, ${artPhrase(d)} per favore.`,
        });
      }
    });
  }
  return interleaveGroups(
    hellos,
    withGrazie,
    withPiacere,
    byes,
    extras,
    cafeGreet,
  );
}

function stageOrigin(): Draft[] {
  const ioSono: Draft[] = [];
  const sono: Draft[] = [];
  const tuSei: Draft[] = [];
  const tuVero: Draft[] = [];
  const lui: Draft[] = [];
  const lei: Draft[] = [];
  const named: Draft[] = [];

  for (const c of cities) {
    ioSono.push({
      stage: "origin",
      nl: `Ik kom uit ${c.nl}.`,
      it: `Io sono di ${c.it}.`,
    });
    sono.push({
      stage: "origin",
      nl: `Ik ben van ${c.nl}.`,
      it: `Sono di ${c.it}.`,
    });
    tuSei.push({
      stage: "origin",
      nl: `Jij komt uit ${c.nl}.`,
      it: `Tu sei di ${c.it}.`,
    });
    tuVero.push({
      stage: "origin",
      nl: `Jij komt uit ${c.nl}, toch?`,
      it: `Tu sei di ${c.it}, vero?`,
    });
    lui.push({
      stage: "origin",
      nl: `Hij komt uit ${c.nl}.`,
      it: `Lui è di ${c.it}.`,
    });
    lei.push({
      stage: "origin",
      nl: `Zij komt uit ${c.nl}.`,
      it: `Lei è di ${c.it}.`,
    });
  }
  // Fixed name order (m then f) × cities — progressive, not shuffled
  for (const p of people) {
    for (const c of cities) {
      named.push({
        stage: "origin",
        nl: `${p.nl} komt uit ${c.nl}.`,
        it: `${p.it} è di ${c.it}.`,
      });
      named.push({
        stage: "origin",
        nl: `${p.nl} komt uit ${c.nl}, toch?`,
        it: `${p.it} è di ${c.it}, vero?`,
      });
    }
  }
  return interleaveGroups(ioSono, sono, tuSei, tuVero, lui, lei, named);
}

function stageFamily(): Draft[] {
  const ho: Draft[] = [];
  const ioHo: Draft[] = [];
  const eTu: Draft[] = [];
  const named: Draft[] = [];

  for (const f of family) {
    ho.push({
      stage: "family",
      nl: `Ik heb een ${f.nl}.`,
      it: `Ho ${artPhrase(f)}.`,
    });
    ioHo.push({
      stage: "family",
      nl: `Ik heb een ${f.nl}.`,
      it: `Io ho ${artPhrase(f)}.`,
    });
    eTu.push({
      stage: "family",
      nl: `Ik heb een ${f.nl}. En jij?`,
      it: `Ho ${artPhrase(f)}. E tu?`,
    });
  }
  // Cycle names in stable order with family nouns
  for (const p of people) {
    for (const f of family.slice(0, 6)) {
      named.push({
        stage: "family",
        nl: `${p.nl}, ik heb een ${f.nl}.`,
        it: `${p.it}, ho ${artPhrase(f)}.`,
      });
    }
  }
  return [
    ...interleaveGroups(ho, ioHo, eTu, named),
    { stage: "family", nl: "En jij?", it: "E tu?" },
  ];
}

function stagePersonality(): Draft[] {
  const warmUp: Draft[] = [
    { stage: "personality", nl: "Is", it: "È" },
    { stage: "personality", nl: "Dus / nou", it: "Allora" },
    { stage: "personality", nl: "Hij", it: "Lui" },
    { stage: "personality", nl: "Zij", it: "Lei" },
  ];

  const luiAdj: Draft[] = [];
  const leiAdj: Draft[] = [];
  const luiVero: Draft[] = [];
  const leiVero: Draft[] = [];
  const ioM: Draft[] = [];
  const ioF: Draft[] = [];
  const named: Draft[] = [];

  for (const adj of adjectives) {
    luiAdj.push({
      stage: "personality",
      nl: `Hij is ${adj.nl}.`,
      it: `Lui è ${adj.m}.`,
    });
    leiAdj.push({
      stage: "personality",
      nl: `Zij is ${adj.nl}.`,
      it: `Lei è ${adj.f}.`,
    });
    luiVero.push({
      stage: "personality",
      nl: `Hij is ${adj.nl}, toch?`,
      it: `Lui è ${adj.m}, vero?`,
    });
    leiVero.push({
      stage: "personality",
      nl: `Zij is ${adj.nl}, toch?`,
      it: `Lei è ${adj.f}, vero?`,
    });
    ioM.push({
      stage: "personality",
      nl: `Ik ben ${adj.nl}.`,
      it: `Io sono ${adj.m}.`,
    });
    ioF.push({
      stage: "personality",
      nl: `Ik ben ${adj.nl}.`,
      it: `Io sono ${adj.f}.`,
    });
  }

  for (const p of people) {
    for (const adj of adjectives) {
      const form = adjFor(p.gender, adj);
      named.push({
        stage: "personality",
        nl: `${p.nl} is ${adj.nl}.`,
        it: `${p.it} è ${form}.`,
      });
      named.push({
        stage: "personality",
        nl: `Dus, ${p.nl} is ${adj.nl}.`,
        it: `Allora, ${p.it} è ${form}.`,
      });
    }
  }
  return [
    ...warmUp,
    ...interleaveGroups(luiAdj, leiAdj, luiVero, leiVero, ioM, ioF, named),
  ];
}

function stagePlaces(): Draft[] {
  const basic: Draft[] = [];
  const withLoc: Draft[] = [];
  const vero: Draft[] = [];
  const si: Draft[] = [];
  const no: Draft[] = [];
  const named: Draft[] = [];
  const extras: Draft[] = [
    {
      stage: "places",
      nl: "Dus, er is een theater hier?",
      it: "Allora, c'è un teatro qui?",
    },
    {
      stage: "places",
      nl: "Dus, er is een bibliotheek daar?",
      it: "Allora, c'è una biblioteca lì?",
    },
  ];

  for (const place of places) {
    basic.push({
      stage: "places",
      nl: `Er is een ${place.nl}.`,
      it: `C'è ${artPhrase(place)}.`,
    });
    for (const loc of hereThere) {
      withLoc.push({
        stage: "places",
        nl: `Er is een ${place.nl} ${loc.nl}.`,
        it: `C'è ${artPhrase(place)} ${loc.it}.`,
      });
      vero.push({
        stage: "places",
        nl: `Er is een ${place.nl} ${loc.nl}, toch?`,
        it: `C'è ${artPhrase(place)} ${loc.it}, vero?`,
      });
      si.push({
        stage: "places",
        nl: `Ja, er is een ${place.nl} ${loc.nl}.`,
        it: `Sì, c'è ${artPhrase(place)} ${loc.it}.`,
      });
      no.push({
        stage: "places",
        nl: `Nee, er is een ${place.nl} ${loc.nl}.`,
        it: `No, c'è ${artPhrase(place)} ${loc.it}.`,
      });
    }
  }
  // Named asker — fixed people order
  for (const p of people) {
    for (const place of places) {
      const loc = hereThere[p.gender === "m" ? 0 : 1];
      named.push({
        stage: "places",
        nl: `${p.nl}, er is een ${place.nl} ${loc.nl}, toch?`,
        it: `${p.it}, c'è ${artPhrase(place)} ${loc.it}, vero?`,
      });
    }
  }
  return interleaveGroups(basic, withLoc, vero, si, no, named, extras);
}

function toPrompts(drafts: Draft[], mode: SpeakingMode): SpeakingPrompt[] {
  const seen = new Set<string>();
  const out: SpeakingPrompt[] = [];
  for (const d of drafts) {
    if (/\bva\b/i.test(d.it) || /\bva\b/i.test(d.nl)) continue;
    const key = d.it.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      id: `${mode[0]}-${String(out.length + 1).padStart(3, "0")}`,
      mode,
      nl: d.nl,
      it: d.it,
      stage: d.stage,
    });
  }
  return out;
}

/** Full curriculum in difficulty order (café → … → places).
 *  Within each stage, order is a fixed seeded scramble (stable, not random). */
export function buildProgressiveSentences(): SpeakingPrompt[] {
  return toPrompts(
    [
      ...seededShuffle(stageCafe(), "cafe"),
      ...seededShuffle(stageGreetings(), "greetings"),
      ...seededShuffle(stageOrigin(), "origin"),
      ...seededShuffle(stageFamily(), "family"),
      ...seededShuffle(stagePersonality(), "personality"),
      ...seededShuffle(stagePlaces(), "places"),
    ],
    "sentence",
  );
}

/** Same content, shuffled — harder. Keeps stable ids for progress restore. */
export function buildRandomSentences(): SpeakingPrompt[] {
  return shuffle(buildProgressiveSentences());
}

export function buildSentencePool(orderMode: OrderMode): SpeakingPrompt[] {
  return orderMode === "random"
    ? buildRandomSentences()
    : buildProgressiveSentences();
}

export function getWordPrompts(orderMode: OrderMode = "progressive"): SpeakingPrompt[] {
  const words: SpeakingPrompt[] = [
    // 1 Café
    { id: "w-01", mode: "word", stage: "cafe", nl: "Alsjeblieft", it: "Per favore" },
    { id: "w-02", mode: "word", stage: "cafe", nl: "Dank je", it: "Grazie" },
    {
      id: "w-03",
      mode: "word",
      stage: "cafe",
      nl: "Een",
      it: "Un / una",
      note: "un = mannelijk, una = vrouwelijk",
    },
    { id: "w-04", mode: "word", stage: "cafe", nl: "Thee", it: "Tè" },
    { id: "w-05", mode: "word", stage: "cafe", nl: "Koffie", it: "Caffè" },
    { id: "w-06", mode: "word", stage: "cafe", nl: "Croissant", it: "Cornetto" },
    { id: "w-07", mode: "word", stage: "cafe", nl: "Cappuccino", it: "Cappuccino" },
    { id: "w-08", mode: "word", stage: "cafe", nl: "Ijs", it: "Gelato" },
    { id: "w-09", mode: "word", stage: "cafe", nl: "Perfect", it: "Perfetto" },
    // 2 Greetings
    { id: "w-10", mode: "word", stage: "greetings", nl: "Hallo", it: "Ciao" },
    { id: "w-11", mode: "word", stage: "greetings", nl: "Hallo (formeel)", it: "Salve" },
    { id: "w-12", mode: "word", stage: "greetings", nl: "Goedemorgen", it: "Buongiorno" },
    { id: "w-13", mode: "word", stage: "greetings", nl: "Goedenavond", it: "Buonasera" },
    { id: "w-14", mode: "word", stage: "greetings", nl: "Tot ziens", it: "Arrivederci" },
    { id: "w-15", mode: "word", stage: "greetings", nl: "Tot snel", it: "A presto" },
    { id: "w-16", mode: "word", stage: "greetings", nl: "Aangenaam", it: "Piacere" },
    { id: "w-17", mode: "word", stage: "greetings", nl: "Goed", it: "Bene" },
    { id: "w-18", mode: "word", stage: "greetings", nl: "Ja", it: "Sì" },
    { id: "w-19", mode: "word", stage: "greetings", nl: "Nee", it: "No" },
    // 3 Origin
    { id: "w-20", mode: "word", stage: "origin", nl: "Ik", it: "Io" },
    { id: "w-21", mode: "word", stage: "origin", nl: "Ben / zijn (ik)", it: "Sono" },
    { id: "w-22", mode: "word", stage: "origin", nl: "Ik kom uit…", it: "Io sono di…" },
    { id: "w-23", mode: "word", stage: "origin", nl: "Jij komt uit…", it: "Tu sei di…" },
    { id: "w-24", mode: "word", stage: "origin", nl: "Komt uit…", it: "È di…" },
    { id: "w-25", mode: "word", stage: "origin", nl: "Toch?", it: "Vero" },
    { id: "w-26", mode: "word", stage: "origin", nl: "Londen", it: "Londra" },
    { id: "w-27", mode: "word", stage: "origin", nl: "Rome", it: "Roma" },
    { id: "w-28", mode: "word", stage: "origin", nl: "Berlijn", it: "Berlino" },
    { id: "w-29", mode: "word", stage: "origin", nl: "Milaan", it: "Milano" },
    // 4 Family
    { id: "w-30", mode: "word", stage: "family", nl: "Ik heb", it: "Io ho / ho" },
    { id: "w-31", mode: "word", stage: "family", nl: "En jij?", it: "E tu?" },
    { id: "w-32", mode: "word", stage: "family", nl: "Zoon", it: "Figlio" },
    { id: "w-33", mode: "word", stage: "family", nl: "Dochter", it: "Figlia" },
    { id: "w-34", mode: "word", stage: "family", nl: "Broer", it: "Fratello" },
    { id: "w-35", mode: "word", stage: "family", nl: "Zus", it: "Sorella" },
    { id: "w-36", mode: "word", stage: "family", nl: "Vriend", it: "Amico" },
    { id: "w-37", mode: "word", stage: "family", nl: "Vriendin", it: "Amica" },
    { id: "w-38", mode: "word", stage: "family", nl: "Jongen", it: "Ragazzo" },
    { id: "w-39", mode: "word", stage: "family", nl: "Meisje / vriendin", it: "Ragazza" },
    // 5 Personality
    { id: "w-40", mode: "word", stage: "personality", nl: "Is", it: "È" },
    { id: "w-41", mode: "word", stage: "personality", nl: "Dus / nou", it: "Allora" },
    { id: "w-42", mode: "word", stage: "personality", nl: "Hij", it: "Lui" },
    { id: "w-43", mode: "word", stage: "personality", nl: "Zij", it: "Lei" },
    {
      id: "w-44",
      mode: "word",
      stage: "personality",
      nl: "Verlegen",
      it: "Timido / timida",
      note: "timido = m, timida = f",
    },
    {
      id: "w-45",
      mode: "word",
      stage: "personality",
      nl: "Vrolijk",
      it: "Allegro / allegra",
      note: "allegro = m, allegra = f",
    },
    {
      id: "w-46",
      mode: "word",
      stage: "personality",
      nl: "Serieus",
      it: "Serio / seria",
      note: "serio = m, seria = f",
    },
    {
      id: "w-47",
      mode: "word",
      stage: "personality",
      nl: "Aardig",
      it: "Simpatico / simpatica",
      note: "simpatico = m, simpatica = f",
    },
    // 6 Places
    { id: "w-48", mode: "word", stage: "places", nl: "Er is", it: "C'è" },
    { id: "w-49", mode: "word", stage: "places", nl: "Hier", it: "Qui" },
    { id: "w-50", mode: "word", stage: "places", nl: "Daar", it: "Lì" },
    { id: "w-51", mode: "word", stage: "places", nl: "Theater", it: "Teatro" },
    { id: "w-52", mode: "word", stage: "places", nl: "Park", it: "Parco" },
    { id: "w-53", mode: "word", stage: "places", nl: "Bank", it: "Banca" },
    { id: "w-54", mode: "word", stage: "places", nl: "Bibliotheek", it: "Biblioteca" },
    { id: "w-55", mode: "word", stage: "places", nl: "Winkel", it: "Negozio" },
    { id: "w-56", mode: "word", stage: "places", nl: "Bakkerij", it: "Panificio" },
    { id: "w-57", mode: "word", stage: "places", nl: "Apotheek", it: "Farmacia" },
    { id: "w-58", mode: "word", stage: "places", nl: "School", it: "Scuola" },
    { id: "w-59", mode: "word", stage: "places", nl: "Plein", it: "Piazza" },
    { id: "w-60", mode: "word", stage: "places", nl: "Museum", it: "Museo" },
    { id: "w-61", mode: "word", stage: "places", nl: "Hotel", it: "Hotel" },
    { id: "w-62", mode: "word", stage: "places", nl: "Restaurant", it: "Ristorante" },
    { id: "w-63", mode: "word", stage: "places", nl: "Ijssalon", it: "Gelateria" },
  ];

  return orderMode === "random" ? shuffle(words) : words;
}

export function buildPool(
  speakingMode: SpeakingMode,
  orderMode: OrderMode,
): SpeakingPrompt[] {
  if (speakingMode === "word") return getWordPrompts(orderMode);
  return buildSentencePool(orderMode);
}

export function countCurriculum(): { word: number; sentence: number } {
  return {
    word: getWordPrompts("progressive").length,
    sentence: buildProgressiveSentences().length,
  };
}

/** Random single-roll helpers kept for optional spice in random mode */
export function generateRandomSentences(count?: number): SpeakingPrompt[] {
  const all = buildRandomSentences();
  if (!count || count >= all.length) return all;
  return all.slice(0, count);
}

export function estimateSentenceSpace(): number {
  return buildProgressiveSentences().length;
}

export function getWordCount(): number {
  return getWordPrompts("progressive").length;
}

export function countByMode(): { word: number; sentence: number } {
  return countCurriculum();
}
