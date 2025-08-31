"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import {
  User,
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  Clock,
  Users,
  Award,
  Heart,
  BarChart3,
  Settings,
} from "lucide-react"

// Mock professional data
const mockProfessional = {
  id: "prof123",
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@email.com",
  bio: "Licensed clinical psychologist specializing in ADHD, autism, and neurodivergent mental health. 8+ years of experience helping individuals develop coping strategies and achieve their goals.",
  specialty: "Clinical Psychology",
  license: "PSY12345",
  donatedSessions: 8,
  soldSessions: 24,
  pricePerSession: 120,
  csatRating: 4.8,
  totalEarnings: 2160,
  joinDate: "2023-06-01",
  nextFreeSlot: "2024-01-22T14:00:00",
}

const mockSessionHistory = [
  { id: "1", type: "free", patient: "Alex M.", date: "2024-01-21", rating: 5, earnings: 0 },
  { id: "2", type: "paid", patient: "Jordan K.", date: "2024-01-20", rating: 5, earnings: 108 },
  { id: "3", type: "free", patient: "Sam R.", date: "2024-01-19", rating: 4, earnings: 0 },
  { id: "4", type: "paid", patient: "Casey L.", date: "2024-01-18", rating: 5, earnings: 108 },
  { id: "5", type: "free", patient: "Riley P.", date: "2024-01-17", rating: 5, earnings: 0 },
]

const mockUpcomingSessions = [
  { id: "1", type: "free", patient: "Morgan T.", date: "2024-01-22", time: "14:00" },
  { id: "2", type: "paid", patient: "Taylor H.", date: "2024-01-23", time: "10:00" },
  { id: "3", type: "free", patient: "Avery S.", date: "2024-01-23", time: "16:00" },
]

export default function ProfessionalProfilePage() {
  const freeSessionsRemaining = 12 - mockProfessional.donatedSessions
  const completionRate = ((mockProfessional.donatedSessions + mockProfessional.soldSessions) / 36) * 100

  return (
    <div className="min-h-screen">
      <Navigation userType="professional" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Professional Dashboard</h1>
          <p className="neuro21-secondary-text">Manage your practice, track sessions, and view your impact</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-700">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="sessions"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
            >
              Sessions
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
            >
              Analytics
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
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-900" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-2xl">{mockProfessional.name}</CardTitle>
                        <CardDescription className="neuro21-secondary-text">
                          {mockProfessional.specialty} • License #{mockProfessional.license}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-white font-medium mb-2">About</h3>
                      <p className="neuro21-secondary-text">{mockProfessional.bio}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500">
                        <Star className="w-3 h-3 mr-1" />
                        {mockProfessional.csatRating} CSAT Rating
                      </Badge>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {mockProfessional.donatedSessions + mockProfessional.soldSessions} Total Sessions
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card className="neuro21-card">
                  <CardHeader>
                    <CardTitle className="text-white">Monthly Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-white">${mockProfessional.totalEarnings}</div>
                      <div className="text-sm neuro21-secondary-text">This month</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="neuro21-card">
                  <CardHeader>
                    <CardTitle className="text-white">Session Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="neuro21-secondary-text">Free Sessions</span>
                        <span className="text-white">{mockProfessional.donatedSessions}/12</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-400 h-2 rounded-full"
                          style={{ width: `${(mockProfessional.donatedSessions / 12) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-xs neuro21-secondary-text">
                      {freeSessionsRemaining} free sessions remaining this month
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="neuro21-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm neuro21-secondary-text">Donated Sessions</p>
                      <p className="text-2xl font-bold text-white">{mockProfessional.donatedSessions}</p>
                    </div>
                    <Heart className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="neuro21-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm neuro21-secondary-text">Paid Sessions</p>
                      <p className="text-2xl font-bold text-white">{mockProfessional.soldSessions}</p>
                    </div>
                    <DollarSign className="w-8 h-8 neuro21-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card className="neuro21-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm neuro21-secondary-text">Price per Session</p>
                      <p className="text-2xl font-bold text-white">${mockProfessional.pricePerSession}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="neuro21-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm neuro21-secondary-text">CSAT Rating</p>
                      <p className="text-2xl font-bold text-white">{mockProfessional.csatRating}</p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Upcoming Sessions */}
              <Card className="neuro21-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 neuro21-accent" />
                    Upcoming Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUpcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600"
                      >
                        <div>
                          <div className="text-white font-medium">{session.patient}</div>
                          <div className="text-sm neuro21-secondary-text">
                            {new Date(session.date).toLocaleDateString()} at {session.time}
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
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Sessions */}
              <Card className="neuro21-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="w-5 h-5 neuro21-accent" />
                    Recent Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockSessionHistory.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600"
                      >
                        <div>
                          <div className="text-white font-medium">{session.patient}</div>
                          <div className="text-sm neuro21-secondary-text">
                            {new Date(session.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < session.rating ? "text-yellow-400 fill-current" : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              session.type === "free"
                                ? "bg-green-500/20 text-green-400 border-green-500"
                                : "neuro21-accent-bg text-gray-900"
                            }
                          >
                            {session.type === "free" ? "Free" : `$${session.earnings}`}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="neuro21-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 neuro21-accent" />
                    Monthly Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{completionRate.toFixed(0)}%</div>
                      <div className="text-sm neuro21-secondary-text">Session completion rate</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="neuro21-secondary-text">Target: 36 sessions</span>
                        <span className="text-white">
                          {mockProfessional.donatedSessions + mockProfessional.soldSessions}/36
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${completionRate}%` }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="neuro21-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Award className="w-5 h-5 neuro21-accent" />
                    Patient Satisfaction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{mockProfessional.csatRating}</div>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(mockProfessional.csatRating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm neuro21-secondary-text mt-1">Average rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="neuro21-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 neuro21-accent" />
                    Impact Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="neuro21-secondary-text">Patients Helped</span>
                      <span className="text-white font-medium">47</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="neuro21-secondary-text">Avg. Improvement</span>
                      <span className="text-white font-medium">73%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="neuro21-secondary-text">Return Rate</span>
                      <span className="text-white font-medium">89%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="neuro21-secondary-text">Referrals</span>
                      <span className="text-white font-medium">12</span>
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
                    <Settings className="w-5 h-5 neuro21-accent" />
                    Session Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="neuro21-secondary-text">Price per Session</span>
                    <span className="text-white font-medium">${mockProfessional.pricePerSession}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="neuro21-secondary-text">Session Duration</span>
                    <span className="text-white font-medium">45 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="neuro21-secondary-text">Availability</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500">Active</Badge>
                  </div>
                  <div className="pt-4">
                    <Button className="w-full neuro21-accent-bg hover:bg-yellow-500 text-gray-900">
                      Update Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="neuro21-card">
                <CardHeader>
                  <CardTitle className="text-white">Professional Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="neuro21-secondary-text">License Number</span>
                    <span className="text-white font-medium">{mockProfessional.license}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="neuro21-secondary-text">Specialty</span>
                    <span className="text-white font-medium">{mockProfessional.specialty}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="neuro21-secondary-text">Member Since</span>
                    <span className="text-white font-medium">
                      {new Date(mockProfessional.joinDate).toLocaleDateString("en", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                    >
                      Update Profile
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
