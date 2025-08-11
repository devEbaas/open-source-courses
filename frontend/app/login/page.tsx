"use client"

import Link from "next/link";
import { useLogin } from "./hooks/useLogin";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';

const schema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres")
});
type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const { onSubmit, isLoading, error } = useLogin();
  const [showPwd, setShowPwd] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur'
  });

  return (
       <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto max-w-xl rounded-xl border bg-white p-6 sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight">Iniciar sesión</h1>
        <p className="mt-2 text-gray-600">
          Completa tus datos para iniciar sesión en tu cuenta.
        </p>
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo
            </label>
      <input id="email" type="email" {...register('email')} placeholder="tu@email.com" className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500" />
      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <input id="password" type={showPwd? 'text':'password'} {...register('password')} placeholder="••••••••" className="mt-1 w-full rounded-md border px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-emerald-500" />
              <button type="button" aria-label={showPwd? 'Ocultar contraseña':'Mostrar contraseña'} onClick={()=>setShowPwd(s=>!s)} className="absolute inset-y-0 right-2 mt-1 flex items-center text-gray-600 hover:text-gray-800">
                {showPwd ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.77 21.77 0 0 1 5.06-6.94" />
                    <path d="M9.9 4.24A10.9 10.9 0 0 1 12 4c7 0 11 8 11 8a21.64 21.64 0 0 1-2.16 3.19" />
                    <path d="M12 15a3 3 0 0 0 0-6" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
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