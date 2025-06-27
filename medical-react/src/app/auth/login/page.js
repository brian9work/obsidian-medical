"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Regex } from "@/constants/Regex";
import { useContextApp } from "@/context/ContextApp";
import { useRouter } from 'next/navigation';
import { Stethoscope } from "lucide-react";

export default function Home() {
   const router = useRouter();
   const { setTokenLocalStorage, setRoleLocalStorage, setEmailLocalStorage } = useContextApp();
   const [user, setUser] = useState("abc")
   const [password, setPassword] = useState("1234567890")
   const [isLoading, setIsLoading] = useState(false)

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      if (!Regex.user.regex.test(user)) {
         alert("Por favor, ingresa un nombre de usuario válido.");
         setIsLoading(false);
         return;
      }
      if (!Regex.password.regex.test(password)) {
         alert("Por favor, ingresa una contraseña válida.");
         setIsLoading(false);
         return;
      }

      const object = {
         username: user,
         password: password
      };

      console.log("Datos a enviar:", object);
      try {
         const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
               "Access-Control-Allow-Headers": "Content-Type, Authorization"
            },
            body: JSON.stringify(object)
         })

         if (!response.ok) {
            alert("Error al iniciar sesión. Por favor, verifica tus credenciales.");
            setIsLoading(false);
         }

         const data = await response.json()

         if (!data || !data.token || !data.role || !data.email) {
            alert("Error al iniciar sesión. Por favor, verifica tus credenciales.");
         }

         setTokenLocalStorage(data.token);
         setRoleLocalStorage(data.role);
         setEmailLocalStorage(data.email);

         setIsLoading(false);
         router.push('/home');

      } catch (error) {
         console.error("Error al enviar los datos:", error);
         setIsLoading(false);
         return;
      }
   }

   return (
      <div className="min-h-screen flex items-center justify-center p-4 ">
         <Card className="w-full max-w-md bg-white shadow-lg border-0 rounded-xl">
            <CardHeader className="text-center">
               <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                     <Stethoscope className="h-8 w-8 text-blue-600" />
                  </div>
               </div>
               <CardTitle className="text-2xl font-bold">Sistema Médico</CardTitle>
               <CardDescription>Ingresa tus credenciales para acceder al sistema</CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="email">Nombre de usuario</Label>
                     <Input
                        id="username"
                        type="text"
                        placeholder="user123"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="password">Contraseña</Label>
                     <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                  </div>
                  <Button
                     type="submit"
                     className="w-full bg-black text-white cursor-pointer mt-5 hover:bg-gray-800 transition-colors"
                  // disabled={isLoading}
                  >
                     {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
               </form>
            </CardContent>
         </Card>
      </div>
   )
}