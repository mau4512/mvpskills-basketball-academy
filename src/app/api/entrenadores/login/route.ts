import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, isBcryptHash, verifyPassword } from '@/lib/password'

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

    const passwordOk = await verifyPassword(password, entrenador.password)
    if (!passwordOk) {
      return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
      )
    }
    if (!isBcryptHash(entrenador.password)) {
      await prisma.entrenador.update({
        where: { id: entrenador.id },
        data: { password: await hashPassword(password) },
      })
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
