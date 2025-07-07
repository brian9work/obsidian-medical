import React, { useEffect, useState } from 'react'
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useContextApp } from '@/context/ContextApp'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function VitalSigns({ userInfo, path, setVitalSignsMoreRecent }) {
   const [idUser, emailUser] = userInfo.split("-")
   const [vitalSignsData, setVitalSignsData] = useState()
   const [loadingVitalSigns, setLoadingVitalSigns] = useState(true)
   const { token, email } = useContextApp();

   const getVitalSigns = async () => {
      try {
         const response = await fetch(
            `http://localhost:8080/api/vitalsigns/${idUser}`,
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
         const result = await response.json()
         setVitalSignsData(result)
         setVitalSignsMoreRecent(result[0].id) // Set the most recent vital signs
         setLoadingVitalSigns(false)
      }
      catch (error) {
         console.error("Error fetching data:", error)
      }
   }

   useEffect(() => {
      getVitalSigns()
   }, [])

   return (
      <div className='shadow-xl bg-white py-5 px-2 rounded-lg'>
         <div className='flex items-center'>
            <Dialog>
               <DialogTrigger
                  className={"bg-gray-900 text-white hover:bg-gray-800 cursor-pointer p-3 rounded-2xl flex items-center"}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Agregar signos vitales
               </DialogTrigger>
               <DialogContent className={`bg-white shadow-lg rounded-lg w-11/12 max-w-[1000px]`}>
                  <VitalSignsForm userInfo={userInfo} path={path} />
               </DialogContent>
            </Dialog>
         </div>
         <div className={`mt-5`}>
            <h2 className="text-lg font-semibold">Historial</h2>
            {loadingVitalSigns ?
               <div className=''>Cargando signos vitales...</div>
               :

               <div className='mt-4 max-h-[70vh] overflow-y-auto'>
                  {vitalSignsData.map(vs => {
                     return (
                        <div
                           key={"frecuencia-cardiada-" + vs.id}
                           className='flex flex-col gap-x-2 text-sm bg-gray-100 mt-5 py-2 px-3 rounded-lg'>
                           <div className='ml-auto flex items-center'>
                              <Calendar className="inline h-4 w-4 text-gray-600" />
                              <span className="text-gray-800 font-bold ml-1">{vs.date} #{vs.id}</span>
                           </div>
                           <div className='mb-0.5'>
                              <span className="text-gray-600">Presion Arterial:</span>
                              <span className="text-gray-800 font-bold block ml-4">{vs.bloodPressure}</span>
                           </div>
                           <div className='mb-0.5'>
                              <span className="text-gray-600">Peso:</span>
                              <span className="text-gray-800 font-bold block ml-4">{vs.weight}</span>
                           </div>
                           <div className='mb-0.5'>
                              <span className="text-gray-600">Altura:</span>
                              <span className="text-gray-800 font-bold block ml-4">{vs.height}</span>
                           </div>
                           <div className='mb-0.5'>
                              <span className="text-gray-600">Frecuencia Cardíaca:</span>
                              <span className="text-gray-800 font-bold block ml-4">{vs.heartRate}</span>
                           </div>
                           <div className='mb-0.5'>
                              <span className="text-gray-600">Temperatura:</span>
                              <span className="text-gray-800 font-bold block ml-4">{vs.temperature}</span>
                           </div>
                           <div className='mb-0.5'>
                              <span className="text-gray-600">Frecuencia Respiratoria:</span>
                              <span className="text-gray-800 font-bold block ml-4">{vs.respirationRate}</span>
                           </div>
                        </div>
                     )
                  })}
               </div>
            }

         </div>
      </div>
   )
}


const VitalSignsForm = ({ userInfo, path }) => {
   const [bloodPressure, setBloodPressure] = useState("")
   const [weight, setWeight] = useState("")
   const [height, setHeight] = useState("")
   const [heartRate, setHeartRate] = useState("")
   const [temperature, setTemperature] = useState("")
   const [respiratoryRate, setRespiratoryRate] = useState("")
   const { token, email } = useContextApp();
   const router = useRouter();

   const sendData = async (e) => {
      // e.preventDefault();

      const object = {
         id: userInfo.split("-")[0],
         bloodPressure: bloodPressure,
         weight: weight,
         height: height,
         heartRate: heartRate,
         temperature: temperature,
         respiratoryRate: respiratoryRate
      }

      console.log(object)

      try {
         const response = await fetch("http://localhost:8080/api/vitalsigns/save", {
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
                  Nuevos Signos vitales
                  <span className="text-gray-700 font-normal text-sm">
                     {/* {emailUser} */}
                  </span>
               </DialogTitle>
            </DialogHeader>
         </div>
         <div className="flex flex-col gap-6 mt-4">
            <div className="flex flex-col gap-4">
               <div className="w-full">
                  <Label className={`mb-2`} htmlFor="bloodPressure">Presion Arterial</Label>
                  <Input
                     className={`block w-full`}
                     id="bloodPressure"
                     type="text"
                     placeholder=""
                     value={bloodPressure}
                     onChange={(e) => setBloodPressure(e.target.value)}
                     required
                  />
               </div>
               <div className="w-full">
                  <Label className={`mb-2`} htmlFor="weight">Peso</Label>
                  <Input
                     className={`block w-full`}
                     id="weight"
                     type="text"
                     placeholder=""
                     value={weight}
                     onChange={(e) => setWeight(e.target.value)}
                     required
                  />
               </div>
               <div className="w-full">
                  <Label className={`mb-2`} htmlFor="height">Altura</Label>
                  <Input
                     className={`block w-full`}
                     id="height"
                     type="text"
                     placeholder=""
                     value={height}
                     onChange={(e) => setHeight(e.target.value)}
                     required
                  />
               </div>
               <div className="w-full">
                  <Label className={`mb-2`} htmlFor="heartRate">Frecuencia cardiaca</Label>
                  <Input
                     className={`block w-full`}
                     id="heartRate"
                     type="text"
                     placeholder=""
                     value={heartRate}
                     onChange={(e) => setHeartRate(e.target.value)}
                     required
                  />
               </div>
               <div className="w-full">
                  <Label className={`mb-2`} htmlFor="temperature">Temperatura</Label>
                  <Input
                     className={`block w-full`}
                     id="temperature"
                     type="text"
                     placeholder=""
                     value={temperature}
                     onChange={(e) => setTemperature(e.target.value)}
                     required
                  />
               </div>
               <div className="w-full">
                  <Label className={`mb-2`} htmlFor="respiratoryRate">Frecuencia respiratoria </Label>
                  <Input
                     className={`block w-full`}
                     id="respiratoryRate"
                     type="text"
                     placeholder=""
                     value={respiratoryRate}
                     onChange={(e) => setRespiratoryRate(e.target.value)}
                     required
                  />
               </div>
               <div className="w-full">
                  <Button
                     className={`bg-gray-900 cursor-pointer text-white hover:bg-gray-800 w-full`}
                     type="submit"
                  >Guardar</Button>
               </div>
            </div>
         </div>
      </form>
   )
}