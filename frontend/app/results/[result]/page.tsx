"use client";
import Link from "next/link"
import { useParams } from "next/navigation";
import { useResult } from "../hooks/useResult";
import { useAuth } from "@/app/context/AuthContext";

export default function ResultsPage() {
  const { result } = useParams();
  const { user } = useAuth();
  const { assessmentResult, downloadResults, getRecomendations } = useResult(result as string);

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Resultados</h1>
        <p className="mt-2 text-gray-600">
          Resultados de la prueba{" "}
          {assessmentResult?.result.assessment.name || "Desconocido"}
        </p>
      </header>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h2 className="font-semibold">Resumen</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Nombre: {user?.name || "Desconocido"}</li>
            <li>
              Fecha:{" "}
              {new Date(
                assessmentResult?.result.createdAt || ""
              ).toLocaleDateString() || "Desconocida"}
            </li>
            <li>
              Puntaje: {assessmentResult?.result.score || 0}/
              {assessmentResult?.result.totalQuestions || 0}
            </li>
            {/* <li>Estado: {assessmentResult?.result.status || "Desconocido"}</li> */}
          </ul>
          {/* <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Progreso</p>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div className="h-2 w-[78%] rounded-full bg-emerald-600" />
            </div>
          </div> */}
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="font-semibold">Categorías</h2>
          <div className="mt-3 grid gap-3">
            {assessmentResult?.categories.map((category) => (
              <Skill
                key={category.categoryId}
                label={category.categoryName}
                score={category.correct}
                total={category.total}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="mt-8">
          <h2 className="font-semibold">Detalles</h2>
          <ul className="mt-3 space-y-2">
            {assessmentResult?.detail.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.questionText}</span>
                <span
                  className={
                    item.isCorrect ? "text-emerald-600" : "text-red-600"
                  }
                >
                  {item.isCorrect ? "Correcto" : "Incorrecto"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        {/* Recomendations */}
        <h2 className="font-semibold">Recomendaciones</h2>
        <p className="mt-2 text-gray-600">
          {getRecomendations()}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={downloadResults}
          className="rounded-md border border-gray-300 px-4 py-2.5 hover:bg-gray-50"
        >
          Descargar resultados
        </button>
        <Link
          href="/courses"
          className="rounded-md bg-emerald-600 px-4 py-2.5 text-white hover:bg-emerald-700"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}

function Skill({ label, score, total }: { label: string; score: number; total: number }) {
  const percentage = total > 0 ? (score / total) * 100 : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span>{label} {score}/{total}</span>
        <span className="text-gray-600">{percentage.toFixed(0)}%</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
        <div className="h-2 rounded-full bg-emerald-600" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
