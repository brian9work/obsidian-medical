"use client"
import React from 'react'
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

export default function MyConsults() {
   const [date, setDate] = React.useState("2000-01-01");
   const [hour, setHour] = React.useState("01:01");
   const [reason, setReason] = React.useState("Razon");
   const [details, setDetails] = React.useState("Detalles de la cita");
   const [loading, setLoading] = React.useState(true)
   const { token, email } = useContextApp();


   const sendData = async (e) => {
      e.preventDefault();
      setLoading(true);

      const object = {
         email: email,
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
            alert("Error al agregar el expediente. Por favor, verifica los datos ingresados.");
            setLoading(false);
            return;
         }

         const result = await response.text()
         alert(result)
         setLoading(false)
         // router.push('/home/expedientes')
      }
      catch (error) {
         console.error("Error fetching data:", error)
      }
   }

   return (
      <div>
         <Dialog>
            <DialogTrigger
               className={"bg-gray-900 text-white hover:bg-gray-800 cursor-pointer p-3 rounded-2xl flex items-center"}>
               <Calendar className="mr-2 h-4 w-4" />
               Agregar nueva cita
            </DialogTrigger>
            <DialogContent className={`bg-white shadow-lg rounded-lg w-11/12 max-w-[1000px]`}>
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
                           <Label className={`mb-2`} htmlFor="reason">Motivo</Label>
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
                           {loading ? "Agregar Expediente" : "Agregando..."}
                        </Button>
                     </div>
                  </div>
               </form>
            </DialogContent>
         </Dialog>
      </div>
   )
}
