import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Activity, Heart, Ruler, Thermometer, Weight } from 'lucide-react'
import { Badge } from '../ui/badge'

export default function VitalSigns({ vitalSigns }) {
   return (
      <div className='bg-white'>
         <Card className={"gap-0"}>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  Signos Vitales
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                     <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Presión Arterial</span>
                     </div>
                     <Badge variant="outline">{vitalSigns.bloodPressure}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                     <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Frecuencia Cardíaca</span>
                     </div>
                     <Badge variant="outline">{vitalSigns.heartRate}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                     <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Temperatura</span>
                     </div>
                     <Badge variant="outline">{vitalSigns.temperature}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                     <div className="flex items-center gap-2">
                        <Weight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Peso</span>
                     </div>
                     <Badge variant="outline">{vitalSigns.weight}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                     <div className="flex items-center gap-2">
                        <Ruler className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Altura</span>
                     </div>
                     <Badge variant="outline">{vitalSigns.height}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                     <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Freq. Respiratoria</span>
                     </div>
                     <Badge variant="outline">{vitalSigns.respiratoryRate}</Badge>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   )
}
