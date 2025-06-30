import { Calendar, FileText, Hash, User } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export default function ExpedientComponent({loading, data, id}) {
   if (id === undefined || id === null || id === '') {
      return (
         <div className="flex justify-center items-center h-[200px] flex-col">
            <h3 className="text-2xl font-semibold text-blue-600">Sin expediente aun</h3>
            <p className="text-lg text-gray-600">Consulte a su medico para relizar le uno</p>
         </div>
      )
   }
return (
      <div className="pb-96">
         {loading && (
            <div className="flex justify-center items-center h-screen">
               <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
         )}
         {!loading && !data && (
            <div className="flex justify-center items-center h-screen">
               <h1 className="text-2xl font-bold">No se encontró el expediente médico</h1>
            </div>
         )}
         {!loading && data && (

            <div>
               <div className="mb-2">
                  <div className="flex items-center gap-3 mb-2">
                     <FileText className="h-8 w-8 text-blue-600" />
                     <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Expediente Médico #{id}</h1>
                  </div>
                  <p className="text-gray-600 text-lg">Detalles del expediente médico del paciente: <br /> <b>{data.fullName}</b></p>
               </div>
               <div>
                  <img
                     src={`http://localhost/obsidian-medical/assets/expedientes/${data.urlImage}`}
                     alt="Imagen del paciente"
                     width={1920}
                     height={1080}
                     className="w-64 h-64 rounded-full mt-2 mx-auto object-cover shadow-lg border-2 border-gray-300"
                  />
               </div>
               <div className="lg:col-span-2 mt-5">
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                     <CardHeader className="pb-4">
                        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                           <User className="h-6 w-6 text-blue-600" />
                           Información del Paciente
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {/* Full Name */}
                           <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                 Nombre Completo
                              </label>
                              <div className="flex items-center gap-2">
                                 <Hash className="h-4 w-4 text-gray-400" />
                                 <p className="text-lg font-medium text-gray-900">{data.fullName}</p>
                              </div>
                           </div>

                           {/* Age */}
                           <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Edad</label>
                              <p className="text-lg font-medium text-gray-900">{data.age}</p>
                           </div>

                           {/* Date of Birth */}
                           <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                 Fecha de Nacimiento
                              </label>
                              <div className="flex items-center gap-2">
                                 <Calendar className="h-4 w-4 text-gray-400" />
                                 <p className="text-lg font-medium text-gray-900">{data.birthdate}</p>
                              </div>
                           </div>

                           {/* Gender */}
                           <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Género</label>
                              <p className="text-lg font-medium text-gray-900">{data.gender}</p>
                           </div>
                        </div>

                        {/* Medical History */}
                        <div className="space-y-2">
                           <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                              Historial Médico
                           </label>
                           <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                              <p className="text-lg font-medium text-blue-900">Registro </p>
                              <p className="text-sm text-blue-700 mt-1">{data.historial}</p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         )}
      </div>
   )
}
