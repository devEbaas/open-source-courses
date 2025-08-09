import Link from "next/link"

export default function ResultsPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Resultados</h1>
        <p className="mt-2 text-gray-600">
          Vista de ejemplo con datos ficticios. Integra tu lógica y cálculo real más adelante.
        </p>
      </header>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h2 className="font-semibold">Resumen</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Nombre: Estudiante Demo</li>
            <li>Fecha: 2025-08-09</li>
            <li>Puntaje: 78/100</li>
            <li>Estado: Aprobado</li>
          </ul>
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Progreso</p>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div className="h-2 w-[78%] rounded-full bg-emerald-600" />
            </div>
            <p className="mt-1 text-xs text-gray-500">78% completado</p>
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="font-semibold">Áreas</h2>
          <div className="mt-3 grid gap-3">
            <Skill label="HTML/CSS" score={85} />
            <Skill label="JavaScript" score={72} />
            <Skill label="React" score={80} />
            <Skill label="Node.js" score={65} />
            <Skill label="Bases de datos" score={60} />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/assessment" className="rounded-md border border-gray-300 px-4 py-2.5 hover:bg-gray-50">
          Repetir assessment
        </Link>
        <Link href="/" className="rounded-md bg-emerald-600 px-4 py-2.5 text-white hover:bg-emerald-700">
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}

function Skill({ label, score }: { label: string; score: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="text-gray-600">{score}%</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
        <div className="h-2 rounded-full bg-emerald-600" style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}
