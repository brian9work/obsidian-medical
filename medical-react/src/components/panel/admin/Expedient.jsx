"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Regex } from "@/constants/Regex";
import { useContextApp } from "@/context/ContextApp";
import { Select } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import changeImage from "@/utils/home/expedient/nuevo/changeImage";
import validateImage from "@/utils/home/expedient/nuevo/validateImage";
import converterDate from "@/utils/home/expedient/nuevo/converterDate";
import sendImage from "@/utils/home/expedient/nuevo/sendImage";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function Expedient({email}) {
       const [loading, setLoading] = useState(true)
       const { token } = useContextApp();
       const router = useRouter();
    
       const file = useRef(null);
       const [name, setName] = useState("Brian Michel")
       const [lastnamep, setLastnamep] = useState("Hérnandez")
       const [lastnamem, setLastnamem] = useState("García")
       const [birthdate, setBirthdate] = useState("2000-01-01")
       const [gender, setGender] = useState("masculino")
       const [historial, setHistorial] = useState("Apendomiosis, Alergia a la penicilina, Diabetes tipo 2 en la familia")

    
       const sendData = async (e) => {
          e.preventDefault();
          setLoading(true);
          const isValid = validateInputs();
          console.log("Validación de entradas:", isValid);
    
          if (!isValid) {
             setLoading(false);
             return;
          }
    
          if (!validateImage) {
             alert("Por favor, selecciona una imagen válida.");
             setLoading(false);
             return;
          }
    
          const urlImage = await sendImage(file,token);
          if (!urlImage) {
             setLoading(false);
             return;
          }
    
          const object = {
             email: email,
             urlImage: urlImage,
             name: name,
             lastnamep: lastnamep,
             lastnamem: lastnamem,
             birthdate: converterDate(birthdate),
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
    
       const validateInputs = () => {
          const fields = [
             { value: name, rule: Regex.expedient.name, label: "Nombre" },
             { value: lastnamep, rule: Regex.expedient.lastname, label: "Apellido paterno" },
             { value: lastnamem, rule: Regex.expedient.lastname, label: "Apellido materno" },
             { value: birthdate, rule: Regex.expedient.birthdate, label: "Fecha de nacimiento" },
             { value: gender, rule: Regex.expedient.gender, label: "Genero" },
             { value: historial, rule: Regex.expedient.historial, label: "Historial" },
          ];
    
          for (const field of fields) {
             if (!field.rule.regex.test(field.value)) {
                alert(`${field.label}: ${field.rule.message}`);
                return false;
             }
          }
    
          return true;
       };



    return (
        <div className=" mx-auto bg-white rounded-lg">
            <form onSubmit={sendData} encType="multipart/form-data">
                <div>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                            Agregar Expediente Médico a {email}
                        </DialogTitle>
                    </DialogHeader>
                </div>
                <div className="flex flex-col gap-6 mt-4">
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="picture">Picture</Label>
                        <Input
                            className={`w-full`}
                            id="picture"
                            type="file"
                            accept="image/*"
                            ref={file}
                            onChange={(e) => changeImage(e, file)}
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
                                    <SelectItem value="otro">Otro</SelectItem>
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
