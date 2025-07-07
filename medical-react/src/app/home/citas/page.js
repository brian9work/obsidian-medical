"use client"
import React, { useEffect, useState } from 'react'
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import Link from 'next/link'
import { ChevronRight, LogOutIcon } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useContextApp } from '@/context/ContextApp'

export default function page() {
   const [data, setData] = useState([])
   const [loading, setLoading] = useState(true)
   const { token, email } = useContextApp();
   const router = useRouter();

   const getData = async () => {
      // console.log(`http://localhost:8080/api/consultation/dates/${email}`)
      try {
         const response = await fetch(
            `http://localhost:8080/api/consultation/dates/${email}`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                  "Authorization": `Bearer ${token}`
               },
            })
         if (!response.ok) {
            // router.push('/auth/login')
            console.log("No data")
            // throw new Error("Network response was not ok")
         }
         // console.log("Response status:", response.status)
         // console.log(response)
         const result = await response.json()
         // console.log("Data fetched:", result)
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
               <h1 className="text-3xl font-bold">Citas Médicas</h1>
               <p className="text-muted-foreground">Gestiona tus citas medicas</p>
            </div>
         </div>
         <div className='mt-5'>
            <Table>
               <TableCaption>Lista de expedientes.</TableCaption>
               <TableHeader >
                  <TableRow className={"bg-gray-900 text-white rounded-t-2xl"}>
                     <TableHead>Id</TableHead>
                     <TableHead>Nombre</TableHead>
                     <TableHead>Fecha</TableHead>
                     <TableHead>Hora</TableHead>
                     <TableHead>Razon</TableHead>
                     <TableHead>Status</TableHead>
                     <TableHead></TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {loading && (
                     <TableRow>
                        <TableCell colSpan={7} className="text-center">
                           <div className="flex justify-center items-center h-32">
                              <p className="font-bold">Cargando...</p>
                           </div>
                        </TableCell>
                     </TableRow>
                  )}
                  {data.map((item, index) => (
                     <TableRow key={`date-consultory-${item.id}`} className="hover:bg-gray-100 cursor-pointer">
                        <TableCell className="font-medium">#{item.id}</TableCell>
                        <TableCell>{item.name} {item.lastnamep} {item.lastnamem}</TableCell>
                        <TableCell>{item.date.split(" ")[0]}</TableCell>
                        <TableCell>{item.date.split(" ")[1]}</TableCell>
                        <TableCell>{item.reason}</TableCell>
                        <TableCell>
                           <span className='text-sm'>
                              {item.status}
                           </span>
                        </TableCell>
                        <TableCell>
                           <div className='flex gap-2'>
                              {item.status === "ACEPTADA" && (
                                 <Link
                                    className='bg-blue-800 text-white hover:bg-blue-600 cursor-pointer px-3 py-1 rounded-2xl '
                                    href={`/home/citas/ver/${item.id}`} key={item.id}>
                                    Ver detalles
                                 </Link>
                              )}
                              {item.status === "PENDIENTE" && (
                                 <>
                                    <Link
                                       className='bg-green-800 text-white hover:bg-green-600 cursor-pointer px-3 py-1 rounded-2xl '
                                       href={`/home/citas/no/${item.id}`} key={item.id}>
                                       Iniciar consulta
                                    </Link>
                                 </>
                              )}
                           </div>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
      </div>
   )
}