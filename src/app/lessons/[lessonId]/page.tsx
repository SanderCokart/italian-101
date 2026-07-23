import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonView } from "@/components/LessonView";
import { UnlockGate } from "@/components/UnlockGate";
import {
  getLesson,
  getAllLessonIds,
  getUnit,
  getPrevLessonId,
  getNextLessonId,
} from "@/lib/content";

export function generateStaticParams() {
  return getAllLessonIds().map((lessonId) => ({ lessonId }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getLesson(lessonId);
  if (!lesson) notFound();
  const unit = getUnit(lesson.unitId);
  const prev = getPrevLessonId(lessonId);
  const next = getNextLessonId(lessonId);

  return (
    <UnlockGate lessonId={lessonId}>
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        {unit ? (
          <Link href={`/units/${unit.id}`}>Unit {unit.number}</Link>
        ) : null}
        <span>/</span>
        <span>Lesson {lesson.number}</span>
      </nav>
      <LessonView lesson={lesson} />
      <nav className="btn-row" style={{ marginTop: "2rem" }}>
        {prev ? (
          <Link className="btn btn-ghost" href={`/lessons/${prev}`}>
            ← Previous
          </Link>
        ) : null}
        {next ? (
          <Link className="btn btn-ghost" href={`/lessons/${next}`}>
            Next →
          </Link>
        ) : null}
      </nav>
    </UnlockGate>
  );
}
