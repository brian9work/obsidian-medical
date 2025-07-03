"use client"

import { Button } from "@/components/ui/button"
import { LogOutIcon, Plus } from "lucide-react"
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useContextApp } from "@/context/ContextApp"
import { useRouter } from "next/navigation"

export default function Home() {
   const [data, setData] = useState([])
   const [loading, setLoading] = useState(true)
   const { token, email } = useContextApp();
   const router = useRouter();

   const getData = async () => {

      try {
         const response = await fetch("http://localhost:8080/expedient/getByAdmin", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
               email: email
            })
         })
         if (!response.ok) {
            router.push('/auth/login')
            throw new Error("Network response was not ok")
         }
         const result = await response.json()
         setData(result)
         setLoading(false)
      }
      catch (error) {
         console.error("Error fetching data:", error)
      }
   }

   useEffect(() => {
      getData()
   }, [])

   return (
      <div>
         <div className="flex justify-between items-center">
            <div>
               <h1 className="text-3xl font-bold">Expedientes Médicos</h1>
               <p className="text-muted-foreground">Gestiona los expedientes completos de los pacientes</p>
            </div>
            <div className="flex gap-2">
               <Link href="/home/expedientes/nuevo">
                  <Button className={"bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"}>
                     <Plus className="mr-2 h-4 w-4" />
                     Nuevo Expediente
                  </Button>
               </Link>
            </div>
         </div>
         <div className="mt-5">
            <Table>
               <TableCaption>Lista de expedientes.</TableCaption>
               <TableHeader >
                  <TableRow className={"bg-gray-900 text-white rounded-t-2xl"}>
                     <TableHead>Id</TableHead>
                     <TableHead>Nombre completo</TableHead>
                     <TableHead>Fecha de nacimiento</TableHead>
                     <TableHead>Edad</TableHead>
                     <TableHead>Genero</TableHead>
                     <TableHead></TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {loading && (
                     <TableRow>
                        <TableCell colSpan={5} className="text-center">
                           <div className="flex justify-center items-center h-32">
                              <p className="font-bold">Cargando...</p>
                           </div>
                        </TableCell>
                     </TableRow>
                  )}
                  {data.map((item, index) => (
                     <TableRow key={`expediente-${item.id}`} className="hover:bg-gray-100 cursor-pointer">
                        <TableCell className="font-medium">#{item.id}</TableCell>
                        <TableCell>{item.fullName}</TableCell>
                        <TableCell>{item.birthdate}</TableCell>
                        <TableCell>{item.age} años</TableCell>
                        <TableCell>{item.gender}</TableCell>
                        <TableCell>
                           <Link href={`/home/expedientes/no/${item.id}`} key={item.id}>
                              <LogOutIcon className="h-4 w-4 text-gray-500 hover:text-gray-900 cursor-pointer" />
                           </Link>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
      </div>
   )
}