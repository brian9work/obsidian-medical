import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Calendar, Clock, FileText } from 'lucide-react'

export default function InfoConsult({consultationDate}) {
   return (
      <div className="bg-white ">
         {/* Consultation Information */}
         <Card className={"gap-0"}>
            <CardHeader className={"pb-0"}>
               <CardTitle className="flex items-center gap-2 ">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Información de la Consulta
               </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  <div className="flex items-center gap-2 text-sm">
                     <Calendar className="h-4 w-4 text-gray-500" />
                     <span className="font-medium">Fecha:</span>
                     <span>{consultationDate.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                     <Clock className="h-4 w-4 text-gray-500" />
                     <span className="font-medium">Hora:</span>
                     <span>{consultationDate.hour}</span>
                  </div>
               </div>
               <div>
                  <p className="font-medium text-sm text-gray-700 ">Motivo de consulta:</p>
                  <p className="text-sm text-gray-600">{consultationDate.reason}</p>
               </div>
               <div>
                  <p className="font-medium text-sm text-gray-700 ">Detalles:</p>
                  <p className="text-sm text-gray-600">{consultationDate.details}</p>
               </div>
            </CardContent>
         </Card>
      </div>
   )
}
