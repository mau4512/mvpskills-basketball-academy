import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener un entrenador específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const entrenador = await prisma.entrenador.findUnique({
      where: { id: params.id }
    })

    if (!entrenador) {
      return NextResponse.json(
        { error: 'Entrenador no encontrado' },
        { status: 404 }
      )
    }

    // Obtener turnos asociados
    const turnos = await prisma.turno.findMany({
      where: {
        id: { in: entrenador.turnoIds }
      }
    })

    return NextResponse.json({ ...entrenador, turnos })
  } catch (error) {
    console.error('Error al obtener entrenador:', error)
    return NextResponse.json(
      { error: 'Error al obtener el entrenador' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar un entrenador
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { nombre, apellidos, documentoIdentidad, email, celular, especialidad, turnoIds, activo } = body

    const entrenador = await prisma.entrenador.update({
      where: { id: params.id },
      data: {
        nombre,
        apellidos,
        documentoIdentidad,
        email,
        celular: celular || null,
        especialidad: especialidad || [],
        turnoIds: turnoIds || [],
        activo: activo !== undefined ? activo : true,
      }
    })

    // Obtener turnos asociados
    const turnos = await prisma.turno.findMany({
      where: {
        id: { in: entrenador.turnoIds }
      }
    })

    return NextResponse.json({ ...entrenador, turnos })
  } catch (error: any) {
    console.error('Error al actualizar entrenador:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'El documento de identidad o email ya existe' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Error al actualizar el entrenador' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar un entrenador
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.entrenador.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar entrenador:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el entrenador' },
      { status: 500 }
    )
  }
}
