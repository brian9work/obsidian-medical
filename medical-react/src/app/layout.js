"use client"
import "./globals.css";
import { ContextAppProvider } from "@/context/ContextApp";
import { useRouter } from "next/navigation";
import {  useEffect } from "react";


export default function RootLayout({ children }) {
   const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token found in localStorage:", token);
    } else {
      console.log("No token found in localStorage.");
      localStorage.setItem("token", null);
    }
      // router.push('/auth/login');
  }, []);

  return (
    <html lang="en">
      <body
        className={`bg-gray-100`}
      >
        <ContextAppProvider>
          {children}
        </ContextAppProvider>
      </body>
    </html>
  );
}
