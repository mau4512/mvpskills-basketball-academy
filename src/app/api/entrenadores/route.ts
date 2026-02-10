import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener todos los entrenadores
export async function GET() {
  try {
    const entrenadores = await prisma.entrenador.findMany({
      include: {
        turnos: {
          select: {
            id: true,
            nombre: true,
            tipo: true,
            hora: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(entrenadores)
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
    const { nombre, apellidos, documentoIdentidad, email, password, celular, especialidad } = body

    // Validar campos requeridos
    if (!nombre || !apellidos || !documentoIdentidad || !email || !password) {
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
        password,
        celular: celular || null,
        especialidad: especialidad || [],
        activo: true,
      },
      include: {
        turnos: true
      }
    })

    return NextResponse.json(entrenador, { status: 201 })
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
