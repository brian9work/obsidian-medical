"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Regex } from "@/constants/Regex";
import Api from "@/constants/Service";
import { useContextApp } from "@/context/ContextApp";
import { Stethoscope } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
   const router = useRouter();
   const { setTokenLocalStorage, setRoleLocalStorage, setEmailLocalStorage  } = useContextApp();
   const [user, setUser] = useState("user123")
   const [email, setEmail] = useState("michl521521@gmail.com")
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
      if (!Regex.email.regex.test(email)) {
         alert("Por favor, ingresa un correo electrónico válido.");
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
         email: email,
         password: password
      };

      console.log("Datos a enviar:", object);
      try {
         const response = await fetch("http://localhost:8080/auth/logup", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
               "Access-Control-Allow-Headers": "Content-Type, Authorization"

            },
            body: JSON.stringify(object)
         })
         const data = await response.json()
         console.log("Respuesta del servidor:", data);
         setTokenLocalStorage(data.token);
         setEmailLocalStorage(email);
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
                     <Label htmlFor="email">Correo Electrónico</Label>
                     <Input
                        id="email"
                        type="email"
                        placeholder="doctor@hospital.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                     disabled={isLoading}
                  >
                     {isLoading ? "Registrando..." : "Registrar Usuario"}
                  </Button>
               </form>
            </CardContent>
         </Card>
      </div>
   )
}