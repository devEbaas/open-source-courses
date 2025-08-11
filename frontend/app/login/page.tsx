"use client"

import Link from "next/link";
import { useLogin } from "./hooks/useLogin";
export default function LoginPage() {
  const { formData, isLoading, handleChange, handleSubmit } = useLogin();

  return (
       <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto max-w-xl rounded-xl border bg-white p-6 sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight">Iniciar sesión</h1>
        <p className="mt-2 text-gray-600">
          Completa tus datos para iniciar sesión en tu cuenta.
        </p>
        <form
          className="mt-6 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(e)
          }}
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
              required
              minLength={8}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2.5 font-medium text-white hover:bg-emerald-700"
          >
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-emerald-700 hover:underline">
            Crea tu cuenta
          </Link>
        </p>
      </div>
    </section>
  );
}