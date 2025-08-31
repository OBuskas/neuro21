"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Star, Video, FileText, CheckCircle } from "lucide-react"

interface SessionCardProps {
  session: {
    id: string
    time: string
    patient: string
    type: "free" | "paid"
    status: "completed" | "upcoming" | "in-progress"
    rating?: number
    notes: string
    duration?: number
  }
  onJoinSession?: (sessionId: string) => void
  onViewNotes?: (sessionId: string) => void
}

export function SessionCard({ session, onJoinSession, onViewNotes }: SessionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 border-green-500/30"
      case "in-progress":
        return "bg-yellow-500/10 border-yellow-500/30"
      default:
        return "bg-gray-700/50 border-gray-600"
    }
  }

  return (
    <Card className={`neuro21-card ${getStatusColor(session.status)}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-white font-medium">{session.time}</div>
              <div className="text-xs neuro21-secondary-text">{session.duration || 45} min</div>
            </div>
            <div>
              <CardTitle className="text-white text-lg">{session.patient}</CardTitle>
              <p className="text-sm neuro21-secondary-text">{session.notes}</p>
            </div>
          </div>
          <Badge
            className={
              session.type === "free"
                ? "bg-green-500/20 text-green-400 border-green-500"
                : "neuro21-accent-bg text-gray-900"
            }
          >
            {session.type === "free" ? "Free" : "Paid"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {session.status === "completed" && session.rating && (
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < session.rating! ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                  />
                ))}
              </div>
            )}
            {session.status === "completed" && <CheckCircle className="w-4 h-4 text-green-400" />}
            {session.status === "in-progress" && <Clock className="w-4 h-4 text-yellow-400" />}
          </div>
          <div className="flex gap-2">
            {session.status === "upcoming" && (
              <Button
                size="sm"
                onClick={() => onJoinSession?.(session.id)}
                className="neuro21-accent-bg hover:bg-yellow-500 text-gray-900"
              >
                <Video className="w-3 h-3 mr-1" />
                Join
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewNotes?.(session.id)}
              className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
            >
              <FileText className="w-3 h-3 mr-1" />
              Notes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
