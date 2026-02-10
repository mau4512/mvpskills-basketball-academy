import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener ejercicios de tiro
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const turnoId = searchParams.get('turnoId')
    const activo = searchParams.get('activo')

    const where: any = {}
    if (turnoId) where.turnoId = turnoId
    if (activo) where.activo = activo === 'true'

    const ejercicios = await prisma.ejercicioTiro.findMany({
      where,
      include: {
        turno: {
          select: {
            nombre: true,
            tipo: true
          }
        },
        registros: {
          include: {
            deportista: {
              select: {
                nombre: true,
                apellidos: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(ejercicios)
  } catch (error) {
    console.error('Error al obtener ejercicios de tiro:', error)
    return NextResponse.json(
      { error: 'Error al obtener ejercicios de tiro' },
      { status: 500 }
    )
  }
}

// POST - Crear ejercicio de tiro
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const ejercicio = await prisma.ejercicioTiro.create({
      data: {
        turnoId: body.turnoId,
        nombre: body.nombre,
        posiciones: body.posiciones, // [{zona: "esquina_derecha", meta: 10}, ...]
        metaTotal: body.metaTotal,
        fechaFin: body.fechaFin ? new Date(body.fechaFin) : null,
        activo: body.activo !== false
      },
      include: {
        turno: true
      }
    })

    return NextResponse.json(ejercicio, { status: 201 })
  } catch (error) {
    console.error('Error al crear ejercicio de tiro:', error)
    return NextResponse.json(
      { error: 'Error al crear ejercicio de tiro' },
      { status: 500 }
    )
  }
}
