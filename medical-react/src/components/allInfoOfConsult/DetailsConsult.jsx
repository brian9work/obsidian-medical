import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Stethoscope } from 'lucide-react'

export default function DetailsConsult({ consultation }) {
   return (
      <div className='bg-white'>
               <Card className={"gap-0"}>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-purple-600" />
                  Detalles de la Consulta
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Síntomas</h4>
                  <p className="text-sm text-gray-600 bg-red-50 p-3 rounded-lg border-l-4 border-red-200">
                     {consultation.symptoms}
                  </p>
               </div>
               <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Diagnóstico</h4>
                  <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-200">
                     {consultation.diagnosis}
                  </p>
               </div>
               <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Indicaciones</h4>
                  <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg border-l-4 border-green-200">
                     {consultation.indications}
                  </p>
               </div>
               <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Referencias</h4>
                  <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-200">
                     {consultation.referencesText}
                  </p>
               </div>
            </CardContent>
         </Card>
      </div>
   )
}
