import React from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useContextApp } from '@/context/ContextApp'

export default function AddProgressTreatment({consultationId}) {
   const [details, setDetails] = React.useState("");
   const { token } = useContextApp();

   const sendDsendTreatmentProgress = async (e) => {
      const d = new Date();
      const date = ` ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

      const object = {
         consultationId: consultationId,
         date: date,
         details: details,
      }
      console.log("Data to send:", object)

      try {
         const response = await fetch("http://localhost:8080/api/treatmentprogress/save", {
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
      <Dialog>
         <DialogTrigger
            className={"bg-gray-900 text-white hover:bg-gray-800 cursor-pointer py-1.5 px-3 rounded-2xl flex items-center"}>
            Agregar signos vitales
         </DialogTrigger>
         <DialogContent className={`bg-white shadow-lg rounded-lg w-11/12 max-w-[1000px]`}>
            <DialogHeader>
               <DialogTitle className='text-2xl font-bold'>Agregar progreso de tratamiento</DialogTitle>
            </DialogHeader>
            <div>
               <form>
                  <div className="w-full">
                     <div>
                        <Label className={`mb-2`} htmlFor="details">Escriba su progreso</Label>
                        <Textarea
                        className="w-full h-32"
                           id="details"
                           placeholder=""
                           value={details}
                           onChange={(e) => setDetails(e.target.value)}
                           required
                        />
                     </div>
                     <div>
                        <Button
                           className="w-full bg-gray-900 text-white hover:bg-gray-800 mt-2 cursor-pointer"
                           onClick={(e) => {
                              sendDsendTreatmentProgress(e)
                              setDetails("") // Clear the input after submission
                           }
                           }>Agregar Progreso</Button>
                     </div>
                  </div>
               </form>
            </div>
         </DialogContent>
      </Dialog>
   )
}
