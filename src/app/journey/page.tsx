"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Navigation } from "@/components/neuro21/navigation"
import { TokenDisplay } from '@/components/neuro21/token-display'
import { Dumbbell, Apple, Moon, TrendingUp, Calendar, Target, Award, Flame, CheckCircle, Clock } from "lucide-react"
import type { JourneyGoal } from "@/lib/types"

// Mock data for demonstration
const mockUser = {
  tokenBalance: 1247,
  plan: "premium" as const,
  tier: 3,
  streak: 7,
}

const initialGoals: JourneyGoal[] = [
  {
    id: "exercise",
    name: "Exercício",
    description: "Physical activity and movement",
    score: 0,
    maxScore: 10,
    icon: "dumbbell",
  },
  {
    id: "nutrition",
    name: "Alimentação",
    description: "Healthy eating and nutrition",
    score: 0,
    maxScore: 10,
    icon: "apple",
  },
  {
    id: "sleep",
    name: "Sono",
    description: "Quality sleep and rest",
    score: 0,
    maxScore: 10,
    icon: "moon",
  },
]

const mockWeeklyProgress = [
  { date: "2024-01-15", tokensEarned: 8, completed: true },
  { date: "2024-01-16", tokensEarned: 10, completed: true },
  { date: "2024-01-17", tokensEarned: 6, completed: true },
  { date: "2024-01-18", tokensEarned: 9, completed: true },
  { date: "2024-01-19", tokensEarned: 10, completed: true },
  { date: "2024-01-20", tokensEarned: 7, completed: true },
  { date: "2024-01-21", tokensEarned: 8, completed: true },
]

