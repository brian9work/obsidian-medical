import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useContextApp } from '@/context/ContextApp';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Expedient({ userInfo }) {
   const [data, setData] = useState([])
   const [loading, setLoading] = useState(true)
   const { token } = useContextApp();
   const router = useRouter();

   const [symptoms, setSymptoms ] = useState("")   
   const [diagnosis, setDiagnosis ] = useState("")
   const [indications, setIndications ] = useState("")
   const [references, setReferences ] = useState("")

   console.log("Info User:", userInfo)

   const getData = async () => {
      try {
         const response = await fetch(`http://localhost:8080/expedient/getexpedient`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
               email: userInfo.split("-")[1],
            })
         })
         if (!response.ok) {
            console.log("No data since the expedient")
            // router.push('/auth/login')
            // throw new Error("Network response was not ok")
         }
         const result = await response.json()
         setData(result)
         console.log("Data fetched:", result)
         setLoading(false)
      }
      catch (error) {
         console.error("Error fetching data:", error)
      }
   }

   const sendData = async (e) => {
      e.preventDefault()
   }

   useEffect(() => {
      getData()
   }, [])
   return (
      <div>
         <div>
            <h1 className="text-3xl font-bold">Consulta médica</h1>
            <p className="text-muted-foreground"></p>
         </div>
         <div className='mt-4'>
            {loading ? (
               <p>Cargando expediente ...</p>
            ) : (
               <div className="bg-white p-4 rounded-lg shadow-md w-11/12 mx-auto">
                  <p>Nombre: <b>{data.fullName}</b> </p>
                  <p>Edad: <b>{data.age}</b> </p>
                  <p>Historial: <b>{data.historial}</b> </p>
               </div>
            )}
         </div>
      </div>
   )
}

