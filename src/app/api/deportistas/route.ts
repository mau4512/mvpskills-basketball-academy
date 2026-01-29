import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener todos los deportistas
export async function GET() {
  try {
    const deportistas = await prisma.deportista.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(deportistas)
  } catch (error) {
    console.error('Error al obtener deportistas:', error)
    return NextResponse.json(
      { error: 'Error al obtener deportistas' },
      { status: 500 }
    )
  }
}

// POST - Crear un nuevo deportista
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const deportista = await prisma.deportista.create({
      data: {
        nombre: body.nombre,
        apellidos: body.apellidos,
        documentoIdentidad: body.documentoIdentidad,
        email: body.email,
        celular: body.celular || null,
        fechaNacimiento: new Date(body.fechaNacimiento),
        altura: body.altura ? parseFloat(body.altura) : null,
        peso: body.peso ? parseFloat(body.peso) : null,
        posicion: body.posicion || null,
        planSesiones: body.planSesiones ? parseInt(body.planSesiones) : 12,
        activo: body.activo !== false
      }
    })

    return NextResponse.json(deportista, { status: 201 })
  } catch (error: any) {
    console.error('Error al crear deportista:', error)
    
    // Verificar si es un error de unicidad
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'El email o documento de identidad ya existe' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Error al crear deportista' },
      { status: 500 }
    )
  }
}
