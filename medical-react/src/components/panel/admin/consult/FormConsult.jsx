import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useContextApp } from '@/context/ContextApp'
import React, { useState } from 'react'

export default function FormConsult({ userInfo, path, vitalSignsMoreRecent }) {
   const [symptoms, setSymptoms] = useState("symptoms")
   const [diagnosis, setDiagnosis] = useState("diagnosis")
   const [indications, setIndications] = useState("indications")
   const [references, setReferences] = useState("references")
   const [treatament, setTreatment] = useState([])
   const { token, email } = useContextApp();

   const sendData = async (e) => {
      e.preventDefault()

      const object = {
         idUser: userInfo.split("-")[0],
         idVitalSigns: vitalSignsMoreRecent,
         idConsultationDate: path,
         symptoms: symptoms,
         diagnosis: diagnosis,
         indications: indications,
         referencesText: references,
         treatment: treatament,
      }
      console.log("Data to send:", object)

      try {
         const response = await fetch("http://localhost:8080/api/consulta/save", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(object)
         })

         if (!response.ok) {
            console.error("Network response was not ok:", response.statusText);
            const result = await response.text()
            alert(result);
            return;
         }

         const result = await response.text()
         alert(result)
      }
      catch (error) {
         console.error("Error fetching data:", error)
      }
   }

   return (
      <div className='mt-5 bg-white p-4 rounded-lg shadow-md w-11/12 mx-auto'>
         <form onSubmit={sendData} encType="multipart/form-data">
            <div>
               <h2 className='font-bold text-xl'>Complete el formulario </h2>
            </div>
            <div className="flex flex-col gap-6 mt-4">
               <div className="flex flex-col gap-4">
                  <div className="w-full">
                     <Label className={`mb-2`} htmlFor="symptoms">Sintomas * </Label>
                     <Textarea
                        placeholder="Escribe los sintomas del paciente"
                        id="symptoms"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                     />
                  </div>
                  <div className="w-full">
                     <Label className={`mb-2`} htmlFor="diagnosis">Diagnostico * </Label>
                     <Textarea
                        placeholder="Escribe el diagnostico del paciente"
                        id="diagnosis"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                     />
                  </div>
                  <div className="w-full">
                     <Label className={`mb-2`} htmlFor="indications">Indicaciones * </Label>
                     <Textarea
                        placeholder="Escribe las indicaciones del paciente"
                        id="indications"
                        value={indications}
                        onChange={(e) => setIndications(e.target.value)}
                     />
                  </div>
                  <div className="w-full">
                     <Label className={`mb-2`} htmlFor="references">Referencias </Label>
                     <Textarea
                        placeholder="Escribe las referencias de otro medico"
                        id="references"
                        value={references}
                        onChange={(e) => setReferences(e.target.value)}
                     />
                  </div>
               </div>
            </div>

            <div className='mt-5'>
               <p>Agregar el medicamento</p>
               <Dialog>
                  <DialogTrigger
                     className={"bg-gray-900 text-white hover:bg-gray-800 cursor-pointer py-1.5 px-3 rounded-2xl flex items-center"}>
                     Agregar signos vitales
                  </DialogTrigger>
                  <DialogContent className={`bg-white shadow-lg rounded-lg w-11/12 max-w-[1000px]`}>
                     <Tratment setTreatment={setTreatment} treatament={treatament} />
                  </DialogContent>
               </Dialog>
               <div>
                  {treatament.map((tr, i) => {
                     return (
                        <div key={"treatment-" + tr.i} className='flex flex-col gap-x-2 text-sm bg-gray-100 mt-5 py-2 px-3 rounded-lg'>
                           <div className='flex items-center'>
                              <span className="text-gray-800 font-bold">{tr.name}</span>
                           </div>
                           <div className='ml-1'>
                              <span className="text-gray-600 font-bold block ">{tr.description}</span>
                              <p className="line-clamp-5 text-gray-800">Dosis: {tr.dose}, Hora: {tr.time}, Vía: {tr.via}</p>
                              <p>Desde {tr.startDate} hasta {tr.endDate}</p>
                           </div>
                        </div>
                     )
                  })}
               </div>
            </div>

            <div className='mt-5'>
               <Button
                  onClick={(e) => sendData(e)}
                  type='submit'
                  className='block w-full bg-gray-900 text-white hover:bg-gray-800 cursor-pointer rounded-2xl'>
                  Guardar consulta
               </Button>
            </div>
         </form>
      </div>
   )
}


const Tratment = ({ setTreatment, treatament }) => {
   const nameMedicament = useState("nameMedicament")
   const descriptionMedicament = useState("descriptionMedicament")
   const dose = useState("dose")
   const time = useState("time")
   const via = useState("via")
   const startTratment = useState("2001-01-01")
   const endTratment = useState("2001-01-01")

   return (
      <div>
         <DialogTitle className='text-2xl font-bold'>Agregar tratamiento</DialogTitle>
         <div className="flex flex-col gap-4 mt-4">
            <div className="w-full">
               <Label className={`mb-1`} htmlFor="nameMedicament">Nombre del medicamento * </Label>
               <Input type="text" id="nameMedicament" required
                  value={nameMedicament[0]}
                  onChange={(e) => nameMedicament[1](e.target.value)}
               />
            </div>
            <div className="w-full">
               <Label className={`mb-1`} htmlFor="descriptionMedicament">Descripción * </Label>
               <Input type="text" id="descriptionMedicament" required
                  value={descriptionMedicament[0]}
                  onChange={(e) => descriptionMedicament[1](e.target.value)}
               />
            </div>
            <div className="w-full">
               <Label className={`mb-1`} htmlFor="dose">Dosis * </Label>
               <Input type="text" id="doce" required
                  value={dose[0]}
                  onChange={(e) => dose[1](e.target.value)}
               />
            </div>
            <div className="w-full">
               <Label className={`mb-1`} htmlFor="time">Hora de toma * </Label>
               <Input type="text" id="time" required placeholder="Cada 8 horas"
                  value={time[0]}
                  onChange={(e) => time[1](e.target.value)}
               />
            </div>
            <div className="w-full">
               <Label className={`mb-1`} htmlFor="via">Vía de administración * </Label>
               <Input type="text" id="via" required placeholder="Oral, intravenosa, etc."
                  value={via[0]}
                  onChange={(e) => via[1](e.target.value)}
               />
            </div>
            <div className='w-full flex flex-row gap-x-3'>
               <div className="w-6/12">
                  <Label className={`mb-1`} htmlFor="startTratment">Inicio del tratamiento * </Label>
                  <Input type="date" id="startTratment" required
                     value={startTratment[0]}
                     onChange={(e) => startTratment[1](e.target.value)}
                  />
               </div>
               <div className="w-6/12">
                  <Label className={`mb-1`} htmlFor="endTratment">Fin del tratamiento * </Label>
                  <Input type="date" id="endTratment" required
                     value={endTratment[0]}
                     onChange={(e) => endTratment[1](e.target.value)}
                  />
               </div>
            </div>
            <Button
               type='button'
               className='bg-gray-900 text-white hover:bg-gray-800 cursor-pointer p-3 rounded-2xl mt-4'
               onClick={() => {
                  alert("Tratamiento agregado correctamente")
                  setTreatment([...treatament, {
                     name: nameMedicament[0],
                     description: descriptionMedicament[0],
                     dose: dose[0],
                     time: time[0],
                     via: via[0],
                     startDate: startTratment[0],
                     endDate: endTratment[0],
                  }])
               }}>
               Agregar tratamiento
            </Button>
         </div>
      </div>
   )
}