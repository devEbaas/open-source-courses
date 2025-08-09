import Image from "next/image"
import BackendPing from "../components/backend-ping"

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-20">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Aprende con una plataforma open source de cursos
          </h1>
          <p className="text-lg text-gray-600">
            Base mínima para iniciar el desarrollo: frontend con Next.js y backend con Express. Extiende módulos, agrega
            autenticación y conecta tu base de datos.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/register" className="rounded-md bg-emerald-600 px-4 py-2.5 text-white hover:bg-emerald-700">
              Registrarse
            </a>
            <a href="/assessment" className="rounded-md border border-gray-300 px-4 py-2.5 hover:bg-gray-50">
              Tomar assessment
            </a>
          </div>
          <div className="pt-2">
            <BackendPing />
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-gray-50">
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Ilustración de aprendizaje"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        <Feature title="Open Source" desc="Código listo para extender y colaborar." />
        <Feature title="Escalable" desc="Arquitectura separada: frontend y backend." />
        <Feature title="Productivo" desc="Estilos con Tailwind y App Router." />
      </div>
    </section>
  )
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-lg border p-5">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </div>
  )
}
