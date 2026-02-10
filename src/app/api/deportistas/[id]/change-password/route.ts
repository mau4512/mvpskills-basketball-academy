import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/deportistas/[id]/change-password
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Se requieren ambas contraseñas' },
        { status: 400 }
      )
    }

    // Buscar el deportista
    const deportista = await prisma.deportista.findUnique({
      where: { id: params.id }
    })

    if (!deportista) {
      return NextResponse.json(
        { error: 'Deportista no encontrado' },
        { status: 404 }
      )
    }

    // Verificar contraseña actual
    if (deportista.password !== currentPassword) {
      return NextResponse.json(
        { error: 'Contraseña actual incorrecta' },
        { status: 401 }
      )
    }

    // Actualizar contraseña
    await prisma.deportista.update({
      where: { id: params.id },
      data: { password: newPassword }
    })

    return NextResponse.json({ message: 'Contraseña actualizada correctamente' })
  } catch (error) {
    console.error('Error al cambiar contraseña:', error)
    return NextResponse.json(
      { error: 'Error al cambiar contraseña' },
      { status: 500 }
    )
  }
}
