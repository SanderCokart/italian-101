import Link from "next/link";
import { UnitCard } from "@/components/UnitCard";
import { getUnits } from "@/lib/content";

export default function HomePage() {
  const units = getUnits();

  return (
    <>
      <section className="hero">
        <p className="hero-brand">
          Italian <span>101</span>
        </p>
        <h1>Speak your first Italian with a full A1 path.</h1>
        <p className="lede">
          Twenty-four lessons, six units, and practice that unlocks as you go.
        </p>
        <div className="btn-row">
          <Link className="btn btn-primary" href="/speaking">
            Start speaking
          </Link>
          <Link className="btn btn-ghost" href="/units/unit-1">
            Start Unit 1
          </Link>
        </div>
      </section>

      <section className="speaking-promo" id="speaking">
        <div className="section-head">
          <h2>Spreken</h2>
          <Link href="/speaking">Open practice →</Link>
        </div>
        <p className="lede">
          Progressive path by default (café → greetings → origin → family →
          personality → places). Switch to random when you want it harder.
        </p>
      </section>

      <section id="units">
        <div className="section-head">
          <h2>The course</h2>
          <Link href="/progress">Your progress →</Link>
        </div>
        <div className="unit-stack">
          {units.map((unit) => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
        </div>
      </section>
    </>
  );
}
