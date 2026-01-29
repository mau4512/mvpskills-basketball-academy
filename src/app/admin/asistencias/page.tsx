'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react'

interface Turno {
  id: string
  nombre: string
  tipo: string
  hora: string
  seccion: string
  _count: {
    deportistas: number
  }
}

export default function AsistenciasPage() {
  const [turnos, setTurnos] = useState<Turno[]>([])
  const [loading, setLoading] = useState(true)
  const fechaHoy = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  useEffect(() => {
    cargarTurnos()
  }, [])

  const cargarTurnos = async () => {
    try {
      const response = await fetch('/api/turnos')
      if (response.ok) {
        const data = await response.json()
        // Filtrar solo turnos activos
        setTurnos(Array.isArray(data) ? data.filter((t: Turno) => t.activo) : [])
      }
    } catch (error) {
      console.error('Error al cargar turnos:', error)
      setTurnos([])
    } finally {
      setLoading(false)
    }
  }

  const getSeccionLabel = (seccion: string) => {
    const labels: { [key: string]: string } = {
      'preparacion_fisica': 'Preparación Física',
      'tecnica_individual': 'Técnica Individual',
      'personalizado': 'Personalizado'
    }
    return labels[seccion] || seccion
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Cargando...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Asistencias</h1>
        <p className="text-gray-600 mt-2 capitalize">{fechaHoy}</p>
      </div>

      {/* Instrucciones */}
      <Card className="mb-6 bg-blue-50 border-blue-200">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900">Registro de Asistencia</h3>
              <p className="text-sm text-blue-800 mt-1">
                Selecciona un turno para registrar la asistencia de hoy o consultar el historial completo de asistencias.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de turnos */}
      {turnos.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No hay turnos disponibles</p>
            <Link href="/admin/turnos/nuevo">
              <Button>Crear Primer Turno</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {turnos.map((turno) => (
            <Card key={turno.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{turno.nombre}</h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {turno.hora} - {turno.tipo === 'diurno' ? 'Diurno' : 'Nocturno'}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Sección:</span>
                    <span className="ml-2 text-gray-600">{getSeccionLabel(turno.seccion)}</span>
                  </div>

                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium text-gray-900">{turno._count.deportistas}</span>
                    <span className="text-gray-500 ml-1">deportistas</span>
                  </div>

                  <div className="pt-3 border-t space-y-2">
                    <Link href={`/admin/turnos/${turno.id}/tomar-asistencia`} className="block">
                      <Button className="w-full">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Tomar Asistencia Hoy
                      </Button>
                    </Link>
                    <Link href={`/admin/turnos/${turno.id}/asistencias`} className="block">
                      <Button variant="outline" className="w-full">
                        <Calendar className="h-4 w-4 mr-2" />
                        Ver Historial
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
