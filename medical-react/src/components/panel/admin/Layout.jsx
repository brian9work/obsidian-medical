import { Button } from '@/components/ui/button'
import { useRouter, usePathname } from "next/navigation"
import Link from 'next/link'
import React from 'react'
import { Calendar, FileText, Home, LogOut, LogOutIcon, Menu, Stethoscope, User, Users } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useContextApp } from '@/context/ContextApp'

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Pacientes", href: "/dashboard/pacientes", icon: Users },
  { name: "Citas", href: "/dashboard/citas", icon: Calendar },
  { name: "Expedientes", href: "/dashboard/expedientes", icon: FileText },
   { name: "Salir", href: "/dashboard/expedientes", icon: LogOutIcon },
]

export default function Layout({ children }) {
   const { email } = useContextApp();
   const pathname = usePathname()

  return (
      <header className="w-full min-w-screen bg-gray-50 shadow-md">
         <div className="w-11/12 mx-auto flex flex-row items-center justify-between py-4">
            <div className="flex flex-row">
               <Stethoscope className="h-8 w-8 text-blue-600" />
               <span className="ml-6 text-xl font-bold text-gray-900">Sistema Médico - Admin</span>
            </div>
            <div>
               <nav className="flex flex-row px-2">
                      {navigation.map((item) => (
                         <Link
                            key={item.name}
                            href={item.href}
                            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${pathname === item.href
                               ? "bg-blue-100 text-blue-900"
                               : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                               }`}
                         >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                         </Link>
                      ))}
                   </nav>
            </div>
         </div>
      </header>
  )
}
