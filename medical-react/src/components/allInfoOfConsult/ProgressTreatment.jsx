import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Activity } from 'lucide-react'

export default function ProgressTreatment({ progress }) {
    return (
        <div className='bg-white shadow-lg rounded-lg p-4'>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-indigo-600" />
                        Progreso del Tratamiento
                    </CardTitle>
                    <CardDescription>Seguimiento detallado de la evolución del paciente</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {progress && progress.length > 0 ? (
                            progress.map((item, index) => (
                                <div key={index} className="p-4 border rounded-md bg-gray-50">
                                    <p className="text-sm text-gray-700">{item.date}</p>
                                    <p className="mt-2 text-gray-900">{item.details}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No hay progreso de tratamiento registrado.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
