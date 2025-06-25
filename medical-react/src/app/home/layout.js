"use client";
import { useContextApp } from "@/context/ContextApp";
import "../globals.css";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
   const router = useRouter();
   const { setTokenLocalStorage, setRoleLocalStorage, setEmailLocalStorage } = useContextApp();

   const getTokenFromLocalStorage = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      if (
         !token || token === "null"
         || !email || email === "null"
      ) {
         console.warn("No token or email found in localStorage.");
         router.push('/auth/login');
         return;
      }

      try {
         const response = await fetch("http://localhost:8080/welcome", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
               email: email,
               token: token
            })
         })

         if (!response.ok) {
            console.error("Failed to fetch role from server:", response.statusText);

            localStorage.setItem("token", null);
            localStorage.setItem("email", null);
            router.push('/auth/login');

            return

         }

         const data = await response.text();

         if (!data || data === "null") {
            console.error("No role data received from server.");
            // router.push('/auth/login');
            // localStorage.setItem("token", null);
            // localStorage.setItem("email", null);
            return;
         }

         setTokenLocalStorage(token);
         setEmailLocalStorage(email);
         setRoleLocalStorage(data);

      } catch (error) {
         console.error("Error retrieving token or email from localStorage:", error);
         router.push('/auth/login');
         return;

      }
   }

   useEffect(() => {
      getTokenFromLocalStorage();

   }, []);

   return (
      <div className="relative">
         <div>
            {children}
         </div>
      </div>
   );
}
