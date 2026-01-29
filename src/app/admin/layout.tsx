import Link from 'next/link'
import Image from 'next/image'
import { Users, Home, Clock, Calendar, UserCog } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
              <Link
                href="/dashboard"
                className="text-sm text-gray-600 hover:text-orange-600"
              >
                Ver como deportista →
              </Link>
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
