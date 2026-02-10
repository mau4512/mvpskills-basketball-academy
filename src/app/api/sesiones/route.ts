import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/sesiones - Obtener sesiones
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const deportistaId = searchParams.get('deportistaId')
    const entrenadorId = searchParams.get('entrenadorId')
    const planId = searchParams.get('planId')

    console.log('🔍 Parámetros recibidos:', { deportistaId, entrenadorId, planId })

    // Si no hay parámetros, devolver array vacío o error
    if (!deportistaId && !entrenadorId && !planId) {
      console.log('⚠️ No se proporcionaron parámetros de búsqueda')
      return NextResponse.json(
        { error: 'Se requiere deportistaId, entrenadorId o planId' },
        { status: 400 }
      )
    }

    // Si se solicita por entrenador, obtener sesiones de sus deportistas
    if (entrenadorId) {
      console.log('📊 Buscando sesiones por entrenadorId:', entrenadorId)
      const sesiones = await prisma.sesionEntrenamiento.findMany({
        where: {
          planEntrenamiento: {
            entrenadorId: entrenadorId
          }
        },
        include: {
          deportista: {
            select: {
              id: true,
              nombre: true,
              apellidos: true,
              photoUrl: true
            }
          },
          planEntrenamiento: {
            select: {
              id: true,
              titulo: true,
              fecha: true
            }
          }
        },
        orderBy: {
          fecha: 'desc'
        }
      })
      console.log(`✅ Encontradas ${sesiones.length} sesiones`)
      return NextResponse.json(sesiones)
    }

    // Si se solicita por deportista
    if (deportistaId) {
      console.log('📊 Buscando sesiones por deportistaId:', deportistaId)
      const sesiones = await prisma.sesionEntrenamiento.findMany({
        where: {
          deportistaId
        },
        include: {
          planEntrenamiento: {
            select: {
              id: true,
              titulo: true,
              fecha: true
            }
          }
        },
        orderBy: {
          fecha: 'desc'
        }
      })
      console.log(`✅ Encontradas ${sesiones.length} sesiones`)
      return NextResponse.json(sesiones)
    }

    // Si se solicita por plan específico
    if (planId) {
      console.log('📊 Buscando sesiones por planId:', planId)
      const sesiones = await prisma.sesionEntrenamiento.findMany({
        where: {
          planEntrenamientoId: planId
        },
        include: {
          deportista: {
            select: {
              id: true,
              nombre: true,
              apellidos: true,
              photoUrl: true
            }
          }
        },
        orderBy: {
          fecha: 'desc'
        }
      })
      console.log(`✅ Encontradas ${sesiones.length} sesiones`)
      return NextResponse.json(sesiones)
    }

    return NextResponse.json(
      { error: 'Se requiere deportistaId, entrenadorId o planId' },
      { status: 400 }
    )
  } catch (error) {
    console.error('❌ Error al obtener sesiones:', error)
    console.error('Error completo:', JSON.stringify(error, null, 2))
    return NextResponse.json(
      { error: 'Error al obtener sesiones', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// POST /api/sesiones - Crear una nueva sesión
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('📥 Recibiendo datos de sesión:', JSON.stringify(body, null, 2))
    
    if (!body.deportistaId || !body.planEntrenamientoId) {
      console.error('❌ Faltan parámetros requeridos:', { deportistaId: body.deportistaId, planEntrenamientoId: body.planEntrenamientoId })
      return NextResponse.json(
        { error: 'deportistaId y planEntrenamientoId son requeridos', received: body },
        { status: 400 }
      )
    }
    
    // Validar que el deportista existe
    const deportistaExists = await prisma.deportista.findUnique({
      where: { id: body.deportistaId }
    })
    
    if (!deportistaExists) {
      console.error('❌ Deportista no encontrado:', body.deportistaId)
      return NextResponse.json(
        { error: 'Deportista no encontrado', details: `ID: ${body.deportistaId}` },
        { status: 404 }
      )
    }
    
    // Validar que el plan existe
    const planExists = await prisma.planEntrenamiento.findUnique({
      where: { id: body.planEntrenamientoId }
    })
    
    if (!planExists) {
      console.error('❌ Plan de entrenamiento no encontrado:', body.planEntrenamientoId)
      return NextResponse.json(
        { error: 'Plan de entrenamiento no encontrado', details: `ID: ${body.planEntrenamientoId}` },
        { status: 404 }
      )
    }

    const sesion = await prisma.sesionEntrenamiento.create({
      data: {
        deportistaId: body.deportistaId,
        planEntrenamientoId: body.planEntrenamientoId,
        fecha: body.fecha ? new Date(body.fecha) : new Date(),
        duracion: body.duracion ? parseInt(body.duracion) : 0,
        resultados: body.ejercicios || [],
        observaciones: body.observaciones || null
      }
    })

    console.log('✅ Sesión creada:', sesion.id)
    return NextResponse.json(sesion, { status: 201 })
  } catch (error) {
    console.error('❌ Error al crear sesión:', error)
    console.error('Error completo:', JSON.stringify(error, null, 2))
    return NextResponse.json(
      { error: 'Error al crear sesión', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
