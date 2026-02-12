import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Role = 'admin' | 'entrenador' | 'deportista'

const roleOrder: Role[] = ['admin', 'entrenador', 'deportista']

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const password = typeof body.password === 'string' ? body.password : ''
    const preferredRole = body.preferredRole as Role | undefined

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    const rolesToCheck = preferredRole && roleOrder.includes(preferredRole)
      ? [preferredRole, ...roleOrder.filter((role) => role !== preferredRole)]
      : roleOrder

    for (const role of rolesToCheck) {
      if (role === 'admin') {
        const admin = await prisma.admin.findUnique({
          where: { email },
        })

        if (!admin) continue
        if (admin.password !== password) {
          return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
        }

        const { password: _password, ...adminSinPassword } = admin
        return NextResponse.json({
          success: true,
          role: 'admin',
          user: adminSinPassword,
        })
      }

      if (role === 'entrenador') {
        const entrenador = await prisma.entrenador.findUnique({
          where: { email },
        })

        if (!entrenador) continue
        if (entrenador.password !== password) {
          return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
        }
        if (!entrenador.activo) {
          return NextResponse.json(
            { error: 'Tu cuenta está inactiva. Contacta al administrador.' },
            { status: 403 }
          )
        }

        const { password: _password, ...entrenadorSinPassword } = entrenador
        return NextResponse.json({
          success: true,
          role: 'entrenador',
          user: entrenadorSinPassword,
        })
      }

      const deportista = await prisma.deportista.findUnique({
        where: { email },
        include: { turno: true },
      })

      if (!deportista) continue
      if (!deportista.password || deportista.password !== password) {
        return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
      }
      if (!deportista.activo) {
        return NextResponse.json(
          { error: 'Tu cuenta está inactiva. Contacta al administrador.' },
          { status: 403 }
        )
      }

      const { password: _password, ...deportistaSinPassword } = deportista
      return NextResponse.json({
        success: true,
        role: 'deportista',
        user: deportistaSinPassword,
      })
    }

    return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
  } catch (error) {
    console.error('Error en login unificado:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
