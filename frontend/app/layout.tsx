import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Cursos Open Source",
  description: "Plataforma open source de cursos en línea (base de proyecto)",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="border-b">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="font-semibold text-xl tracking-tight">
              Cursos OS
            </a>
            <nav className="flex gap-4 text-sm">
              <a href="/register" className="hover:underline">
                Registro
              </a>
              <a href="/assessment" className="hover:underline">
                Assessment
              </a>
              <a href="/results" className="hover:underline">
                Resultados
              </a>
            </nav>
          </div>
        </header>
        <main className="min-h-[calc(100dvh-64px)]">{children}</main>
        <footer className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-600 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Cursos Open Source</p>
            <p className="text-gray-500">Base de proyecto lista para implementar lógica real.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
