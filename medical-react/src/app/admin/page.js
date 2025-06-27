"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import React from "react"
import { Button } from "@/components/ui/button"

export default function Home() {
   return (
      <div>
         <div className="bg-gray-50 shadow-md p-5 rounded-xl w-[800px] mx-auto mt-10">
            <div>
               <h1 className="text-2xl font-bold mb-4">Expediente Médico</h1>
               <Dialog>
                  <DialogTrigger asChild>
                     <Button className="bg-gray-900 text-white hover:bg-gray-800 mb-4">Agregar Cita</Button>
                  </DialogTrigger>
                  <DialogContent className={`bg-white`}>
                     <DialogHeader>
                        <DialogTitle>Desea agregar una nueva cita?</DialogTitle>
                        <div className="w-full mt-10">
                           <Label className={`mb-2`} htmlFor="username">Fecha de nacimiento</Label>
                           <Input
                              id="username"
                              type="date"
                              placeholder=""
                              required
                           />
                        </div>
                        <Button className="bg-gray-900 text-white hover:bg-gray-800 mt-2 mb-4 cursor-pointer">Agregar Cita</Button>
                     </DialogHeader>
                  </DialogContent>
               </Dialog>
               <Button className="bg-gray-900 text-white hover:bg-gray-800 mb-4">Nuevo expediente</Button>
            </div>
            <Form />
         </div>
      </div>

   )

}



const TableComponent = () => {
   return (
      <div>
         <div className="bg-gray-50 shadow-md p-5 rounded-xl w-[800px] mx-auto mt-10">
            <Table>
               <TableCaption>A list of your recent invoices.</TableCaption>
               <TableHeader>
                  <TableRow>
                     <TableHead>Id</TableHead>
                     <TableHead>Nombre completo</TableHead>
                     <TableHead>Fecha de nacimiento</TableHead>
                     <TableHead>Edad</TableHead>
                     <TableHead>Genero</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  <TableRow>
                     <TableCell className="font-medium">INV001</TableCell>
                     <TableCell>Paid</TableCell>
                     <TableCell>Credit Card</TableCell>
                     <TableCell>$250.00</TableCell>
                     <TableCell>$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell className="font-medium">INV001</TableCell>
                     <TableCell>Paid</TableCell>
                     <TableCell>Credit Card</TableCell>
                     <TableCell>$250.00</TableCell>
                     <TableCell>$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell className="font-medium">INV001</TableCell>
                     <TableCell>Paid</TableCell>
                     <TableCell>Credit Card</TableCell>
                     <TableCell>$250.00</TableCell>
                     <TableCell>$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell className="font-medium">INV001</TableCell>
                     <TableCell>Paid</TableCell>
                     <TableCell>Credit Card</TableCell>
                     <TableCell>$250.00</TableCell>
                     <TableCell>$250.00</TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </div>
      </div>
   )
}

const Form = () => {
   return (
      <form>
         <div>
            <h2>Agregar expediente</h2>
         </div>
         <div className="flex flex-col gap-6 mt-4">
            <div className="grid w-full max-w-sm items-center gap-3">
               <Label htmlFor="picture">Picture</Label>
               <Input id="picture" type="file" />
            </div>
            <div className="flex flex-row gap-4">
               <div className="w-[40%]">
                  <Label className={`mb-2`} htmlFor="username">Nombre</Label>
                  <Input
                     id="username"
                     type="text"
                     placeholder=""
                     required
                  />
               </div>
               <div className="w-[30%]">
                  <Label className={`mb-2`} htmlFor="username">Apellido paterno</Label>
                  <Input
                     id="username"
                     type="text"
                     placeholder=""
                     required
                  />
               </div>
               <div className="w-[30%]">
                  <Label className={`mb-2`} htmlFor="username">Apellido materno</Label>
                  <Input
                     id="username"
                     type="text"
                     placeholder=""
                     required
                  />
               </div>
            </div>
            <div className="flex flex-row gap-4">
               <div className="w-[40%]">
                  <Label className={`mb-2`} htmlFor="username">Fecha de nacimiento</Label>
                  <Input
                     id="username"
                     type="date"
                     placeholder=""
                     required
                  />
               </div>
               <div className="w-[20%]">
                  <Label className={`mb-2`} htmlFor="username">Edad</Label>
                  <Input
                     id="username"
                     type="number"
                     placeholder=""
                     required
                  />
               </div>
               <div className="w-[40%]">
                  <Label className={`mb-2`} htmlFor="username">Genero</Label>
                  <Select className="bg-white">
                     <SelectTrigger className="w-full">
                        <SelectValue placeholder="Genero" />
                     </SelectTrigger>
                     <SelectContent className={`bg-white`}>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="femenino">Femenino</SelectItem>
                        <SelectItem value="nose">Prefiero no decirlo</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
            </div>
            <div className="flex flex-row gap-4">
               <div className="grid w-full gap-3">
                  <Label htmlFor="message">Antecedentes medicos</Label>
                  <Textarea placeholder="Type your message here." id="message" />
                  <p className="text-sm -mt-3">Enfermedades previas, cirugias, alergias y enfermedades familiares</p>
               </div>
            </div>
         </div>
      </form>
   )
}