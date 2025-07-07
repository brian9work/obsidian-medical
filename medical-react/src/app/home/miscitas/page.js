"use client"
import React from 'react'
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { useContextApp } from '@/context/ContextApp'
import MyConsults from '@/components/panel/user/MyConsults'
import { LogOutIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function page() {
   const [pagination, setPagination] = useState({
      page: 0,
      size: 5,
   })
   const [data, setData] = useState([])
   const [loading, setLoading] = useState(true)
   const { token, email } = useContextApp();
   const router = useRouter();

   const getData = async () => {
      console.log(`http://localhost:8080/api/consultation/${email}`)
      try {
         const response = await fetch(
            `http://localhost:8080/api/consultation/${email}`,
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
         console.log("Response status:", response.status)
         console.log(response)
         const result = await response.json()
         console.log("Data fetched:", result)
         setData(result)
         setLoading(false)
         router.push('/home/miscitas')
      }
      catch (error) {
         console.error("Error fetching data:", error)
      }
   }

   useEffect(() => {
      getData()
   }, [pagination])

   return (
      <div>
         <div className="flex justify-between items-center">
            <div>
               <h1 className="text-3xl font-bold">Concultas Médicas</h1>
               <p className="text-muted-foreground">Gestiona tuus consultas medicas</p>
            </div>
            <div className="flex gap-2">
               <MyConsults />
            </div>
         </div>
         <div className='mt-5'>
            <Table>
               <TableCaption>Lista de expedientes.</TableCaption>
               <TableHeader >
                  <TableRow className={"bg-gray-900 text-white rounded-t-2xl"}>
                     <TableHead>Id</TableHead>
                     {/* <TableHead>Usuario</TableHead> */}
                     <TableHead>Razon</TableHead>
                     <TableHead>Fecha</TableHead>
                     <TableHead>Hora</TableHead>
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
                        {/* <TableCell>{item.username}</TableCell> */}
                        <TableCell>{item.reason}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.hour}</TableCell>
                        <TableCell>
                           {item.status !== "PENDIENTE" && 
                           <Link 
                              href={`/home/miscitas/cita/${item.id}`} 
                              key={item.id}
                              className="bg-blue-500 text-white px-7 py-1 rounded hover:bg-blue-600 transition-colors"
                           >
                              Ver cita
                           </Link>
                           }
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>

         </div>
      </div>
   )
}