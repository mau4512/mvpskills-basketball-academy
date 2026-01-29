'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Home, Activity, User, ClipboardList, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Perfil', href: '/dashboard/perfil', icon: User },
  { name: 'Ejercicios', href: '/dashboard/ejercicios', icon: Activity },
  { name: 'Sesiones', href: '/dashboard/sesiones', icon: ClipboardList },
  { name: 'Estadísticas', href: '/dashboard/estadisticas', icon: TrendingUp },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <Image src="/images/mvpskills.png" alt="MVP Skills Logo" width={40} height={40} className="object-contain" />
              <span className="ml-2 text-xl font-bold text-gray-900">MVP Skills</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition',
                    isActive
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
