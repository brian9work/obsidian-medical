"use client"
import React, { useEffect, useState } from "react"
import { useContextApp } from "@/context/ContextApp"
import { useRouter } from "next/navigation"
import ExpedientComponent from "@/components/ExpedientComponent"

export default function page() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const { token, email } = useContextApp();
    const router = useRouter();

    const { id } = 1;

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
                    email: email
                })
            })
            console.log("Response status:", response)
            if (!response.ok) {
                console.error("Failed to fetch data:", response.statusText)
            }
            //  console.log("Response status:", response.status)
            //  console.log("Response status:", response.status)
            //  const resultText = await response.text()
            //  console.log("Data fetched successfully:", resultText)
            const result = await response.json()
            console.log("Data fetched successfully:", result)
            setData(result)
            setLoading(false)
            //  console.log("Data fetched successfully:", result)

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
            <ExpedientComponent 
                loading={loading} 
                data={data} 
                id={data.id} 
            />
        </div>
    )
}
