"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Apple, Moon, Target } from "lucide-react"
import type { JourneyGoal } from "@/lib/types"

interface GoalCardProps {
  goal: JourneyGoal
  onScoreChange: (score: number) => void
  disabled?: boolean
}

export function GoalCard({ goal, onScoreChange, disabled = false }: GoalCardProps) {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "dumbbell":
        return Dumbbell
      case "apple":
        return Apple
      case "moon":
        return Moon
      default:
        return Target
    }
  }

  const IconComponent = getIconComponent(goal.icon)
  const completionPercentage = (goal.score / goal.maxScore) * 100

  return (
    <Card className="neuro21-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              <IconComponent className="w-6 h-6 neuro21-accent" />
            </div>
            <div>
              <CardTitle className="text-white text-lg">{goal.name}</CardTitle>
              <p className="text-sm neuro21-secondary-text">{goal.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">{goal.score}</div>
            <div className="text-sm neuro21-secondary-text">/ {goal.maxScore}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Slider
            value={[goal.score]}
            onValueChange={(value) => onScoreChange(value[0])}
            max={goal.maxScore}
            step={1}
            className="w-full"
            disabled={disabled}
          />
          <div className="flex justify-between text-xs neuro21-secondary-text">
            <span>0 - Not started</span>
            <span>5 - Halfway</span>
            <span>10 - Perfect</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm neuro21-secondary-text">Progress</span>
          <Badge
            variant={completionPercentage >= 80 ? "default" : "outline"}
            className={completionPercentage >= 80 ? "neuro21-accent-bg text-gray-900" : "border-gray-600 text-gray-300"}
          >
            {completionPercentage.toFixed(0)}%
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
