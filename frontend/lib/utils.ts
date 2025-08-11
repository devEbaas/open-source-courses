export function cn(...inputs: Array<string | false | null | undefined>) {
  // Combina clases filtrando falsy y eliminando duplicados simples
  const flat = inputs.filter(Boolean).join(' ').trim().split(/\s+/)
  return Array.from(new Set(flat)).join(' ')
}
