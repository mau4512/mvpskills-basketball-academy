import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó ningún archivo' },
        { status: 400 }
      )
    }

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'El archivo debe ser una imagen' },
        { status: 400 }
      )
    }

    // Crear un nombre único para el archivo
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const fileName = `deportista-${params.id}-${timestamp}.${fileExtension}`
    const path = join(process.cwd(), 'public', 'images', 'deportistas', fileName)

    // Guardar archivo
    await writeFile(path, buffer)
    
    // Actualizar la URL de la foto en la base de datos
    const photoUrl = `/images/deportistas/${fileName}`
    
    const deportista = await prisma.deportista.update({
      where: { id: params.id },
      data: { photoUrl }
    })

    return NextResponse.json({ photoUrl })
  } catch (error: any) {
    console.error('Error al subir imagen:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Deportista no encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: 'Error al subir imagen' },
      { status: 500 }
    )
  }
}
