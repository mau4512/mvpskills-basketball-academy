import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/sesiones/[id] - Obtener una sesión específica
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('🔍 Buscando sesión con ID:', params.id)
    
    const sesion = await prisma.sesionEntrenamiento.findUnique({
      where: {
        id: params.id
      },
      include: {
        deportista: {
          select: {
            id: true,
            nombre: true,
            apellidos: true,
            photoUrl: true,
            email: true,
            posicion: true
          }
        },
        planEntrenamiento: {
          select: {
            id: true,
            titulo: true,
            fecha: true,
            ejercicios: true,
            notas: true,
            entrenador: {
              select: {
                nombre: true,
                apellidos: true
              }
            }
          }
        }
      }
    })

    if (!sesion) {
      console.log('❌ Sesión no encontrada:', params.id)
      return NextResponse.json(
        { error: 'Sesión no encontrada' },
        { status: 404 }
      )
    }

    console.log('✅ Sesión encontrada:', sesion.id)
    return NextResponse.json(sesion)
  } catch (error) {
    console.error('❌ Error al obtener sesión:', error)
    console.error('Error completo:', JSON.stringify(error, null, 2))
    return NextResponse.json(
      { error: 'Error al obtener sesión', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// DELETE /api/sesiones/[id] - Eliminar una sesión
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.sesionEntrenamiento.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({ message: 'Sesión eliminada exitosamente' })
  } catch (error) {
    console.error('Error al eliminar sesión:', error)
    return NextResponse.json(
      { error: 'Error al eliminar sesión' },
      { status: 500 }
    )
  }
}
