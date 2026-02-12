import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/password'

// GET - Obtener un entrenador específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const entrenador = await prisma.entrenador.findUnique({
      where: { id: params.id },
      include: {
        turnos: {
          select: {
            id: true,
            nombre: true,
            tipo: true,
            hora: true
          }
        }
      }
    })

    if (!entrenador) {
      return NextResponse.json(
        { error: 'Entrenador no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(entrenador)
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
    const { nombre, apellidos, documentoIdentidad, email, password, celular, especialidad, turnoIds, activo } = body

    // Construir el objeto de datos, solo incluir password si se proporciona
    const updateData: any = {
      nombre,
      apellidos,
      documentoIdentidad,
      email,
      celular: celular || null,
      especialidad: especialidad || [],
      activo: activo !== undefined ? activo : true,
    }

    // Solo actualizar contraseña si se proporciona una nueva
    if (password && password.trim() !== '') {
      updateData.password = await hashPassword(password)
    }

    const entrenador = await prisma.entrenador.update({
      where: { id: params.id },
      data: updateData,
      include: {
        turnos: true
      }
    })

    // Actualizar la relación de turnos
    if (turnoIds && Array.isArray(turnoIds)) {
      // Primero, desasignar este entrenador de todos los turnos actuales
      await prisma.turno.updateMany({
        where: { entrenadorId: params.id },
        data: { entrenadorId: null }
      })

      // Luego, asignar el entrenador a los nuevos turnos seleccionados
      if (turnoIds.length > 0) {
        await prisma.turno.updateMany({
          where: { id: { in: turnoIds } },
          data: { entrenadorId: params.id }
        })
      }
    }

    // Recargar entrenador con turnos actualizados
    const entrenadorActualizado = await prisma.entrenador.findUnique({
      where: { id: params.id },
      include: {
        turnos: true
      }
    })

    return NextResponse.json(entrenadorActualizado)
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
