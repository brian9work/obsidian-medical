import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Pill, SeparatorHorizontal } from 'lucide-react'
import { Badge } from '../ui/badge'

export default function Treatment({ treatments }) {
   return (
      <div className='bg-white'>
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-green-600" />
                  Tratamientos Prescritos
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               {treatments.map((treatment, index) => (
                  <div key={index} className="border rounded-lg p-3 space-y-2">
                     <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{treatment.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                           {treatment.via}
                        </Badge>
                     </div>
                     <p className="text-xs text-gray-600">{treatment.description}</p>
                     <div className='bg-gray-300 h-0.5 w-full'></div>
                     <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex justify-between">
                           <span>Dosis:</span>
                           <span className="font-medium">{treatment.dose}</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Frecuencia:</span>
                           <span className="font-medium">{treatment.time}</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Inicio:</span>
                           <span className="font-medium">{(treatment.startDate)}</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Fin:</span>
                           <span className="font-medium">{(treatment.endDate)}</span>
                        </div>
                     </div>
                  </div>
               ))}
            </CardContent>
         </Card>
      </div>
   )
}
