'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Users, Home, Clock, Calendar, UserCog, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const cerrarSesion = () => {
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('admin')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md border-b-4 border-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/admin" className="flex items-center">
                <Image src="/images/mvpskills.png" alt="MVP Skills Logo" width={40} height={40} className="object-contain" />
                <span className="ml-2 text-xl font-bold text-gray-900">MVP Skills Admin</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <Link
                  href="/admin"
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Inicio
                </Link>
                <Link
                  href="/admin/deportistas"
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Deportistas
                </Link>
                <Link
                  href="/admin/entrenadores"
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                >
                  <UserCog className="h-5 w-5 mr-2" />
                  Entrenadores
                </Link>
                <Link
                  href="/admin/turnos"
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                >
                  <Clock className="h-5 w-5 mr-2" />
                  Turnos
                </Link>
                <Link
                  href="/admin/asistencias"
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Asistencias
                </Link>
              </div>
            </div>
            
            <div className="flex items-center">
              <button
                onClick={cerrarSesion}
                className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
