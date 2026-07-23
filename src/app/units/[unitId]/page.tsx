import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonList } from "@/components/LessonList";
import { getLessonsForUnit, getUnit, getUnits } from "@/lib/content";

export function generateStaticParams() {
  return getUnits().map((u) => ({ unitId: u.id }));
}

export default async function UnitPage({
  params,
}: {
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = await params;
  const unit = getUnit(unitId);
  if (!unit) notFound();
  const lessons = getLessonsForUnit(unitId);

  return (
    <>
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>
          Unit {unit.number}
        </span>
      </nav>
      <p className="eyebrow">Unit {unit.number}</p>
      <h1 className="page-title">
        {unit.title}
        <span className="title-it">{unit.titleIt}</span>
      </h1>
      <p className="lede">{unit.description}</p>
      <LessonList lessons={lessons} />
    </>
  );
}
