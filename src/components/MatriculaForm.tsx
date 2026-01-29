'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'

export default function MatriculaForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    programa: '',
    nivel: 'principiante',
    mensaje: ''
  })
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/matriculas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Error al enviar el formulario')
      }

      setStatus('success')
      setFormData({
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        fechaNacimiento: '',
        programa: '',
        nivel: 'principiante',
        mensaje: ''
      })
      
      // Resetear el estado después de 5 segundos
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setErrorMessage('Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.')
    }
  }

  if (status === 'success') {
    return (
      <Card className="border-2 border-green-400">
        <CardContent className="pt-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Solicitud Enviada!</h3>
          <p className="text-gray-600 mb-6">
            Gracias por tu interés. Nos pondremos en contacto contigo pronto para completar tu matrícula.
          </p>
          <Button onClick={() => setStatus('idle')}>
            Enviar otra solicitud
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2">
      <CardContent className="pt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre *
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 mb-2">
                Apellidos *
              </label>
              <input
                id="apellidos"
                name="apellidos"
                type="text"
                required
                value={formData.apellidos}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                placeholder="Tus apellidos"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono *
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                required
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                placeholder="+34 600 000 000"
              />
            </div>
          </div>

          <div>
            <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Nacimiento *
            </label>
            <input
              id="fechaNacimiento"
              name="fechaNacimiento"
              type="date"
              required
              value={formData.fechaNacimiento}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label htmlFor="programa" className="block text-sm font-medium text-gray-700 mb-2">
              Programa de Interés *
            </label>
            <select
              id="programa"
              name="programa"
              required
              value={formData.programa}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
            >
              <option value="">Selecciona un programa</option>
              <option value="preparacion_fisica">Preparación Física (20 sesiones)</option>
              <option value="tecnica_individual">Técnica Individual (12 sesiones)</option>
              <option value="personalizado">Personalizado (12 sesiones)</option>
            </select>
          </div>

          <div>
            <label htmlFor="nivel" className="block text-sm font-medium text-gray-700 mb-2">
              Nivel de Experiencia
            </label>
            <select
              id="nivel"
              name="nivel"
              value={formData.nivel}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
            >
              <option value="principiante">Principiante</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
          </div>

          <div>
            <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
              Mensaje o Consultas
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={4}
              value={formData.mensaje}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
              placeholder="Cuéntanos más sobre tus objetivos y expectativas..."
            ></textarea>
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-800">{errorMessage}</p>
            </div>
          )}

          <Button 
            type="submit" 
            size="lg" 
            className="w-full text-lg"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Enviando...' : 'Enviar Solicitud de Matrícula'}
            {status !== 'loading' && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>

          <p className="text-sm text-gray-500 text-center">
            Al enviar este formulario, aceptas que nos pongamos en contacto contigo para 
            completar el proceso de matrícula.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
