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
            if (!response.ok) {
                console.error("Failed to fetch data:", response.statusText)
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
        <div>
            <ExpedientComponent 
                loading={loading} 
                data={data} 
                id={data.id} 
            />
        </div>
    )
}
