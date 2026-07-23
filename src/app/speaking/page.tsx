import Link from "next/link";
import { SpeakingPractice } from "@/components/SpeakingPractice";
import { countCurriculum, SPEAKING_STAGES } from "@/content/speaking";

export const metadata = {
  title: "Spreken — Italian 101",
  description:
    "Oefen Italiaans spreken in opbouwende volgorde: café, begroetingen, herkomst, familie, persoonlijkheid, plaatsen.",
};

export default function SpeakingPage() {
  const counts = countCurriculum();

  return (
    <>
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Spreken</span>
      </nav>
      <p className="eyebrow">Speaking practice</p>
      <h1 className="page-title">
        Spreken
        <span className="title-it">Nederlands → Italiaans</span>
      </h1>
      <p className="lede">
        Standaard in <strong>opbouwende volgorde</strong>: café → begroetingen →
        herkomst → familie → persoonlijkheid → plaatsen. Zet{" "}
        <strong>Willekeurig</strong> aan voor extra moeilijkheid. Instellingen
        en voortgang worden in deze browser bewaard. ({counts.word} woorden ·{" "}
        {counts.sentence} zinnen)
      </p>
      <ol className="speaking-path">
        {SPEAKING_STAGES.map((s) => (
          <li key={s.id}>
            <strong>{s.titleNl}</strong>
            <span>{s.titleEn}</span>
          </li>
        ))}
      </ol>
      <SpeakingPractice />
    </>
  );
}
