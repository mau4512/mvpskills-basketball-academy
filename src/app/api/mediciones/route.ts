import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/mediciones - Obtener mediciones
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const deportistaId = searchParams.get('deportistaId')

    if (!deportistaId) {
      return NextResponse.json(
        { error: 'Se requiere deportistaId' },
        { status: 400 }
      )
    }

    const mediciones = await prisma.medicion.findMany({
      where: {
        deportistaId
      },
      orderBy: {
        fecha: 'desc'
      }
    })

    return NextResponse.json(mediciones)
  } catch (error) {
    console.error('Error al obtener mediciones:', error)
    return NextResponse.json(
      { error: 'Error al obtener mediciones' },
      { status: 500 }
    )
  }
}

// POST /api/mediciones - Crear una nueva medición
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.deportistaId) {
      return NextResponse.json(
        { error: 'deportistaId es requerido' },
        { status: 400 }
      )
    }

    const medicion = await prisma.medicion.create({
      data: {
        deportistaId: body.deportistaId,
        fecha: body.fecha ? new Date(body.fecha) : new Date(),
        peso: body.peso ? parseFloat(body.peso) : null,
        altura: body.altura ? parseFloat(body.altura) : null,
        saltoVertical: body.saltoVertical ? parseFloat(body.saltoVertical) : null,
        velocidad: body.velocidad ? parseFloat(body.velocidad) : null,
        fuerza: body.fuerza ? parseFloat(body.fuerza) : null,
        tipoMedicion: body.tipoMedicion || 'Test Físico',
        notas: body.notas || null
      }
    })

    return NextResponse.json(medicion, { status: 201 })
  } catch (error) {
    console.error('Error al crear medición:', error)
    return NextResponse.json(
      { error: 'Error al crear medición' },
      { status: 500 }
    )
  }
}
