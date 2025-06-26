"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "../globals.css";

export default function RootLayout({ children }) {
   const router = useRouter();

   useEffect(() => {
      // router.push('/auth/login');
   },[])

   return (
      <div className="relative overflow-x-hidden "
         // style={{maxWidth: "100vw", maxHeight: "100vh"}}
      >
         <div>
            {children}
         </div>
      </div>
   );
}
