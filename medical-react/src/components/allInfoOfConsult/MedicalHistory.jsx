import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { FileText } from 'lucide-react'

export default function MedicalHistory({ expedient }) {
   return (
      <div className='bg-white'>
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-600" />
                  Historial Médico
               </CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-gray-600">{expedient.historial}</p>
            </CardContent>
         </Card>

      </div>
   )
}
