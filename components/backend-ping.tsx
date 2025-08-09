"use client"
import { useEffect, useState } from "react"

export default function BackendPing() {
  const [status, setStatus] = useState("idle")
  const [message, setMessage] = useState(null as string | null)
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

  const ping = async () => {
    if (!backendUrl) {
      setStatus("error")
      setMessage("Falta NEXT_PUBLIC_BACKEND_URL")
      return
    }
    setStatus("loading")
    setMessage(null)
    try {
      const res = await fetch(`${backendUrl}/ping`, { cache: "no-store" })
      const data = await res.json()
      setStatus("success")
      setMessage(JSON.stringify(data))
    } catch {
      setStatus("error")
      setMessage("No se pudo conectar al backend")
    }
  }

  useEffect(() => {
    void ping()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="inline-flex items-center gap-3 rounded-md border px-3 py-2">
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className={
            status === "success"
              ? "h-2.5 w-2.5 rounded-full bg-emerald-500"
              : status === "loading"
                ? "h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse"
                : status === "error"
                  ? "h-2.5 w-2.5 rounded-full bg-red-500"
                  : "h-2.5 w-2.5 rounded-full bg-gray-400"
          }
        />
        <span className="text-sm">
          {status === "idle" && "Sin comprobar"}
          {status === "loading" && "Conectando..."}
          {status === "success" && "Backend OK"}
          {status === "error" && "Error de conexión"}
        </span>
      </div>
      <button
        onClick={ping}
        className="ml-2 rounded-md bg-emerald-500 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-emerald-600"
      >
        Reintentar
      </button>
      {message && <span className="text-xs text-gray-500">Resp: {message}</span>}
    </div>
  )
}
