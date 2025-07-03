"use client"

import { Button } from "@/components/ui/button"
import { Badge, Calendar, FileText, Hash, Plus, User } from "lucide-react"
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
import React, { useEffect, useState } from "react"
import { useContextApp } from "@/context/ContextApp"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import ExpedientComponent from "@/components/ExpedientComponent"

export default function Home({ params }) {
   const [data, setData] = useState([])
   const [loading, setLoading] = useState(true)
   const { token } = useContextApp();
   const router = useRouter();

   const { id } = React.use(params);

   const getData = async () => {
      try {
         const response = await fetch(`http://localhost:8080/expedient/${id}`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
               "Authorization": `Bearer ${token}`
            }
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
      <ExpedientComponent loading={loading} data={data} id={id} />
   )
}
