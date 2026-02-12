import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, verifyPassword } from '@/lib/password'

export const dynamic = 'force-dynamic'

function sanitizeEmail(email: string | undefined | null) {
  return (email || '').trim().toLowerCase()
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const adminId = searchParams.get('adminId')
    const adminEmail = sanitizeEmail(searchParams.get('adminEmail'))

    let admin = null

    if (adminId && adminId !== 'default-admin') {
      admin = await prisma.admin.findUnique({ where: { id: adminId } })
    }

    if (!admin && adminEmail && adminEmail !== 'admin') {
      admin = await prisma.admin.findUnique({ where: { email: adminEmail } })
    }

    if (!admin) {
      return NextResponse.json({
        id: 'default-admin',
        nombre: 'Administrador',
        email: 'admin',
        rol: 'admin',
      })
    }

    const { password: _password, ...adminSinPassword } = admin
    return NextResponse.json(adminSinPassword)
  } catch (error) {
    console.error('Error al obtener perfil admin:', error)
    return NextResponse.json({ error: 'Error al obtener perfil admin' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const currentAdminId = body.currentAdminId as string | undefined
    const currentAdminEmail = sanitizeEmail(body.currentAdminEmail)
    const nombre = (body.nombre as string | undefined)?.trim()
    const email = sanitizeEmail(body.email)
    const currentPassword = body.currentPassword as string | undefined
    const newPassword = body.newPassword as string | undefined

    if (!nombre || !email) {
      return NextResponse.json(
        { error: 'Nombre y correo son requeridos' },
        { status: 400 }
      )
    }

    let admin = null

    if (currentAdminId && currentAdminId !== 'default-admin') {
      admin = await prisma.admin.findUnique({ where: { id: currentAdminId } })
    }

    if (!admin && currentAdminEmail && currentAdminEmail !== 'admin') {
      admin = await prisma.admin.findUnique({ where: { email: currentAdminEmail } })
    }

    // Si viene de admin/admin por defecto, crea el usuario real.
    if (!admin) {
      if (!newPassword || newPassword.length < 8) {
        return NextResponse.json(
          { error: 'Debes definir una nueva contraseña de al menos 8 caracteres para crear tu usuario admin' },
          { status: 400 }
        )
      }

      const createdAdmin = await prisma.admin.create({
        data: {
          nombre,
          email,
          password: await hashPassword(newPassword),
          rol: 'admin',
        },
      })

      const { password: _password, ...adminSinPassword } = createdAdmin
      return NextResponse.json(adminSinPassword)
    }

    const updateData: { nombre: string; email: string; password?: string } = {
      nombre,
      email,
    }

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: 'Debes ingresar tu contraseña actual para cambiarla' },
          { status: 400 }
        )
      }

      const currentPasswordOk = await verifyPassword(currentPassword, admin.password)
      if (!currentPasswordOk) {
        return NextResponse.json(
          { error: 'La contraseña actual es incorrecta' },
          { status: 401 }
        )
      }

      if (newPassword.length < 8) {
        return NextResponse.json(
          { error: 'La nueva contraseña debe tener al menos 8 caracteres' },
          { status: 400 }
        )
      }

      updateData.password = await hashPassword(newPassword)
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id: admin.id },
      data: updateData,
    })

    const { password: _password, ...adminSinPassword } = updatedAdmin
    return NextResponse.json(adminSinPassword)
  } catch (error: any) {
    console.error('Error al actualizar perfil admin:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Ese correo ya está registrado' },
        { status: 400 }
      )
    }

    return NextResponse.json({ error: 'Error al actualizar perfil admin' }, { status: 500 })
  }
}
