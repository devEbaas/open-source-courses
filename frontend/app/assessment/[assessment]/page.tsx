"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAssessment } from "../hooks/useAssessment";

export default function AssessmentPage() {
  const { assessment: assessmentId } = useParams();
  const {
    assessment,
    questions,
    userAnswers,
    handleAnswerChange,
    saveAnswers,
  } = useAssessment(assessmentId as string);

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {assessment?.name}
        </h1>
        <p className="mt-2 text-gray-600">{assessment?.description}</p>
      </header>
      {/* necesito que cuando el usurio seleccione una respuesta se actualice el estado con la respuesta seleccionada */}
      <div className="grid gap-6">
        {questions.map((question) => (
          <div key={question.id} className="rounded-lg border p-5">
            <h2 className="font-semibold">{question.text}</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {question.answers.map((answer, idx) => (
                <label
                  key={idx}
                  className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name={`q-${question.id}`}
                    className="h-4 w-4"
                    onChange={() => handleAnswerChange(question.id, answer)}
                  />
                  <span className="text-sm">{answer.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-gray-600">Tiempo estimado: 5-10 minutos.</p>
        <button
          disabled={Object.keys(userAnswers).length !== questions.length}
          onClick={saveAnswers}
          className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2.5 font-medium text-white hover:bg-emerald-700"
        >
          Enviar respuestas
        </button>
      </div>
    </section>
  );
}
