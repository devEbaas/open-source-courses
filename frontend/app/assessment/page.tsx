import Link from "next/link"

type Question = {
  id: number
  text: string
  options: string[]
}

const QUESTIONS: Question[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  text: `Pregunta ${i + 1}: Enunciado de ejemplo para evaluar tus conocimientos.`,
  options: ["Opción A", "Opción B", "Opción C", "Opción D"],
}))

export default function AssessmentPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Assessment (10 preguntas)</h1>
        <p className="mt-2 text-gray-600">
          Selecciona una opción por pregunta. Esta es una maqueta con preguntas estáticas y sin lógica.
        </p>
      </header>
      <div className="grid gap-6">
        {QUESTIONS.map((q) => (
          <div key={q.id} className="rounded-lg border p-5">
            <h2 className="font-semibold">{q.text}</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {q.options.map((opt, idx) => (
                <label
                  key={idx}
                  className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 hover:bg-gray-50"
                >
                  <input type="radio" name={`q-${q.id}`} className="h-4 w-4" />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-gray-600">Tiempo estimado: 5-10 minutos.</p>
        <Link
          href="/results"
          className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2.5 font-medium text-white hover:bg-emerald-700"
        >
          Enviar respuestas
        </Link>
      </div>
    </section>
  )
}
