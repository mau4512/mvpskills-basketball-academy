'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trophy, Users, Target, Calendar, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import MatriculaForm from '@/components/MatriculaForm'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Image 
                src="/images/mvpskills.png" 
                alt="MVP Skills Logo" 
                width={60} 
                height={60} 
                className="object-contain" 
              />
              <span className="ml-3 text-2xl font-bold text-gray-900">MVP Skills</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="#matricula">
                <Button variant="outline">Matricúlate</Button>
              </Link>
              <Link href="/login">
                <Button>Iniciar Sesión</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Desarrolla tu <span className="text-orange-600">Máximo Potencial</span> en el Basketball
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                MVP Skills es una academia de alto rendimiento dedicada a formar jugadores de basketball de élite. 
                Con entrenadores especializados, tecnología de última generación y programas personalizados, 
                llevamos tu juego al siguiente nivel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#matricula">
                  <Button size="lg" className="text-lg px-8">
                    Comienza Ahora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#programas">
                  <Button variant="outline" size="lg" className="text-lg px-8">
                    Ver Programas
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-gray-900 rounded-3xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <Trophy className="h-32 w-32 mx-auto mb-4 text-orange-400" />
                    <p className="text-2xl font-bold">Excelencia en Basketball</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir MVP Skills?
            </h2>
            <p className="text-xl text-gray-600">
              Formación integral para jugadores comprometidos con la excelencia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 hover:border-orange-400 transition-all hover:shadow-xl">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Entrenadores Profesionales</h3>
                <p className="text-gray-600">
                  Personal altamente calificado con experiencia en competencias nacionales e internacionales
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-orange-400 transition-all hover:shadow-xl">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Entrenamiento Personalizado</h3>
                <p className="text-gray-600">
                  Programas adaptados a tu nivel y objetivos, con seguimiento individualizado
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-orange-400 transition-all hover:shadow-xl">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Horarios Flexibles</h3>
                <p className="text-gray-600">
                  Turnos diurnos y nocturnos para adaptarnos a tu agenda
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-orange-400 transition-all hover:shadow-xl">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Resultados Comprobados</h3>
                <p className="text-gray-600">
                  Mejora medible en técnica, físico y rendimiento en competencias
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Programas */}
      <section id="programas" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestros Programas
            </h2>
            <p className="text-xl text-gray-600">
              Elige el plan que mejor se adapte a tus objetivos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-2xl transition-all">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Preparación Física</h3>
                <div className="text-4xl font-bold text-orange-600 mb-6">20 Sesiones</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Acondicionamiento físico general</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Desarrollo de fuerza y resistencia</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Prevención de lesiones</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Grupos de hasta 10 jugadores</span>
                  </li>
                </ul>
                <Link href="#matricula">
                  <Button className="w-full" variant="outline">Matricularme</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-400 hover:shadow-2xl transition-all transform scale-105">
              <div className="bg-orange-600 text-white text-center py-2 font-semibold rounded-t-lg">
                MÁS POPULAR
              </div>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Técnica Individual</h3>
                <div className="text-4xl font-bold text-orange-600 mb-6">12 Sesiones</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Perfeccionamiento técnico</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Ejercicios de tiro y manejo</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Análisis de video personalizado</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Grupos de hasta 10 jugadores</span>
                  </li>
                </ul>
                <Link href="#matricula">
                  <Button className="w-full">Matricularme</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-2xl transition-all">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Personalizado</h3>
                <div className="text-4xl font-bold text-orange-600 mb-6">12 Sesiones</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Atención 1 a 1 con entrenador</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Plan totalmente personalizado</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Seguimiento detallado</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Grupos reducidos (máx. 5)</span>
                  </li>
                </ul>
                <Link href="#matricula">
                  <Button className="w-full" variant="outline">Matricularme</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Formulario de Matrícula */}
      <section id="matricula" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Matricúlate Ahora
            </h2>
            <p className="text-xl text-gray-600">
              Completa el formulario y nos pondremos en contacto contigo
            </p>
          </div>

          <MatriculaForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image 
                  src="/images/mvpskills.png" 
                  alt="MVP Skills Logo" 
                  width={50} 
                  height={50} 
                  className="object-contain" 
                />
                <span className="ml-3 text-xl font-bold">MVP Skills</span>
              </div>
              <p className="text-gray-400">
                Academia de Basketball de Alto Rendimiento
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@mvpskills.com</li>
                <li>Teléfono: +34 600 000 000</li>
                <li>Dirección: Calle Ejemplo, 123</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#programas" className="text-gray-400 hover:text-orange-400">
                    Programas
                  </Link>
                </li>
                <li>
                  <Link href="#matricula" className="text-gray-400 hover:text-orange-400">
                    Matrícula
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-orange-400">
                    Iniciar Sesión
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} MVP Skills. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
