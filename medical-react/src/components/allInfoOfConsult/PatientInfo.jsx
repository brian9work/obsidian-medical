import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import User from '../panel/user/User'
import { Calendar, Mail } from 'lucide-react'

export default function PatientInfo({ expedient }) {
	return (
		<Card className="bg-white border-l-4 border-l-blue-500">
			<CardHeader className="">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<div className="flex items-center gap-4">
						<div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
							<User className="h-8 w-8 text-blue-600" />
						</div>
						<div>
							<CardTitle className="text-2xl text-gray-900">
								{expedient.fullName}
							</CardTitle>
							<CardDescription className="text-base">
								Expediente #{expedient.id} • {expedient.age} años •{" "}
								{expedient.gender}
							</CardDescription>
						</div>
					</div>
					<div className="flex flex-col gap-2 text-sm text-gray-600">
						<div className="flex items-center gap-2">
							<Calendar className="h-4 w-4" />
							<span>Nacimiento: {expedient.birthdate}</span>
						</div>
						<div className="flex items-center gap-2">
							<Mail className="h-4 w-4" />
							{/* <span>{consultationUser.email}</span> */}
						</div>
					</div>
				</div>
			</CardHeader>
		</Card>
	)
}
