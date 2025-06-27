"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useContextApp } from "@/context/ContextApp";
import { Select } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
   const [data, setData] = useState([])
   const [loading, setLoading] = useState(true)
   const { token, email } = useContextApp();
   const router = useRouter();

   const [file, setFile] = useState("1")
   const [name, setName] = useState("2")
   const [lastnamep, setLastnamep] = useState("3")
   const [lastnamem, setLastnamem] = useState("4")
   const [birthdate, setBirthdate] = useState("2003-01-01")
   const [gender, setGender] = useState("indefinido")
   const [historial, setHistorial] = useState("6")


   function convertirFecha(fecha) {
      const [año, mes, dia] = fecha.split("-");
      return `${dia}-${mes}-${año}`;
   }

   const sendImage = async () => {
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:8080/expedient/image", {
         method: "POST",
         headers: {
            "Authorization": `Bearer ${token}`
         },
         body: formData,
      });

      const text = await res.text();
      return text;
   }

   const sendData = async (e) => {
      e.preventDefault();
      setLoading(true);

      const urlImage = await sendImage();
      if (!urlImage) {
         alert("Error al subir la imagen. Por favor, intenta nuevamente.");
         setLoading(false);
         return;
      }

      const object = {
         email: email,
         urlImage: urlImage,
         name: name,
         lastnamep: lastnamep,
         lastnamem: lastnamem,
         birthdate: convertirFecha(birthdate),
         gender: gender,
         historial: historial,
      }

      console.log("Datos a enviar:", object);

      try {
         const response = await fetch("http://localhost:8080/expedient/save", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(object)
         })

         if (!response.ok) {
            console.error("Network response was not ok:", response.statusText);
            alert("Error al agregar el expediente. Por favor, verifica los datos ingresados.");
            setLoading(false);
            return;
         }

         const result = await response.text()
         alert(result)
         setLoading(false)
         router.push('/home/expedientes')
      }
      catch (error) {
         console.error("Error fetching data:", error)
      }
   }

   return (
      <div className="shadow-xl p-7">
         <form onSubmit={sendData} encType="multipart/form-data">
            {/* <form onSubmit={sendData} encType="multipart/form-data"> */}
            <div>
               <h2 className="font-bold text-2xl">Agregar expediente</h2>
            </div>
            <div className="flex flex-col gap-6 mt-4">
               <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="picture">Picture</Label>
                  <Input
                     id="picture"
                     type="file"
                     accept="image/*"
                     onChange={(e) => setFile(e.target.files[0])}
                     required
                  />
               </div>
               <div className="flex flex-row gap-4">
                  <div className="w-[40%]">
                     <Label className={`mb-2`} htmlFor="nombre">Nombre</Label>
                     <Input
                        id="nombre"
                        type="text"
                        placeholder=""
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                     />
                  </div>
                  <div className="w-[30%]">
                     <Label className={`mb-2`} htmlFor="lastnameP">Apellido paterno</Label>
                     <Input
                        id="lastnameP"
                        type="text"
                        placeholder=""
                        required
                        value={lastnamep}
                        onChange={(e) => setLastnamep(e.target.value)}
                     />
                  </div>
                  <div className="w-[30%]">
                     <Label className={`mb-2`} htmlFor="lastnamem">Apellido materno</Label>
                     <Input
                        id="lastnamem"
                        type="text"
                        placeholder=""
                        required
                        value={lastnamem}
                        onChange={(e) => setLastnamem(e.target.value)}
                     />
                  </div>
               </div>
               <div className="flex flex-row gap-4">
                  <div className="w-[50%]">
                     <Label className={`mb-2`} htmlFor="birthdate">Fecha de nacimiento</Label>
                     <Input
                        id="birthdate"
                        type="date"
                        placeholder=""
                        required
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                     />
                  </div>
                  <div className="w-[50%]">
                     <Label className={`mb-2`} htmlFor="username">Genero</Label>
                     <Select className="bg-white" onValueChange={(value) => setGender(value)} value={gender}>
                        <SelectTrigger className="w-full">
                           <SelectValue placeholder="Genero" />
                        </SelectTrigger>
                        <SelectContent className={`bg-white`}>
                           <SelectItem value="masculino">Masculino</SelectItem>
                           <SelectItem value="femenino">Femenino</SelectItem>
                           <SelectItem value="indefinido">Prefiero no decirlo</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>
               <div className="flex flex-row gap-4">
                  <div className="grid w-full gap-3">
                     <Label htmlFor="historial">Antecedentes médicos</Label>
                     <Textarea
                        placeholder="Antecedentes médicos."
                        id="message"
                        value={historial}
                        onChange={(e) => setHistorial(e.target.value)}
                     />
                     <p className="text-sm -mt-3">Enfermedades previas, cirugias, alergias y enfermedades familiares</p>
                  </div>
               </div>
            </div>
            <div className="flex justify-end ">
               <Button
                  type="submit"
                  className={"w-[300px] cursor-pointer mt-5 py-2 bg-gray-900 text-white hover:bg-gray-800"}
               >
                  {loading ? "Agregar Expediente" : "Agregando..."}
               </Button>
            </div>
         </form>
      </div>
   )
}