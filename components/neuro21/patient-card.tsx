"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, MessageSquare } from "lucide-react"

interface PatientCardProps {
  patient: {
    id: string
    name: string
    lastSession: string
    totalSessions: number
    progress: "Excellent" | "Good" | "Fair" | "Needs Attention"
    nextAppointment?: string
    condition?: string
  }
  onViewNotes?: (patientId: string) => void
  onSendMessage?: (patientId: string) => void
}

export function PatientCard({ patient, onViewNotes, onSendMessage }: PatientCardProps) {
  const getProgressColor = (progress: string) => {
    switch (progress) {
      case "Excellent":
        return "bg-green-500/20 text-green-400 border-green-500"
      case "Good":
        return "bg-blue-500/20 text-blue-400 border-blue-500"
      case "Fair":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500"
      default:
        return "bg-red-500/20 text-red-400 border-red-500"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="neuro21-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-gray-900 font-medium text-lg">{getInitials(patient.name)}</span>
          </div>
          <div className="flex-1">
            <CardTitle className="text-white text-lg">{patient.name}</CardTitle>
            <div className="text-sm neuro21-secondary-text">
              {patient.totalSessions} sessions • Last: {new Date(patient.lastSession).toLocaleDateString()}
            </div>
            {patient.condition && <div className="text-xs neuro21-secondary-text mt-1">{patient.condition}</div>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge className={getProgressColor(patient.progress)}>{patient.progress}</Badge>
            {patient.nextAppointment && (
              <div className="flex items-center gap-1 text-xs neuro21-secondary-text">
                <Calendar className="w-3 h-3" />
                {new Date(patient.nextAppointment).toLocaleDateString()}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewNotes?.(patient.id)}
              className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
            >
              <FileText className="w-3 h-3 mr-1" />
              Notes
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSendMessage?.(patient.id)}
              className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
            >
              <MessageSquare className="w-3 h-3 mr-1" />
              Message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
