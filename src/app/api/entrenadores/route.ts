import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener todos los entrenadores
export async function GET() {
  try {
    const entrenadores = await prisma.entrenador.findMany({
      orderBy: { createdAt: 'desc' }
    })

    // Obtener turnos para cada entrenador
    const entrenadoresConTurnos = await Promise.all(
      entrenadores.map(async (entrenador) => {
        const turnos = await prisma.turno.findMany({
          where: {
            id: { in: entrenador.turnoIds }
          }
        })
        return {
          ...entrenador,
          turnos
        }
      })
    )

    return NextResponse.json(entrenadoresConTurnos)
  } catch (error) {
    console.error('Error al obtener entrenadores:', error)
    return NextResponse.json(
      { error: 'Error al obtener los entrenadores' },
      { status: 500 }
    )
  }
}

// POST - Crear nuevo entrenador
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, apellidos, documentoIdentidad, email, celular, especialidad, turnoIds } = body

    // Validar campos requeridos
    if (!nombre || !apellidos || !documentoIdentidad || !email) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Crear el entrenador
    const entrenador = await prisma.entrenador.create({
      data: {
        nombre,
        apellidos,
        documentoIdentidad,
        email,
        celular: celular || null,
        especialidad: especialidad || [],
        turnoIds: turnoIds || [],
        activo: true,
      }
    })

    // Obtener turnos asociados
    const turnos = await prisma.turno.findMany({
      where: {
        id: { in: entrenador.turnoIds }
      }
    })

    return NextResponse.json({ ...entrenador, turnos }, { status: 201 })
  } catch (error: any) {
    console.error('Error al crear entrenador:', error)
    
    // Manejar errores de unicidad
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'El documento de identidad o email ya existe' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Error al crear el entrenador' },
      { status: 500 }
    )
  }
}
