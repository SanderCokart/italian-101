import Link from "next/link";
import { notFound } from "next/navigation";
import { ExerciseRunner } from "@/components/ExerciseRunner";
import { UnlockGate } from "@/components/UnlockGate";
import { getAllLessonIds, getLesson, getUnit } from "@/lib/content";

export function generateStaticParams() {
  return getAllLessonIds().map((lessonId) => ({ lessonId }));
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getLesson(lessonId);
  if (!lesson) notFound();
  const unit = getUnit(lesson.unitId);

  return (
    <UnlockGate lessonId={lessonId}>
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        {unit ? (
          <Link href={`/units/${unit.id}`}>Unit {unit.number}</Link>
        ) : null}
        <span>/</span>
        <Link href={`/lessons/${lesson.id}`}>Lesson {lesson.number}</Link>
        <span>/</span>
        <span>Practice</span>
      </nav>
      <ExerciseRunner
        lessonId={lesson.id}
        exercises={lesson.exercises}
        title={`${lesson.title} · ${lesson.titleIt}`}
      />
    </UnlockGate>
  );
}
