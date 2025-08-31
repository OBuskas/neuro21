"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/neuro21/navigation"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/lib/auth-context"
import {
  Trophy,
  Star,
  Award,
  CheckCircle,
  Lock,
  Sparkles,
  Target,
  Flame,
  Heart,
  Brain,
  Zap
} from "lucide-react"

// Mock achievement data
const achievements = [
  {
    id: "first_step",
    name: "First Step",
    description: "Completed your first mental health activity",
    icon: CheckCircle,
    rarity: "Common",
    rarityColor: "bg-gray-400",
    unlocked: true,
    unlockedDate: "2024-01-15",
    progress: 100,
    maxProgress: 1,
  },
  {
    id: "week_warrior",
    name: "Week Warrior",
    description: "Maintained a 7-day streak",
    icon: Flame,
    rarity: "Uncommon",
    rarityColor: "bg-green-400",
    unlocked: true,
    unlockedDate: "2024-01-22",
    progress: 7,
    maxProgress: 7,
  },
  {
    id: "month_master",
    name: "Month Master",
    description: "Achieved a 30-day streak",
    icon: Trophy,
    rarity: "Rare",
    rarityColor: "bg-blue-400",
    unlocked: false,
    progress: 22,
    maxProgress: 30,
  },
  {
    id: "health_hero",
    name: "Health Hero",
    description: "Completed 100 mental health activities",
    icon: Heart,
    rarity: "Epic",
    rarityColor: "bg-purple-400",
    unlocked: false,
    progress: 67,
    maxProgress: 100,
  },
  {
    id: "streak_champion",
    name: "Streak Champion",
    description: "Maintained a 50-day streak",
    icon: Zap,
    rarity: "Legendary",
    rarityColor: "bg-yellow-400",
    unlocked: false,
    progress: 22,
    maxProgress: 50,
  },
  {
    id: "wellness_warrior",
    name: "Wellness Warrior",
    description: "Mastered all mental health categories",
    icon: Brain,
    rarity: "Legendary",
    rarityColor: "bg-yellow-400",
    unlocked: false,
    progress: 3,
    maxProgress: 5,
  },
]

function AchievementsContent() {
  const { user } = useAuth()
  const [selectedFilter, setSelectedFilter] = useState<"all" | "unlocked" | "locked">("all")

  const filteredAchievements = achievements.filter(achievement => {
    if (selectedFilter === "unlocked") return achievement.unlocked
    if (selectedFilter === "locked") return !achievement.unlocked
    return true
  })

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalAchievements = achievements.length
  const completionPercentage = Math.round((unlockedCount / totalAchievements) * 100)

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-400" />
                Achievements
              </h1>
              <p className="text-gray-400">Track your mental health journey milestones</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{unlockedCount}/{totalAchievements}</div>
                <div className="text-sm text-gray-400">Unlocked</div>
              </div>
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="neuro21-card mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-yellow-400" />
              Achievement Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-white">Overall Completion</span>
              <span className="text-white font-bold">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>{unlockedCount} unlocked</span>
              <span>{totalAchievements - unlockedCount} remaining</span>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={selectedFilter === "all" ? "default" : "outline"}
            onClick={() => setSelectedFilter("all")}
            className={selectedFilter === "all" ? "neuro21-accent-bg text-gray-900" : "border-gray-600 text-white hover:bg-gray-800"}
          >
            All ({totalAchievements})
          </Button>
          <Button
            variant={selectedFilter === "unlocked" ? "default" : "outline"}
            onClick={() => setSelectedFilter("unlocked")}
            className={selectedFilter === "unlocked" ? "neuro21-accent-bg text-gray-900" : "border-gray-600 text-white hover:bg-gray-800"}
          >
            Unlocked ({unlockedCount})
          </Button>
          <Button
            variant={selectedFilter === "locked" ? "default" : "outline"}
            onClick={() => setSelectedFilter("locked")}
            className={selectedFilter === "locked" ? "neuro21-accent-bg text-gray-900" : "border-gray-600 text-white hover:bg-gray-800"}
          >
            Locked ({totalAchievements - unlockedCount})
          </Button>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => {
            const IconComponent = achievement.icon
            const progressPercentage = (achievement.progress / achievement.maxProgress) * 100

            return (
              <Card
                key={achievement.id}
                className={`neuro21-card transition-all duration-300 ${
                  achievement.unlocked
                    ? 'border-yellow-400/50 bg-yellow-400/5'
                    : 'border-gray-600 opacity-75'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      achievement.unlocked
                        ? 'bg-yellow-400/20'
                        : 'bg-gray-700'
                    }`}>
                      {achievement.unlocked ? (
                        <IconComponent className="w-6 h-6 text-yellow-400" />
                      ) : (
                        <Lock className="w-6 h-6 text-gray-500" />
                      )}
                    </div>
                    <Badge
                      className={`${achievement.rarityColor} text-white text-xs`}
                    >
                      {achievement.rarity}
                    </Badge>
                  </div>
                  <div>
                    <CardTitle className={`text-lg ${
                      achievement.unlocked ? 'text-white' : 'text-gray-400'
                    }`}>
                      {achievement.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-1">
                      {achievement.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent>
                  {achievement.unlocked ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm">Unlocked</span>
                        <span className="text-gray-400 text-xs ml-auto">
                          {achievement.unlockedDate}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 text-sm">NFT Minted</span>
                        <Button size="sm" variant="outline" className="ml-auto border-yellow-400 text-yellow-400 hover:bg-yellow-400/10">
                          View NFT
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>

                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>

                      <div className="text-center">
                        <span className="text-gray-500 text-xs">
                          {Math.round(achievement.maxProgress - achievement.progress)} more to unlock
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Achievement Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="neuro21-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-white">{unlockedCount}</div>
                <div className="text-gray-400">Achievements Unlocked</div>
              </div>
            </CardContent>
          </Card>

          <Card className="neuro21-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-gray-400">Legendary NFTs</div>
              </div>
            </CardContent>
          </Card>

          <Card className="neuro21-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white">{completionPercentage}%</div>
                <div className="text-gray-400">Completion Rate</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function AchievementsPage() {
  return (
    <ProtectedRoute requiredAuth={true}>
      <AchievementsContent />
    </ProtectedRoute>
  )
}
