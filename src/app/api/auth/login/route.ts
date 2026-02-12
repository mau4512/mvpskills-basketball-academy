import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, isBcryptHash, verifyPassword } from '@/lib/password'

type Role = 'admin' | 'entrenador' | 'deportista'

const roleOrder: Role[] = ['admin', 'entrenador', 'deportista']

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const login = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const password = typeof body.password === 'string' ? body.password : ''
    const preferredRole = body.preferredRole as Role | undefined
    const primaryAdminEmail = (process.env.PRIMARY_ADMIN_EMAIL || '').trim().toLowerCase()
    const primaryAdminPasswordHash = process.env.PRIMARY_ADMIN_PASSWORD_HASH || ''

    if (!login || !password) {
      return NextResponse.json(
        { error: 'Usuario/correo y contraseña son requeridos' },
        { status: 400 }
      )
    }

    const rolesToCheck = preferredRole && roleOrder.includes(preferredRole)
      ? [preferredRole, ...roleOrder.filter((role) => role !== preferredRole)]
      : roleOrder

    for (const role of rolesToCheck) {
      if (role === 'admin') {
        // Admin principal por variables de entorno (sin exponer credenciales en código)
        if (
          primaryAdminEmail &&
          primaryAdminPasswordHash &&
          login === primaryAdminEmail &&
          await verifyPassword(password, primaryAdminPasswordHash)
        ) {
          return NextResponse.json({
            success: true,
            role: 'admin',
            user: {
              id: 'primary-admin',
              nombre: 'Administrador Principal',
              email: primaryAdminEmail,
              rol: 'admin',
            },
          })
        }

        const admin = await prisma.admin.findUnique({
          where: { email: login },
        })

        if (!admin) continue
        const adminPasswordOk = await verifyPassword(password, admin.password)
        if (!adminPasswordOk) {
          return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
        }
        if (!isBcryptHash(admin.password)) {
          await prisma.admin.update({
            where: { id: admin.id },
            data: { password: await hashPassword(password) },
          })
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
          where: { email: login },
        })

        if (!entrenador) continue
        const entrenadorPasswordOk = await verifyPassword(password, entrenador.password)
        if (!entrenadorPasswordOk) {
          return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
        }
        if (!isBcryptHash(entrenador.password)) {
          await prisma.entrenador.update({
            where: { id: entrenador.id },
            data: { password: await hashPassword(password) },
          })
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
        where: { email: login },
        include: { turno: true },
      })

      if (!deportista) continue
      const deportistaPasswordOk = await verifyPassword(password, deportista.password)
      if (!deportistaPasswordOk) {
        return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
      }
      if (deportista.password && !isBcryptHash(deportista.password)) {
        await prisma.deportista.update({
          where: { id: deportista.id },
          data: { password: await hashPassword(password) },
        })
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
