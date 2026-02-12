import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/estadisticas/deportista/[id] - Obtener estadísticas y promedios de un deportista
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deportistaId = params.id

    // Obtener todas las sesiones del deportista
    const sesiones = await prisma.sesionEntrenamiento.findMany({
      where: {
        deportistaId
      },
      include: {
        planEntrenamiento: {
          select: {
            titulo: true,
            fecha: true
          }
        }
      },
      orderBy: {
        fecha: 'desc'
      }
    })

    if (sesiones.length === 0) {
      return NextResponse.json({
        totalSesiones: 0,
        ejerciciosUnicos: 0,
        promedioCompletitud: 0,
        ejercicios: []
      })
    }

    // Analizar ejercicios
    const ejerciciosMap = new Map<string, {
      titulo: string
      sesiones: number
      completados: number
      porcentajes: number[]
      ultimaSesion: Date
    }>()

    sesiones.forEach(sesion => {
      const resultados = sesion.resultados as any[]
      
      resultados.forEach((ejercicio: any) => {
        const key = ejercicio.titulo
        
        if (!ejerciciosMap.has(key)) {
          ejerciciosMap.set(key, {
            titulo: ejercicio.titulo,
            sesiones: 0,
            completados: 0,
            porcentajes: [],
            ultimaSesion: sesion.fecha
          })
        }

        const stats = ejerciciosMap.get(key)!
        stats.sesiones++
        
        if (ejercicio.completado) {
          stats.completados++
        }

        // Calcular porcentaje si tiene puntos de tiro
        if (ejercicio.puntosTiro && Array.isArray(ejercicio.puntosTiro)) {
          let totalConvertidos = 0
          let totalIntentos = 0

          ejercicio.puntosTiro.forEach((punto: any) => {
            if (punto.amboLados) {
              totalConvertidos += punto.cantidad * 2
              totalIntentos += (punto.realizadoIzq || 0) + (punto.realizadoDer || 0)
            } else {
              totalConvertidos += punto.cantidad
              totalIntentos += (punto.realizadoIzq || 0)
            }
          })

          if (totalIntentos > 0) {
            const porcentaje = Math.round((totalConvertidos / totalIntentos) * 100)
            stats.porcentajes.push(porcentaje)
          }
        }
      })
    })

    // Calcular estadísticas globales
    const ejercicios = Array.from(ejerciciosMap.values()).map(stats => {
      const promedioEfectividad = stats.porcentajes.length > 0
        ? Math.round(stats.porcentajes.reduce((a, b) => a + b, 0) / stats.porcentajes.length)
        : null

      const tendencia = stats.porcentajes.length >= 2
        ? stats.porcentajes[0] - stats.porcentajes[stats.porcentajes.length - 1]
        : null

      return {
        titulo: stats.titulo,
        sesiones: stats.sesiones,
        completados: stats.completados,
        porcentajeCompletitud: Math.round((stats.completados / stats.sesiones) * 100),
        promedioEfectividad,
        tendencia,
        ultimaSesion: stats.ultimaSesion
      }
    })

    // Ordenar por sesiones más recientes
    ejercicios.sort((a, b) => new Date(b.ultimaSesion).getTime() - new Date(a.ultimaSesion).getTime())

    const totalEjerciciosRealizados = sesiones.reduce((sum, s) => sum + (s.resultados as any[]).length, 0)
    const totalEjerciciosCompletados = sesiones.reduce((sum, s) => {
      return sum + (s.resultados as any[]).filter((e: any) => e.completado).length
    }, 0)

    return NextResponse.json({
      totalSesiones: sesiones.length,
      ejerciciosUnicos: ejerciciosMap.size,
      promedioCompletitud: Math.round((totalEjerciciosCompletados / totalEjerciciosRealizados) * 100),
      duracionTotal: sesiones.reduce((sum, s) => sum + s.duracion, 0),
      ejercicios
    })
  } catch (error) {
    console.error('Error al obtener estadísticas:', error)
    return NextResponse.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    )
  }
}
