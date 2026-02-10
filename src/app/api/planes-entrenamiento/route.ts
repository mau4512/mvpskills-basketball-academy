import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Obtener todos los planes de un entrenador o turno
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const entrenadorId = searchParams.get('entrenadorId');
    const turnoId = searchParams.get('turnoId');

    if (!entrenadorId && !turnoId) {
      return NextResponse.json(
        { error: 'entrenadorId o turnoId es requerido' },
        { status: 400 }
      );
    }

    const whereClause: any = {};
    if (entrenadorId) {
      whereClause.entrenadorId = entrenadorId;
    }
    if (turnoId) {
      whereClause.turnoId = turnoId;
    }

    const planes = await prisma.planEntrenamiento.findMany({
      where: whereClause,
      include: {
        turno: {
          select: {
            id: true,
            nombre: true,
            hora: true,
          },
        },
      },
      orderBy: {
        fecha: 'desc',
      },
    });

    return NextResponse.json(planes);
  } catch (error) {
    console.error('Error al obtener planes:', error);
    return NextResponse.json(
      { error: 'Error al obtener planes de entrenamiento' },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo plan de entrenamiento
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { titulo, fecha, turnoId, entrenadorId, notas, ejercicios } = body;

    console.log('📝 Creando plan de entrenamiento:');
    console.log('Título:', titulo);
    console.log('Fecha:', fecha);
    console.log('TurnoId:', turnoId);
    console.log('EntrenadorId:', entrenadorId);
    console.log('Ejercicios recibidos:', JSON.stringify(ejercicios, null, 2));

    // Validaciones
    if (!titulo || !fecha || !turnoId || !entrenadorId) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    if (!Array.isArray(ejercicios)) {
      return NextResponse.json(
        { error: 'ejercicios debe ser un array' },
        { status: 400 }
      );
    }

    const nuevoPlan = await prisma.planEntrenamiento.create({
      data: {
        titulo,
        fecha: new Date(fecha + 'T12:00:00'),
        turnoId,
        entrenadorId,
        notas: notas || '',
        ejercicios: ejercicios,
      },
      include: {
        turno: {
          select: {
            id: true,
            nombre: true,
            hora: true,
          },
        },
      },
    });

    console.log('✅ Plan creado exitosamente:', nuevoPlan.id);
    console.log('Ejercicios guardados:', JSON.stringify(nuevoPlan.ejercicios, null, 2));

    return NextResponse.json(nuevoPlan, { status: 201 });
  } catch (error) {
    console.error('❌ Error al crear plan:', error);
    return NextResponse.json(
      { error: 'Error al crear plan de entrenamiento' },
      { status: 500 }
    );
  }
}
