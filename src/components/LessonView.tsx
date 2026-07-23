import type { Lesson } from "@/lib/types";
import Link from "next/link";

export function LessonView({ lesson }: { lesson: Lesson }) {
  return (
    <article className="lesson-view">
      <header className="lesson-hero">
        <p className="eyebrow">Lesson {lesson.number}</p>
        <h1>
          {lesson.title}
          <span className="title-it">{lesson.titleIt}</span>
        </h1>
        <p className="lede">{lesson.summary}</p>
        <Link className="btn btn-primary" href={`/practice/${lesson.id}`}>
          Start practice
        </Link>
      </header>

      <section>
        <h2>Objectives</h2>
        <ul className="plain-list">
          {lesson.objectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Vocabulary</h2>
        <ul className="vocab-grid">
          {lesson.vocabulary.map((v) => (
            <li key={`${v.it}-${v.en}`}>
              <strong>{v.it}</strong>
              {v.gender ? <span className="gender"> ({v.gender})</span> : null}
              <span className="en">{v.en}</span>
              {v.note ? <em className="note">{v.note}</em> : null}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Grammar</h2>
        {lesson.grammar.map((g) => (
          <div key={g.title} className="grammar-block">
            <h3>{g.title}</h3>
            <p>{g.explanation}</p>
            <ul className="example-list">
              {g.examples.map((ex) => (
                <li key={ex.it}>
                  <span lang="it">{ex.it}</span>
                  <span>{ex.en}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Dialogue</h2>
        <div className="dialogue">
          {lesson.dialogue.map((line, i) => (
            <figure key={`${line.speaker}-${i}`}>
              <figcaption>{line.speaker}</figcaption>
              <p lang="it">{line.it}</p>
              <p className="gloss">{line.en}</p>
            </figure>
          ))}
        </div>
      </section>

      <footer className="lesson-footer">
        <Link className="btn btn-primary" href={`/practice/${lesson.id}`}>
          Practice this lesson
        </Link>
      </footer>
    </article>
  );
}
