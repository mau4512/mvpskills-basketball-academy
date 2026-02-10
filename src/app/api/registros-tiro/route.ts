import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener registros de tiro
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const deportistaId = searchParams.get('deportistaId')
    const ejercicioTiroId = searchParams.get('ejercicioTiroId')

    const where: any = {}
    if (deportistaId) where.deportistaId = deportistaId
    if (ejercicioTiroId) where.ejercicioTiroId = ejercicioTiroId

    const registros = await prisma.registroTiro.findMany({
      where,
      include: {
        ejercicioTiro: {
          include: {
            turno: true
          }
        },
        deportista: {
          select: {
            nombre: true,
            apellidos: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(registros)
  } catch (error) {
    console.error('Error al obtener registros de tiro:', error)
    return NextResponse.json(
      { error: 'Error al obtener registros de tiro' },
      { status: 500 }
    )
  }
}

// POST - Crear registro de tiro
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const registro = await prisma.registroTiro.create({
      data: {
        ejercicioTiroId: body.ejercicioTiroId,
        deportistaId: body.deportistaId,
        posicion: body.posicion,
        metaPosicion: body.metaPosicion,
        intentos: body.intentos,
        aciertos: body.aciertos,
        completado: body.aciertos >= body.metaPosicion
      },
      include: {
        ejercicioTiro: true,
        deportista: true
      }
    })

    return NextResponse.json(registro, { status: 201 })
  } catch (error) {
    console.error('Error al crear registro de tiro:', error)
    return NextResponse.json(
      { error: 'Error al crear registro de tiro' },
      { status: 500 }
    )
  }
}
