"use client"

import { useState } from "react"

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto max-w-xl rounded-xl border bg-white p-6 sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight">Registro de estudiantes</h1>
        <p className="mt-2 text-gray-600">
          Completa tus datos para crear tu cuenta. (Solo maqueta, sin lógica por ahora)
        </p>
        <form
          className="mt-6 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            alert("Registro (maqueta): aún sin lógica.")
          }}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre completo
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Tu nombre"
              className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="tu@email.com"
              className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
              required
              minLength={8}
            />
          </div>
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2.5 font-medium text-white hover:bg-emerald-700"
          >
            Crear cuenta
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="#" className="text-emerald-700 hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </section>
  )
}
