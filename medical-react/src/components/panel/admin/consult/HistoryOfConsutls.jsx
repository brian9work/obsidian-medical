"use client"
import React, { useEffect, useState } from 'react'
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useContextApp } from '@/context/ContextApp'

export default function HistoryOfConsutls({ userInfo, path }) {
   const [historyData, setHistoryData] = useState([])
   const [loading, setLoading] = useState(true)
   const { token, email } = useContextApp();

   const getHistory = async () => {
      try {
         const response = await fetch(
            `http://localhost:8080/api/consultation/${userInfo.split("-")[1]}`,
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
            const result = await response.text()
            console.log("No data from history Data")
            console.log(result)
            // throw new Error("Network response was not ok")
         }
         const result = await response.json()
         setHistoryData(result)
         setLoading(false)
      }
      catch (error) {
         console.error("Error fetching data:", error)
      }
   }

   useEffect(() => {
      getHistory()
   }, [])

   return (
      <div className='shadow-xl bg-white py-5 px-2 rounded-lg'>
         <Dialog>
            <DialogTrigger
               className={"bg-gray-900 text-white hover:bg-gray-800 cursor-pointer p-3 rounded-2xl flex items-center"}>
               <Calendar className="mr-2 h-4 w-4" />
               Agregar nueva cita
            </DialogTrigger>
            <DialogContent className={`bg-white shadow-lg rounded-lg w-11/12 max-w-[1000px]`}>
               <HistoryOfConsutlsForm userInfo={userInfo} path={path} />
            </DialogContent>
         </Dialog>
         <div className={`mt-5`}>
            <h2 className="text-lg font-semibold">Historial</h2>
            <div className='mt-4 max-h-[70vh] overflow-y-auto'>
               {loading ?
                  <div className=''>Cargando Historial de consultas</div>
                  :
                  <div>
                     {historyData.map(hd => {
                        return (
                           <div key={"historial-data-" + hd.id}
                              className='flex flex-col gap-x-2 text-sm bg-gray-100 mt-5 py-2 px-3 rounded-lg'>
                              <div className='ml-auto flex items-center mb-2'>
                                 <Calendar className="inline h-4 w-4 text-gray-600" />
                                 <span className="text-gray-800 font-bold ml-1">{hd.date}</span>
                              </div>
                              <div className='mb-0.5'>
                                 <span className="text-gray-600 font-bold block ">{hd.reason}: - {hd.status}</span>
                                 <p className="line-clamp-5 text-gray-800">{hd.details}</p>
                              </div>
                           </div>
                        )
                     })}
                  </div>
               }
            </div>
         </div>
      </div>
   )
}



const HistoryOfConsutlsForm = ({ userInfo, path }) => {
   const [date, setDate] = useState("2000-01-01");
   const [hour, setHour] = useState("01:01");
   const [reason, setReason] = useState("Razon");
   const [details, setDetails] = useState("Detalles de la cita");
   const { token, email } = useContextApp();

   const sendData = async (e) => {
      e.preventDefault();

      const object = {
         email: userInfo.split("-")[1],
         date: date,
         hour: hour,
         reason: reason,
         details: details,
      }

      console.log(object)

      try {
         const response = await fetch("http://localhost:8080/api/consultation/save", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(object)
         })

         if (!response.ok) {
            console.error("Network response was not ok:", response.statusText);
            const result = await response.text()
            alert(result);
            return;
         }

         const result = await response.text()
         alert(result)
      }
      catch (error) {
         console.error("Error fetching data:", error)
      }
   }

   return (
      <form onSubmit={sendData} encType="multipart/form-data">
         <div>
            <DialogHeader>
               <DialogTitle className="text-2xl font-bold text-gray-900">
                  Nueva cita medica
                  <span className="text-gray-700 font-normal text-sm">
                     {/* {emailUser} */}
                  </span>
               </DialogTitle>
            </DialogHeader>
         </div>
         <div className="flex flex-col gap-6 mt-4">
            <div className="flex flex-col gap-4">
               <div className="w-full">
                  <Label className={`mb-2`} htmlFor="date">Fecha</Label>
                  <Input
                     className={`block w-full`}
                     id="date"
                     type="date"
                     placeholder=""
                     value={date}
                     onChange={(e) => setDate(e.target.value)}
                     required
                  />
               </div>
               <div className="w-full">
                  <Label className={`mb-2`} htmlFor="hour">Hora</Label>
                  <Input
                     className={`block w-full`}
                     id="hour"
                     type="time"
                     placeholder=""
                     value={hour}
                     onChange={(e) => setHour(e.target.value)}
                     required
                  />
               </div>
               <div className="w-full">
                  <Label className={`mb-2`} htmlFor="reason">Motivo </Label>
                  <Input
                     className={`block w-full`}
                     id="reason"
                     type="text"
                     placeholder=""
                     value={reason}
                     onChange={(e) => setReason(e.target.value)}
                     required
                  />
               </div>
            </div>
            <div className="flex flex-row gap-4">
               <div className="grid w-full gap-3">
                  <Label htmlFor="detail">Descripcion corta</Label>
                  <Textarea
                     placeholder="Escribe una breve descripcion de la cita"
                     id="detail"
                     value={details}
                     onChange={(e) => setDetails(e.target.value)}
                  />
               </div>
            </div>
            <div className="flex justify-end ">
               <Button
                  type="submit"
                  className={"w-[300px] cursor-pointer mt-5 py-2 bg-gray-900 text-white hover:bg-gray-800"}
               >
                  Agregar
                  {/* {loading ? "Agregar Expediente" : "Agregando..."} */}
               </Button>
            </div>
         </div>
      </form>
   )
}