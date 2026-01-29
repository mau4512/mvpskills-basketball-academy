import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    // Si es un string en formato ISO (YYYY-MM-DD), usar directamente sin conversión UTC
    const [year, month, day] = date.split('T')[0].split('-')
    const d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    return d.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function calculatePercentage(aciertos: number, intentos: number): number {
  if (intentos === 0) return 0
  return Math.round((aciertos / intentos) * 100 * 100) / 100
}

export function calculateIMC(peso: number, altura: number): number {
  // altura debe estar en metros
  const alturaMetros = altura / 100
  return Math.round((peso / (alturaMetros * alturaMetros)) * 100) / 100
}
