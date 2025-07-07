"use client"
import React, { useEffect, useState } from 'react'
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Calendar, Expand } from 'lucide-react'
import VitalSigns from './VitalSigns'
import { Textarea } from '@/components/ui/textarea'
import HistoryOfConsutls from './HistoryOfConsutls'
// import { useRouter } from 'next/router'
import { useContextApp } from '@/context/ContextApp'
import Expedient from './Expedient'
import FormConsult from './FormConsult'

export default function InitConsutls({ id }) {
   const [infoUser, setInfoUser] = useState([])
   const [loading, setLoading] = useState(true)
   const { token, email } = useContextApp();
   const [vitalSignsMoreRecent, setVitalSignsMoreRecent] = useState([])
   // const router = useRouter();

   const getData = async () => {
      try {
         const response = await fetch(
            `http://localhost:8080/api/consultation/getIdUser/${id}`,
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
         const result = await response.text()
         setInfoUser(result)
         setLoading(false)
         // router.push('/home/miscitas')
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
         {loading ?
            <div className='w-full h-[80vh] flex items-center justify-center'>Loading...</div>
            :
            <div className={`w-full flex flex-row gap-x-5`}>
               <div className={`w-3/12`}>
                  <VitalSigns userInfo={infoUser} path={id} setVitalSignsMoreRecent={setVitalSignsMoreRecent} />
               </div>
               <div className={`w-6/12 `}>
                  <Expedient userInfo={infoUser} />
                  <FormConsult userInfo={infoUser} path={id} vitalSignsMoreRecent={vitalSignsMoreRecent} />
               </div>
               <div className={`w-3/12`}>
                  <HistoryOfConsutls userInfo={infoUser} path={id} />
               </div>
            </div>
         }
      </div>
   )
}
