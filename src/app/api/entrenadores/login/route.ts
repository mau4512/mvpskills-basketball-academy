import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Buscar entrenador por email
    const entrenador = await prisma.entrenador.findUnique({
      where: { email },
    })

    if (!entrenador) {
      return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
      )
    }

    // Verificar contraseña (en texto plano por ahora, deberías usar bcrypt en producción)
    if (entrenador.password !== password) {
      return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
      )
    }

    // Verificar que esté activo
    if (!entrenador.activo) {
      return NextResponse.json(
        { error: 'Tu cuenta está inactiva. Contacta al administrador.' },
        { status: 403 }
      )
    }

    // No enviar la contraseña en la respuesta
    const { password: _, ...entrenadorSinPassword } = entrenador

    return NextResponse.json({
      success: true,
      entrenador: entrenadorSinPassword
    })
  } catch (error) {
    console.error('Error en login de entrenador:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
