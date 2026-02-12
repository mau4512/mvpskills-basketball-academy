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

    // Buscar deportista por email
    const deportista = await prisma.deportista.findUnique({
      where: { email },
      include: {
        turno: true
      }
    })

    if (!deportista) {
      return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
      )
    }

    const passwordOk = await verifyPassword(password, deportista.password)
    if (!passwordOk) {
      return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
      )
    }
    if (deportista.password && !isBcryptHash(deportista.password)) {
      await prisma.deportista.update({
        where: { id: deportista.id },
        data: { password: await hashPassword(password) },
      })
    }

    // Verificar que esté activo
    if (!deportista.activo) {
      return NextResponse.json(
        { error: 'Tu cuenta está inactiva. Contacta al administrador.' },
        { status: 403 }
      )
    }

    // No enviar la contraseña en la respuesta
    const { password: _, ...deportistaSinPassword } = deportista

    return NextResponse.json({
      success: true,
      deportista: deportistaSinPassword
    })
  } catch (error) {
    console.error('Error en login de deportista:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
