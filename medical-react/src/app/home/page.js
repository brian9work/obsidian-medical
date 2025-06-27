"use client"
import Admin from "@/components/panel/admin/Admin";
import Layout from "@/components/panel/admin/Layout";
import User from "@/components/panel/user/User";
import { useContextApp } from "@/context/ContextApp";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function Home() {
   const { role } = useContextApp();
   const router = useRouter();

   if (role === "ADMIN") {
      return (
         <div>
            <Admin />
         </div>
      )
   }

   return (
         <User />
   )
}