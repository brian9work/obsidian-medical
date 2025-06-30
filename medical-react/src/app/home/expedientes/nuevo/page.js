"use client"
import {
   Dialog,
   DialogContent,
   DialogTrigger,
} from "@/components/ui/dialog"
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import Expedient from "@/components/panel/admin/Expedient";
import { useEffect, useState } from "react"
import { useContextApp } from "@/context/ContextApp"
import { useRouter } from "next/navigation"
import { LogOutIcon, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
   const [data, setData] = useState([])
   const [loading, setLoading] = useState(true)
   const { token } = useContextApp();
   const router = useRouter();

   const getData = async () => {
      try {
         const response = await fetch("http://localhost:8080/expedient/userwithexpedient", {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
               "Authorization": `Bearer ${token}`
            }
         })
         if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText)
         }

         console.log("Response status:", response)
         const json = await response.json()
         console.log("Response text:", json)
         setData(json)
         setLoading(false)
         // if (!response.ok) {
         //    console.error("Failed to fetch data:", response.statusText)
         // router.push('/auth/login')
         // throw new Error("Network response was not ok")
         // }
         // console.log("Response status:", response.status)
         // const result = await response.json()
         // console.log("Data fetched successfully:", result)
         // setData(result)
         // setLoading(false)
         // console.log("Data fetched successfully:", result)

      }
      catch (error) {
         console.error("Error fetching data:", error)
      }
   }

   useEffect(() => {
      getData()
   }, [])

   return (
      <>
         <div className="flex justify-between items-center">
            <div>
               <h1 className="text-3xl font-bold">Usuarios sin expediente</h1>
               <p className="text-muted-foreground">Se encuentran los usuarios registrados que no tienen expediente</p>
            </div>
         </div>
         <div className="mt-5">
            <Table>
               <TableCaption>Lista de expedientes.</TableCaption>
               <TableHeader >
                  <TableRow className={"bg-gray-900 text-white rounded-t-2xl"}>
                     <TableHead>Id</TableHead>
                     <TableHead>Username</TableHead>
                     <TableHead>Correo</TableHead>
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
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>
                           <Dialog>
                              <DialogTrigger>
                                 <Button className={"bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Agregar Expediente
                                 </Button>
                              </DialogTrigger>
                              <DialogContent className={`bg-white shadow-lg rounded-lg w-11/12 max-w-[1000px]`}>
                                 <Expedient email={item.email} />
                              </DialogContent>
                           </Dialog>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
      </>
   )
}