export default function JourneyPage() {
  const [goals, setGoals] = useState<JourneyGoal[]>(initialGoals)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [todayCompleted, setTodayCompleted] = useState(false)

  const totalScore = goals.reduce((sum, goal) => sum + goal.score, 0)
  const maxTotalScore = goals.reduce((sum, goal) => sum + goal.maxScore, 0)
  const completionPercentage = (totalScore / maxTotalScore) * 100

  // Calculate potential tokens based on plan
  const baseTokens = 10
  const multiplier = mockUser.plan === "premium" ? 3 : 1
  const potentialTokens = Math.round((totalScore / maxTotalScore) * baseTokens * multiplier)

  const updateGoalScore = (goalId: string, newScore: number) => {
    setGoals((prev) => prev.map((goal) => (goal.id === goalId ? { ...goal, score: newScore } : goal)))
  }

  const submitDailyProgress = async () => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setTodayCompleted(true)
      // In real app, this would update the user's token balance
    } catch (error) {
      console.error("Failed to submit progress:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

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

  return (
    <div className="min-h-screen">
      <Navigation userType="user" tokenBalance={mockUser.tokenBalance} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Your Journey</h1>
              <p className="neuro21-secondary-text">Track your daily goals and earn tokens for your progress</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="neuro21-accent-bg">
                <Flame className="w-4 h-4 mr-1" />
                {mockUser.streak} day streak
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Tier {mockUser.tier}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Goals Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Progress */}
            <Card className="neuro21-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 neuro21-accent" />
                      Today&apos;s Goals
                    </CardTitle>
                    <CardDescription className="neuro21-secondary-text">
                      Score each goal from 0-10 based on your progress today
                    </CardDescription>
                  </div>
                  {todayCompleted && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {goals.map((goal) => {
                  const IconComponent = getIconComponent(goal.icon)
                  return (
                    <div key={goal.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 neuro21-accent" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{goal.name}</h3>
                            <p className="text-sm neuro21-secondary-text">{goal.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">{goal.score}</div>
                          <div className="text-sm neuro21-secondary-text">/ {goal.maxScore}</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Slider
                          value={[goal.score]}
                          onValueChange={(value) => updateGoalScore(goal.id, value[0])}
                          max={goal.maxScore}
                          step={1}
                          className="w-full"
                          disabled={todayCompleted}
                        />
                        <div className="flex justify-between text-xs neuro21-secondary-text">
                          <span>Not started</span>
                          <span>Partially done</span>
                          <span>Fully achieved</span>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Progress Summary */}
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium">Overall Progress</span>
                    <span className="text-white font-bold">{completionPercentage.toFixed(0)}%</span>
                  </div>
                  <Progress value={completionPercentage} className="mb-4" />
                  <div className="flex items-center justify-between">
                    <span className="neuro21-secondary-text">Tokens to earn:</span>
                    <TokenDisplay balance={potentialTokens} className="text-lg" />
                  </div>
                </div>

                {!todayCompleted && (
                  <Button
                    onClick={submitDailyProgress}
                    disabled={isSubmitting || totalScore === 0}
                    className="w-full neuro21-accent-bg hover:bg-yellow-500 text-gray-900 font-semibold"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                        Submitting Progress...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Submit Today&apos;s Progress
                      </div>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Weekly Progress Chart */}
            <Card className="neuro21-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 neuro21-accent" />
                  Weekly Progress
                </CardTitle>
                <CardDescription className="neuro21-secondary-text">
                  Your token earnings over the past 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-2">
                    {mockWeeklyProgress.map((day) => (
                      <div key={day.date} className="text-center">
                        <div className="text-xs neuro21-secondary-text mb-2">
                          {new Date(day.date).toLocaleDateString("en", { weekday: "short" })}
                        </div>
                        <div
                          className={`h-16 rounded-lg flex items-end justify-center p-1 ${
                            day.completed ? "bg-yellow-400/20 border border-yellow-400/30" : "bg-gray-700"
                          }`}
                        >
                          <div
                            className="w-full bg-yellow-400 rounded-sm"
                            style={{ height: `${(day.tokensEarned / 10) * 100}%` }}
                          />
                        </div>
                        <div className="text-xs text-white mt-1 font-medium">{day.tokensEarned}</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <div className="text-sm neuro21-secondary-text">
                      Total this week: <span className="text-white font-medium">58 #HEAL</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Token Balance */}
            <Card className="neuro21-card">
              <CardHeader>
                <CardTitle className="text-white">Token Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <TokenDisplay balance={mockUser.tokenBalance} className="text-2xl justify-center" />
                  <div className="text-sm neuro21-secondary-text">
                    {mockUser.plan === "premium" ? "Premium Plan - 3x earning rate" : "Free Plan - Standard rate"}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                  >
                    View Token History
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="neuro21-card">
              <CardHeader>
                <CardTitle className="text-white">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="neuro21-secondary-text">Current Streak</span>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-white font-medium">{mockUser.streak} days</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="neuro21-secondary-text">This Month</span>
                  <span className="text-white font-medium">342 #HEAL</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="neuro21-secondary-text">Tier Level</span>
                  <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                    Tier {mockUser.tier}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="neuro21-secondary-text">Sessions Available</span>
                  <span className="text-white font-medium">1.9</span>
                </div>
              </CardContent>
            </Card>

            {/* Next Session */}
            <Card className="neuro21-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 neuro21-accent" />
                  Upcoming Session
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm neuro21-secondary-text">Next appointment</div>
                  <div className="text-white font-medium">Dr. Sarah Johnson</div>
                  <div className="text-sm neuro21-secondary-text">Tomorrow, 2:00 PM</div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500">Free Session</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Book Session CTA */}
            <Card className="neuro21-card border-yellow-400/30">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto">
                    <Target className="w-6 h-6 neuro21-accent" />
                  </div>
                  <h3 className="text-white font-medium">Ready for a session?</h3>
                  <p className="text-sm neuro21-secondary-text">You have enough tokens to book a consultation</p>
                  <Button className="w-full neuro21-accent-bg hover:bg-yellow-500 text-gray-900">
                    Book Session (630 #HEAL)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
