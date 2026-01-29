import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// API endpoint for matriculation submissions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, apellidos, email, telefono, fechaNacimiento, programa, nivel, mensaje } = body

    // Validar campos requeridos
    if (!nombre || !apellidos || !email || !telefono || !fechaNacimiento || !programa) {
      return NextResponse.json(
        { error: 'Todos los campos obligatorios deben ser completados' },
        { status: 400 }
      )
    }

    // Crear el registro de matrícula
    const matricula = await prisma.matricula.create({
      data: {
        nombre,
        apellidos,
        email,
        telefono,
        fechaNacimiento: new Date(fechaNacimiento),
        programa,
        nivel: nivel || 'principiante',
        mensaje: mensaje || '',
        estado: 'pendiente',
      }
    })

    // Aquí podrías agregar lógica adicional como:
    // - Enviar email de confirmación al usuario
    // - Enviar notificación al admin
    // - Integración con CRM

    return NextResponse.json(
      { 
        success: true, 
        message: 'Solicitud de matrícula recibida correctamente',
        id: matricula.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error al procesar matrícula:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}

// Endpoint para obtener todas las matrículas (solo admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const estado = searchParams.get('estado')

    const where = estado ? { estado } : {}

    const matriculas = await prisma.matricula.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(matriculas)
  } catch (error) {
    console.error('Error al obtener matrículas:', error)
    return NextResponse.json(
      { error: 'Error al obtener las matrículas' },
      { status: 500 }
    )
  }
}
