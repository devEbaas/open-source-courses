"use client";

import Link from "next/link";
import { useCourses } from "./hooks/useCourses";

export default function CoursesPage() {
  const { courses, isLoading, error } = useCourses();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading courses</div>;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Cursos disponibles
        </h1>
        <p className="mt-2 text-gray-600">
          En esta sección encontrarás los cursos disponibles para inscribirte y comenzar tu aprendizaje. Cada curso incluye un assessment inicial para evaluar tus conocimientos previos.
        </p>
      </header>
      {/* Necesito que se muestre una lista de cursos con efecto hover y que sea clickeable para mandar a otra vista de cursos */}
      {/* Agregale un botón de Iniciar Diagnóstico */}

      <ul className="space-y-4">
        {courses.map((course) => (
          <li key={course.id} className="p-4 border rounded hover:bg-gray-100 transition-colors">
            <h2 className="text-xl font-semibold">{course.name}</h2>
            <p className="mt-2 text-gray-600">{course.description}</p>
            {course.assessment && (
              <Link
                href={`/assessment/${course.assessment.id}`}
                className="mt-4 inline-block rounded-md bg-emerald-600 px-4 py-2.5 font-medium text-white hover:bg-emerald-700"
              >
                Iniciar Diagnóstico
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}