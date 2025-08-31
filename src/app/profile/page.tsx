"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/neuro21/navigation"
import { TokenDisplay } from '@/components/neuro21/token-display'
import {
  User,
  Edit3,
  Wallet,
  TrendingUp,
  Award,
  Star,
  CreditCard,
  History,
  ArrowUpRight,
  ArrowDownLeft,
  Crown,
  Target,
  Flame,
  Users,
} from "lucide-react"

// Mock user data
const mockUser = {
  id: "user123",
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  bio: "ADHD advocate and software developer. On a journey to better mental health through structured daily habits and community support.",
  tokenBalance: 1247,
  plan: "premium" as const,
  tier: 3,
  nextBillingDate: "2024-02-15",
  connectedWallet: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
  joinDate: "2023-08-15",
  totalTokensEarned: 3420,
  sessionsCompleted: 8,
  currentStreak: 7,
  longestStreak: 23,
}

const mockTokenHistory = [
  { id: "1", type: "earned", amount: 10, description: "Daily goals completed", date: "2024-01-21", time: "18:30" },
  {
    id: "2",
    type: "spent",
    amount: -630,
    description: "Session with Dr. Sarah Johnson",
    date: "2024-01-20",
    time: "14:00",
  },
  { id: "3", type: "earned", amount: 8, description: "Daily goals completed", date: "2024-01-20", time: "19:15" },
  { id: "4", type: "earned", amount: 10, description: "Daily goals completed", date: "2024-01-19", time: "17:45" },
  { id: "5", type: "bonus", amount: 50, description: "Weekly streak bonus", date: "2024-01-19", time: "00:01" },
  { id: "6", type: "earned", amount: 9, description: "Daily goals completed", date: "2024-01-18", time: "20:00" },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState({
    name: mockUser.name,
    bio: mockUser.bio,
  })

  const handleSaveProfile = () => {
    // In real app, this would make an API call
    setIsEditing(false)
    console.log("Profile updated:", editedProfile)
  }

  const getTierInfo = (tier: number) => {
    const tiers = [
      { name: "Beginner", color: "text-gray-400", bgColor: "bg-gray-500/20" },
      { name: "Explorer", color: "text-blue-400", bgColor: "bg-blue-500/20" },
      { name: "Achiever", color: "text-green-400", bgColor: "bg-green-500/20" },
      { name: "Champion", color: "text-yellow-400", bgColor: "bg-yellow-500/20" },
      { name: "Legend", color: "text-purple-400", bgColor: "bg-purple-500/20" },
    ]
    return tiers[tier - 1] || tiers[0]
  }

  const tierInfo = getTierInfo(mockUser.tier)

  return (
    <div className="min-h-screen">
      <Navigation userType="user" tokenBalance={mockUser.tokenBalance} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="neuro21-secondary-text">
            Manage your account, track your progress, and view your token history
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-700">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger value="tokens" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900">
              #HEAL
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
            >
              Progress
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Info */}
              <div className="lg:col-span-2">
                <Card className="neuro21-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-900" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-2xl">{mockUser.name}</CardTitle>
                          <CardDescription className="neuro21-secondary-text">{mockUser.email}</CardDescription>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        {isEditing ? "Cancel" : "Edit"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={editedProfile.name}
                            onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio" className="text-white">
                            Bio
                          </Label>
                          <Textarea
                            id="bio"
                            value={editedProfile.bio}
                            onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                            rows={4}
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                        <Button
                          onClick={handleSaveProfile}
                          className="neuro21-accent-bg hover:bg-yellow-500 text-gray-900"
                        >
                          Save Changes
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-white font-medium mb-2">Bio</h3>
                          <p className="neuro21-secondary-text">{mockUser.bio}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={`${tierInfo.bgColor} ${tierInfo.color} border-0`}>
                            <Crown className="w-3 h-3 mr-1" />
                            Tier {mockUser.tier} - {tierInfo.name}
                          </Badge>
                          <Badge className="neuro21-accent-bg">
                            {mockUser.plan === "premium" ? "Premium" : "Free"} Plan
                          </Badge>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card className="neuro21-card">
                  <CardHeader>
                    <CardTitle className="text-white">Token Balance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <TokenDisplay balance={mockUser.tokenBalance} className="text-3xl justify-center" />
                      <div className="text-sm neuro21-secondary-text">
                        Total earned: {mockUser.totalTokensEarned.toLocaleString()} #HEAL
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="neuro21-card">
                  <CardHeader>
                    <CardTitle className="text-white">Journey Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="neuro21-secondary-text">Current Streak</span>
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-400" />
                        <span className="text-white font-medium">{mockUser.currentStreak} days</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="neuro21-secondary-text">Longest Streak</span>
                      <span className="text-white font-medium">{mockUser.longestStreak} days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="neuro21-secondary-text">Sessions Completed</span>
                      <span className="text-white font-medium">{mockUser.sessionsCompleted}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="neuro21-secondary-text">Member Since</span>
                      <span className="text-white font-medium">
                        {new Date(mockUser.joinDate).toLocaleDateString("en", { month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tokens Tab */}
          <TabsContent value="tokens" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="neuro21-card">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <History className="w-5 h-5 neuro21-accent" />
                      Token History
                    </CardTitle>
                    <CardDescription className="neuro21-secondary-text">
                      Your recent token transactions and earnings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockTokenHistory.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                transaction.type === "earned"
                                  ? "bg-green-500/20 text-green-400"
                                  : transaction.type === "spent"
                                    ? "bg-red-500/20 text-red-400"
                                    : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {transaction.type === "earned" ? (
                                <ArrowUpRight className="w-5 h-5" />
                              ) : transaction.type === "spent" ? (
                                <ArrowDownLeft className="w-5 h-5" />
                              ) : (
                                <Star className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <div className="text-white font-medium">{transaction.description}</div>
                              <div className="text-sm neuro21-secondary-text">
                                {transaction.date} at {transaction.time}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`text-lg font-bold ${
                              transaction.amount > 0 ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {transaction.amount > 0 ? "+" : ""}
                            {transaction.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="neuro21-card">
                  <CardHeader>
                    <CardTitle className="text-white">Current Balance</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <TokenDisplay balance={mockUser.tokenBalance} className="text-2xl justify-center" />
                    <div className="text-sm neuro21-secondary-text">
                      ≈ {(mockUser.tokenBalance / 630).toFixed(1)} sessions available
                    </div>
                  </CardContent>
                </Card>

                <Card className="neuro21-card">
                  <CardHeader>
                    <CardTitle className="text-white">Token Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full neuro21-accent-bg hover:bg-yellow-500 text-gray-900">
                      <Target className="w-4 h-4 mr-2" />
                      Book Session (630 #HEAL)
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Trade with Users
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                    >
                      <History className="w-4 h-4 mr-2" />
                      Export History
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="neuro21-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 neuro21-accent" />
                    Monthly Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">342</div>
                      <div className="text-sm neuro21-secondary-text">#HEAL earned this month</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="neuro21-secondary-text">Goal: 400 #HEAL</span>
                        <span className="text-white">85.5%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "85.5%" }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="neuro21-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Award className="w-5 h-5 neuro21-accent" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-400/20 rounded-full flex items-center justify-center">
                        <Flame className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">Week Warrior</div>
                        <div className="text-xs neuro21-secondary-text">7-day streak</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center">
                        <Target className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">Goal Crusher</div>
                        <div className="text-xs neuro21-secondary-text">100 perfect days</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-400/20 rounded-full flex items-center justify-center">
                        <Crown className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">Tier Climber</div>
                        <div className="text-xs neuro21-secondary-text">Reached Tier 3</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="neuro21-card">
                <CardHeader>
                  <CardTitle className="text-white">Tier Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <Badge className={`${tierInfo.bgColor} ${tierInfo.color} border-0 text-lg px-3 py-1`}>
                        <Crown className="w-4 h-4 mr-1" />
                        Tier {mockUser.tier}
                      </Badge>
                      <div className="text-sm neuro21-secondary-text mt-2">{tierInfo.name}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="neuro21-secondary-text">Progress to Tier 4</span>
                        <span className="text-white">67%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "67%" }} />
                      </div>
                    </div>
                    <div className="text-xs neuro21-secondary-text text-center">
                      Complete 15 more perfect days to reach Tier 4
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="neuro21-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 neuro21-accent" />
                    Subscription
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="neuro21-secondary-text">Current Plan</span>
                    <Badge className="neuro21-accent-bg">Premium</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="neuro21-secondary-text">Monthly Cost</span>
                    <span className="text-white font-medium">$25.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="neuro21-secondary-text">Next Billing</span>
                    <span className="text-white font-medium">
                      {new Date(mockUser.nextBillingDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="neuro21-secondary-text">Token Multiplier</span>
                    <Badge variant="outline" className="border-green-400 text-green-400">
                      3x
                    </Badge>
                  </div>
                  <div className="pt-4 space-y-2">
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                    >
                      Manage Subscription
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-red-600 text-red-400 hover:bg-red-500/10 bg-transparent"
                    >
                      Cancel Subscription
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="neuro21-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Wallet className="w-5 h-5 neuro21-accent" />
                    Connected Wallet
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Wallet Address</Label>
                    <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                      <code className="text-sm text-gray-300 break-all">{mockUser.connectedWallet}</code>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="neuro21-secondary-text">Status</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500">Connected</Badge>
                  </div>
                  <div className="pt-4 space-y-2">
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                    >
                      Change Wallet
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-red-600 text-red-400 hover:bg-red-500/10 bg-transparent"
                    >
                      Disconnect Wallet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
