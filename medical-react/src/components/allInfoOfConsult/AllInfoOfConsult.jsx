"use client"
import { useContextApp } from '@/context/ContextApp';
import React, { useEffect, useState } from 'react'
import PatientInfo from './PatientInfo';
import InfoConsult from './InfoConsult';
import MedicalHistory from './MedicalHistory';
import DetailsConsult from './DetailsConsult';
import VitalSigns from './VitalSigns';
import Treatment from './Treatment';

export default function AllInfoOfConsult({idDate}) {
   const [data, setData] = useState()
   const [loading, setLoading] = useState(true)
   const { token, email } = useContextApp();
  //  const router = useRouter();

   const getData = async () => {
    console.log(`route: http://localhost:8080/api/consulta/${idDate}`)
      try {
         const response = await fetch(
            `http://localhost:8080/api/consulta/${idDate}`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                  // "Authorization": `Bearer ${token}`
               },
            })
         if (!response.ok) {
            // router.push('/auth/login')
            console.log("No data")
            // throw new Error("Network response was not ok")
         }
         const result = await response.json()
         console.log(" +++++++++++++++ ")
         console.log("Data fetched:", result)
         setData(result)
         console.log("Data parsed:", data)
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
      {
        loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mx-auto max-w-6xl space-y-6">
            <PatientInfo expedient={data.expedient} />
            <InfoConsult consultationDate={data.consultationDate} />
            <MedicalHistory expedient={data.expedient} />
            <DetailsConsult consultation={data.consultation} />
            <VitalSigns vitalSigns={data.vitalSigns} />
            <Treatment treatments={data.treatments} />
          </div>
        )
      }
    </div>
  )
}
