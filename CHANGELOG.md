# Changelog

All notable changes to Italian 101 are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.4.0] — 2026-07-23

### Added

- Live deployment at [it.sandercokart.com](https://it.sandercokart.com)
- Speaking stage chips in **Opbouw** mode to jump to café, begroetingen, herkomst, familie, persoonlijkheid, or plaatsen
- More café and greeting sentence variants (plain orders without *per favore*, thanks/perfect frames, interleaved mixes)
- Deterministic within-stage shuffle so progressive order stays varied but stable across reloads

### Changed

- README documents Dutch → Italian focus (English unsupported) and links the live site
- MIT license added to the repository

### Notes

- Hosted on Dokploy (`personal` / Railpack) with HTTPS via Cloudflare DNS

[0.4.0]: https://github.com/SanderCokart/italian-101/releases/tag/v0.4.0

## [0.3.0] — 2026-07-23

### Added

- Interactive A1 course: 6 units, 24 lessons with vocabulary, grammar, dialogues, and graded practice
- Exercise types: multiple choice, fill-in-the-blank, match pairs, dialogue reorder
- Lesson unlock flow (70%+ practice score) with progress in `localStorage`
- **Spreken** practice mode (Dutch → Italian): reveal-to-check speaking cards
- Word mode and sentence mode for speaking practice
- Progressive curriculum path: café → greetings → origin → family → personality → places
- Optional randomized order for harder speaking drills
- Male/female name mix (Mario, Marco, Leo, Ugo, Anna, Giulia, Isa, Sara) with `un`/`una` and adjective agreement
- Speaking settings and per-mode progress persisted in `localStorage`
- Course home, unit pages, lesson reader, practice runner, and progress overview

### Notes

- Speaking sentences stay within beginner Duolingo-style vocabulary; `come va` is excluded until studied
- Milano, amico/amica included in the speaking path as requested for origin and family stages

[0.3.0]: https://github.com/SanderCokart/italian-101/releases/tag/v0.3.0
