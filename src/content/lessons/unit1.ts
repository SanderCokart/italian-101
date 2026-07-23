import type { Lesson } from "@/lib/types";

export const unit1Lessons: Lesson[] = [
  {
    id: "u1-l1",
    unitId: "unit-1",
    number: 1,
    title: "Sounds & the Alphabet",
    titleIt: "Suoni e alfabeto",
    summary:
      "Learn how Italian letters sound and master a few pronunciation patterns that unlock the rest of the course.",
    objectives: [
      "Recognize the Italian alphabet",
      "Pronounce c/g before e/i vs a/o/u",
      "Say key letter combinations (ch, gh, gli, gn, sc)",
    ],
    vocabulary: [
      { it: "alfabeto", en: "alphabet", gender: "m" },
      { it: "lettera", en: "letter", gender: "f" },
      { it: "suono", en: "sound", gender: "m" },
      { it: "parola", en: "word", gender: "f" },
      { it: "sì", en: "yes" },
      { it: "no", en: "no" },
      { it: "per favore", en: "please" },
      { it: "grazie", en: "thank you" },
    ],
    grammar: [
      {
        title: "Hard and soft C / G",
        explanation:
          "Before a, o, u: c and g are hard (like k / g in go). Before e, i: they are soft (like ch / j). Add h to keep them hard before e/i: che, chi, ghe, ghi.",
        examples: [
          { it: "casa", en: "house (hard c)" },
          { it: "cena", en: "dinner (soft c)" },
          { it: "chi", en: "who (hard c + h)" },
          { it: "gelato", en: "ice cream (soft g)" },
        ],
      },
      {
        title: "Special combinations",
        explanation:
          "gli often sounds like the lli in million. gn is like ny in canyon. sc before e/i is like sh; before a/o/u it is sk.",
        examples: [
          { it: "famiglia", en: "family" },
          { it: "gnocchi", en: "gnocchi" },
          { it: "pesce", en: "fish (sh)" },
          { it: "scarpa", en: "shoe (sk)" },
        ],
      },
    ],
    dialogue: [
      {
        speaker: "Marco",
        it: "Come si scrive «ciao»?",
        en: "How do you spell «ciao»?",
      },
      {
        speaker: "Anna",
        it: "C-I-A-O. Ciao!",
        en: "C-I-A-O. Ciao!",
      },
      {
        speaker: "Marco",
        it: "Grazie!",
        en: "Thank you!",
      },
    ],
    exercises: [
      {
        id: "u1l1-1",
        type: "multiple-choice",
        prompt: "How do you say «thank you»?",
        options: ["per favore", "grazie", "sì", "parola"],
        answer: 1,
      },
      {
        id: "u1l1-2",
        type: "multiple-choice",
        prompt: "In «cena», the letter C is…",
        options: ["hard (like k)", "soft (like ch)", "silent", "like s"],
        answer: 1,
      },
      {
        id: "u1l1-3",
        type: "multiple-choice",
        prompt: "Which word has a soft G?",
        options: ["gatto", "gelato", "ghetto", "gola"],
        answer: 1,
      },
      {
        id: "u1l1-4",
        type: "fill-blank",
        prompt: "Complete: How do you say please?",
        sentence: "___ favore",
        answer: "per",
      },
      {
        id: "u1l1-5",
        type: "match",
        prompt: "Match Italian to English",
        pairs: [
          { left: "sì", right: "yes" },
          { left: "no", right: "no" },
          { left: "grazie", right: "thank you" },
          { left: "parola", right: "word" },
        ],
      },
      {
        id: "u1l1-6",
        type: "multiple-choice",
        prompt: "«Pesce» is pronounced with…",
        options: ["sk", "sh", "ch", "ts"],
        answer: 1,
      },
      {
        id: "u1l1-7",
        type: "fill-blank",
        prompt: "What does «lettera» mean?",
        sentence: "lettera = ___",
        answer: "letter",
      },
      {
        id: "u1l1-8",
        type: "reorder",
        prompt: "Put the dialogue in order",
        lines: [
          "Come si scrive «ciao»?",
          "C-I-A-O. Ciao!",
          "Grazie!",
        ],
      },
    ],
  },
  {
    id: "u1-l2",
    unitId: "unit-1",
    number: 2,
    title: "Greetings",
    titleIt: "Saluti",
    summary:
      "Greet people at different times of day and say goodbye politely.",
    objectives: [
      "Use ciao, buongiorno, buonasera, buonanotte",
      "Ask how someone is and reply",
      "Say goodbye in informal and formal contexts",
    ],
    vocabulary: [
      { it: "ciao", en: "hi / bye (informal)" },
      { it: "buongiorno", en: "good morning / good day" },
      { it: "buonasera", en: "good evening" },
      { it: "buonanotte", en: "good night" },
      { it: "arrivederci", en: "goodbye (formal/neutral)" },
      { it: "a presto", en: "see you soon" },
      { it: "come stai?", en: "how are you? (informal)" },
      { it: "come sta?", en: "how are you? (formal)" },
      { it: "bene", en: "well / fine" },
      { it: "così così", en: "so-so" },
    ],
    grammar: [
      {
        title: "Formal vs informal",
        explanation:
          "Use ciao and come stai? with friends and peers. Prefer buongiorno / buonasera and come sta? with strangers, older people, or in shops.",
        examples: [
          { it: "Ciao, come stai?", en: "Hi, how are you? (informal)" },
          { it: "Buongiorno, come sta?", en: "Good morning, how are you? (formal)" },
        ],
      },
    ],
    dialogue: [
      {
        speaker: "Luca",
        it: "Buongiorno, signora! Come sta?",
        en: "Good morning, ma'am! How are you?",
      },
      {
        speaker: "Signora",
        it: "Bene, grazie. E lei?",
        en: "Well, thank you. And you?",
      },
      {
        speaker: "Luca",
        it: "Molto bene. Arrivederci!",
        en: "Very well. Goodbye!",
      },
      {
        speaker: "Signora",
        it: "Arrivederci!",
        en: "Goodbye!",
      },
    ],
    exercises: [
      {
        id: "u1l2-1",
        type: "multiple-choice",
        prompt: "Evening greeting:",
        options: ["buongiorno", "buonasera", "buonanotte", "a presto"],
        answer: 1,
      },
      {
        id: "u1l2-2",
        type: "multiple-choice",
        prompt: "Informal «how are you?»",
        options: ["come sta?", "come stai?", "come si chiama?", "a presto"],
        answer: 1,
      },
      {
        id: "u1l2-3",
        type: "fill-blank",
        prompt: "Formal goodbye",
        sentence: "___!",
        answer: "Arrivederci",
        accept: ["arrivederci"],
      },
      {
        id: "u1l2-4",
        type: "match",
        prompt: "Match the greetings",
        pairs: [
          { left: "buongiorno", right: "good morning" },
          { left: "buonanotte", right: "good night" },
          { left: "a presto", right: "see you soon" },
          { left: "bene", right: "well / fine" },
        ],
      },
      {
        id: "u1l2-5",
        type: "multiple-choice",
        prompt: "«Così così» means…",
        options: ["very well", "so-so", "goodbye", "please"],
        answer: 1,
      },
      {
        id: "u1l2-6",
        type: "fill-blank",
        prompt: "Complete the reply",
        sentence: "Come stai? — ___, grazie.",
        answer: "Bene",
        accept: ["bene", "Molto bene", "molto bene"],
      },
      {
        id: "u1l2-7",
        type: "multiple-choice",
        prompt: "Best greeting for a shop at 10:00?",
        options: ["ciao", "buonanotte", "buongiorno", "a presto"],
        answer: 2,
      },
      {
        id: "u1l2-8",
        type: "reorder",
        prompt: "Order the formal exchange",
        lines: [
          "Buongiorno, signora! Come sta?",
          "Bene, grazie. E lei?",
          "Molto bene. Arrivederci!",
          "Arrivederci!",
        ],
      },
    ],
  },
  {
    id: "u1-l3",
    unitId: "unit-1",
    number: 3,
    title: "Introductions",
    titleIt: "Presentazioni",
    summary:
      "Say your name, ask someone else's, and state where you are from.",
    objectives: [
      "Use mi chiamo / come ti chiami?",
      "Say piacere and respond",
      "Talk about nationality and origin with di / da",
    ],
    vocabulary: [
      { it: "mi chiamo…", en: "my name is…" },
      { it: "come ti chiami?", en: "what's your name? (informal)" },
      { it: "come si chiama?", en: "what's your name? (formal)" },
      { it: "piacere", en: "nice to meet you" },
      { it: "sono di…", en: "I am from… (city/region)" },
      { it: "sono…", en: "I am… (nationality)" },
      { it: "italiano / italiana", en: "Italian (m/f)" },
      { it: "americano / americana", en: "American (m/f)" },
      { it: "inglese", en: "English / British" },
      { it: "e tu?", en: "and you? (informal)" },
    ],
    grammar: [
      {
        title: "Chiamarsi",
        explanation:
          "Italians often introduce themselves with mi chiamo + name. Ask others with come ti chiami? (informal) or come si chiama? (formal).",
        examples: [
          { it: "Mi chiamo Sofia.", en: "My name is Sofia." },
          { it: "Come ti chiami?", en: "What's your name?" },
        ],
      },
      {
        title: "Origin vs nationality",
        explanation:
          "Use sono di + city/region for origin. Use sono + adjective for nationality, agreeing in gender.",
        examples: [
          { it: "Sono di Roma.", en: "I'm from Rome." },
          { it: "Sono italiana.", en: "I am Italian (f)." },
        ],
      },
    ],
    dialogue: [
      {
        speaker: "Giulia",
        it: "Ciao! Mi chiamo Giulia. E tu?",
        en: "Hi! My name is Giulia. And you?",
      },
      {
        speaker: "Tom",
        it: "Mi chiamo Tom. Piacere!",
        en: "My name is Tom. Nice to meet you!",
      },
      {
        speaker: "Giulia",
        it: "Piacere, Tom. Di dove sei?",
        en: "Nice to meet you, Tom. Where are you from?",
      },
      {
        speaker: "Tom",
        it: "Sono di Londra. Sono inglese.",
        en: "I'm from London. I'm English.",
      },
    ],
    exercises: [
      {
        id: "u1l3-1",
        type: "fill-blank",
        prompt: "Introduce yourself as Marco",
        sentence: "Mi ___ Marco.",
        answer: "chiamo",
      },
      {
        id: "u1l3-2",
        type: "multiple-choice",
        prompt: "Informal «what's your name?»",
        options: ["come si chiama?", "come ti chiami?", "sono di?", "piacere"],
        answer: 1,
      },
      {
        id: "u1l3-3",
        type: "multiple-choice",
        prompt: "«Piacere» means…",
        options: ["please", "nice to meet you", "goodbye", "I'm fine"],
        answer: 1,
      },
      {
        id: "u1l3-4",
        type: "match",
        prompt: "Match the phrases",
        pairs: [
          { left: "sono di Milano", right: "I'm from Milan" },
          { left: "sono americana", right: "I am American (f)" },
          { left: "e tu?", right: "and you?" },
          { left: "mi chiamo", right: "my name is" },
        ],
      },
      {
        id: "u1l3-5",
        type: "fill-blank",
        prompt: "Say you are from Naples",
        sentence: "Sono ___ Napoli.",
        answer: "di",
      },
      {
        id: "u1l3-6",
        type: "multiple-choice",
        prompt: "Feminine of italiano:",
        options: ["italiano", "italiani", "italiana", "italiane"],
        answer: 2,
      },
      {
        id: "u1l3-7",
        type: "fill-blank",
        prompt: "Ask formally: what's your name?",
        sentence: "Come si ___?",
        answer: "chiama",
      },
      {
        id: "u1l3-8",
        type: "reorder",
        prompt: "Order the introduction",
        lines: [
          "Ciao! Mi chiamo Giulia. E tu?",
          "Mi chiamo Tom. Piacere!",
          "Piacere, Tom. Di dove sei?",
          "Sono di Londra. Sono inglese.",
        ],
      },
    ],
  },
  {
    id: "u1-l4",
    unitId: "unit-1",
    number: 4,
    title: "Essere — to be",
    titleIt: "Il verbo essere",
    summary:
      "Conjugate essere in the present and use it for identity, states, and origin.",
    objectives: [
      "Conjugate essere for all persons",
      "Build simple sentences with sono / sei / è",
      "Negate with non",
    ],
    vocabulary: [
      { it: "io sono", en: "I am" },
      { it: "tu sei", en: "you are (informal)" },
      { it: "lui / lei è", en: "he / she is" },
      { it: "noi siamo", en: "we are" },
      { it: "voi siete", en: "you (pl) are" },
      { it: "loro sono", en: "they are" },
      { it: "studente / studentessa", en: "student (m/f)" },
      { it: "insegnante", en: "teacher" },
      { it: "felice", en: "happy" },
      { it: "stanco / stanca", en: "tired (m/f)" },
    ],
    grammar: [
      {
        title: "Present of essere",
        explanation:
          "Essere is irregular and essential. Memorize: sono, sei, è, siamo, siete, sono. Place non before the verb to negate.",
        examples: [
          { it: "Io sono Marco.", en: "I am Marco." },
          { it: "Tu non sei italiano.", en: "You are not Italian." },
          { it: "Noi siamo studenti.", en: "We are students." },
        ],
      },
    ],
    dialogue: [
      {
        speaker: "Anna",
        it: "Sei studente?",
        en: "Are you a student?",
      },
      {
        speaker: "Paolo",
        it: "Sì, sono studente. E tu?",
        en: "Yes, I'm a student. And you?",
      },
      {
        speaker: "Anna",
        it: "Sono insegnante. Siamo colleghi… quasi!",
        en: "I'm a teacher. We're colleagues… almost!",
      },
    ],
    exercises: [
      {
        id: "u1l4-1",
        type: "fill-blank",
        prompt: "Conjugate: io ___",
        sentence: "Io ___ felice.",
        answer: "sono",
      },
      {
        id: "u1l4-2",
        type: "fill-blank",
        prompt: "Conjugate: tu ___",
        sentence: "Tu ___ stanco.",
        answer: "sei",
      },
      {
        id: "u1l4-3",
        type: "fill-blank",
        prompt: "Conjugate: lei ___",
        sentence: "Lei ___ insegnante.",
        answer: "è",
        accept: ["e"],
      },
      {
        id: "u1l4-4",
        type: "multiple-choice",
        prompt: "«Noi ___ studenti.»",
        options: ["sono", "sei", "siamo", "siete"],
        answer: 2,
      },
      {
        id: "u1l4-5",
        type: "match",
        prompt: "Match subject and form",
        pairs: [
          { left: "io", right: "sono" },
          { left: "tu", right: "sei" },
          { left: "voi", right: "siete" },
          { left: "loro", right: "sono" },
        ],
      },
      {
        id: "u1l4-6",
        type: "fill-blank",
        prompt: "Negate: I am not tired",
        sentence: "Non ___ stanco.",
        answer: "sono",
      },
      {
        id: "u1l4-7",
        type: "multiple-choice",
        prompt: "«Loro sono» means…",
        options: ["I am", "you are", "we are", "they are"],
        answer: 3,
      },
      {
        id: "u1l4-8",
        type: "reorder",
        prompt: "Order the dialogue",
        lines: [
          "Sei studente?",
          "Sì, sono studente. E tu?",
          "Sono insegnante. Siamo colleghi… quasi!",
        ],
      },
    ],
  },
];
