"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/neuro21/navigation"
import {
  Calendar,
  Clock,
  Users,
  DollarSign,
  Star,
  TrendingUp,
  Plus,
  CheckCircle,
  AlertCircle,
  Heart,
  BarChart3,
  MessageSquare,
  Video,
  FileText,
} from "lucide-react"

// Mock data for professional dashboard
const mockDashboardData = {
  professional: {
    name: "Dr. Sarah Johnson",
    specialty: "Clinical Psychology",
    todayEarnings: 324,
    monthlyEarnings: 2160,
    csatRating: 4.8,
    freeSessionsCompleted: 8,
    freeSessionsRemaining: 4,
    paidSessionsThisMonth: 24,
  },
  todaySessions: [
    {
      id: "1",
      time: "09:00",
      patient: "Alex M.",
      type: "free",
      status: "completed",
      rating: 5,
      notes: "Great progress on anxiety management techniques",
    },
    {
      id: "2",
      time: "11:00",
      patient: "Jordan K.",
      type: "paid",
      status: "completed",
      rating: 5,
      notes: "Discussed ADHD coping strategies",
    },
    {
      id: "3",
      time: "14:00",
      patient: "Morgan T.",
      type: "free",
      status: "upcoming",
      notes: "First session - intake assessment",
    },
    {
      id: "4",
      time: "16:00",
      patient: "Casey L.",
      type: "paid",
      status: "upcoming",
      notes: "Follow-up on medication adjustment",
    },
  ],
  recentPatients: [
    {
      id: "1",
      name: "Alex M.",
      lastSession: "2024-01-21",
      totalSessions: 6,
      progress: "Excellent",
      nextAppointment: "2024-01-28",
    },
    {
      id: "2",
      name: "Jordan K.",
      lastSession: "2024-01-21",
      totalSessions: 4,
      progress: "Good",
      nextAppointment: "2024-01-25",
    },
    {
      id: "3",
      name: "Sam R.",
      lastSession: "2024-01-19",
      totalSessions: 8,
      progress: "Excellent",
      nextAppointment: "2024-01-26",
    },
  ],
  weeklyStats: [
    { day: "Mon", sessions: 4, earnings: 216 },
    { day: "Tue", sessions: 5, earnings: 324 },
    { day: "Wed", sessions: 3, earnings: 162 },
    { day: "Thu", sessions: 6, earnings: 432 },
    { day: "Fri", sessions: 4, earnings: 216 },
    { day: "Sat", sessions: 2, earnings: 108 },
    { day: "Sun", sessions: 1, earnings: 54 },
  ],
}

export default function ProfessionalDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const { professional, todaySessions, recentPatients, weeklyStats } = mockDashboardData

  const completedToday = todaySessions.filter((s) => s.status === "completed").length
  const upcomingToday = todaySessions.filter((s) => s.status === "upcoming").length

  return (
    <div className="min-h-screen">
      <Navigation userType="professional" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Good morning, Dr. Johnson</h1>
              <p className="neuro21-secondary-text">You have {upcomingToday} sessions scheduled for today</p>
            </div>
            <div className="flex items-center gap-3">
              <Button className="neuro21-accent-bg hover:bg-yellow-500 text-gray-900">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Session
              </Button>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-700">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="patients"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
            >
              Patients
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="neuro21-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm neuro21-secondary-text">Today's Earnings</p>
                      <p className="text-2xl font-bold text-white">${professional.todayEarnings}</p>
                    </div>
                    <DollarSign className="w-8 h-8 neuro21-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card className="neuro21-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm neuro21-secondary-text">Sessions Today</p>
                      <p className="text-2xl font-bold text-white">
                        {completedToday}/{todaySessions.length}
                      </p>
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
                      <p className="text-2xl font-bold text-white">{professional.csatRating}</p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="neuro21-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm neuro21-secondary-text">Free Sessions</p>
                      <p className="text-2xl font-bold text-white">{professional.freeSessionsCompleted}/12</p>
                    </div>
                    <Heart className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Today's Schedule */}
              <div className="lg:col-span-2">
                <Card className="neuro21-card">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 neuro21-accent" />
                      Today's Schedule
                    </CardTitle>
                    <CardDescription className="neuro21-secondary-text">
                      {new Date().toLocaleDateString("en", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {todaySessions.map((session) => (
                        <div
                          key={session.id}
                          className={`flex items-center justify-between p-4 rounded-lg border ${
                            session.status === "completed"
                              ? "bg-green-500/10 border-green-500/30"
                              : "bg-gray-700/50 border-gray-600"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-white font-medium">{session.time}</div>
                              <div className="text-xs neuro21-secondary-text">45 min</div>
                            </div>
                            <div>
                              <div className="text-white font-medium">{session.patient}</div>
                              <div className="text-sm neuro21-secondary-text">{session.notes}</div>
                              {session.status === "completed" && session.rating && (
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
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              className={
                                session.type === "free"
                                  ? "bg-green-500/20 text-green-400 border-green-500"
                                  : "neuro21-accent-bg text-gray-900"
                              }
                            >
                              {session.type === "free" ? "Free" : "Paid"}
                            </Badge>
                            {session.status === "completed" ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <div className="flex gap-2">
                                <Button size="sm" className="neuro21-accent-bg hover:bg-yellow-500 text-gray-900">
                                  <Video className="w-3 h-3 mr-1" />
                                  Join
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & Stats */}
              <div className="space-y-6">
                <Card className="neuro21-card">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full neuro21-accent-bg hover:bg-yellow-500 text-gray-900">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Availability
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Session Notes
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Patient Records
                    </Button>
                  </CardContent>
                </Card>

                <Card className="neuro21-card">
                  <CardHeader>
                    <CardTitle className="text-white">Monthly Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="neuro21-secondary-text">Free Sessions</span>
                        <span className="text-white">{professional.freeSessionsCompleted}/12</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-400 h-2 rounded-full"
                          style={{ width: `${(professional.freeSessionsCompleted / 12) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-center pt-2">
                      <div className="text-2xl font-bold text-white">${professional.monthlyEarnings}</div>
                      <div className="text-sm neuro21-secondary-text">Total earnings this month</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <Card className="neuro21-card">
                  <CardHeader>
                    <CardTitle className="text-white">Weekly Schedule</CardTitle>
                    <CardDescription className="neuro21-secondary-text">
                      Manage your availability and upcoming sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-4">
                      {weeklyStats.map((day, index) => (
                        <div key={day.day} className="text-center">
                          <div className="text-sm neuro21-secondary-text mb-2">{day.day}</div>
                          <div className="space-y-2">
                            <div
                              className={`h-20 rounded-lg flex items-end justify-center p-2 ${
                                day.sessions > 0 ? "bg-yellow-400/20 border border-yellow-400/30" : "bg-gray-700"
                              }`}
                            >
                              <div
                                className="w-full bg-yellow-400 rounded-sm"
                                style={{ height: `${(day.sessions / 6) * 100}%` }}
                              />
                            </div>
                            <div className="text-xs text-white font-medium">{day.sessions} sessions</div>
                            <div className="text-xs neuro21-secondary-text">${day.earnings}</div>
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
                    <CardTitle className="text-white">Availability</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="neuro21-secondary-text">Status</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500">Available</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="neuro21-secondary-text">Next Free Slot</span>
                      <span className="text-white text-sm">Tomorrow 2PM</span>
                    </div>
                    <Button className="w-full neuro21-accent-bg hover:bg-yellow-500 text-gray-900">
                      Update Schedule
                    </Button>
                  </CardContent>
                </Card>

                <Card className="neuro21-card">
                  <CardHeader>
                    <CardTitle className="text-white">Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-white">Session reminder</div>
                        <div className="text-xs neuro21-secondary-text">Morgan T. in 30 minutes</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-white">Session completed</div>
                        <div className="text-xs neuro21-secondary-text">Jordan K. rated 5 stars</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <Card className="neuro21-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 neuro21-accent" />
                  Recent Patients
                </CardTitle>
                <CardDescription className="neuro21-secondary-text">
                  Overview of your recent patient interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                          <span className="text-gray-900 font-medium text-lg">
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{patient.name}</div>
                          <div className="text-sm neuro21-secondary-text">
                            {patient.totalSessions} sessions • Last:{" "}
                            {new Date(patient.lastSession).toLocaleDateString()}
                          </div>
                          <div className="text-sm neuro21-secondary-text">
                            Next: {new Date(patient.nextAppointment).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={
                            patient.progress === "Excellent"
                              ? "bg-green-500/20 text-green-400 border-green-500"
                              : "bg-blue-500/20 text-blue-400 border-blue-500"
                          }
                        >
                          {patient.progress}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          Notes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="neuro21-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 neuro21-accent" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="neuro21-secondary-text">Session Completion</span>
                    <span className="text-white font-medium">98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="neuro21-secondary-text">Patient Retention</span>
                    <span className="text-white font-medium">89%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="neuro21-secondary-text">Avg. Rating</span>
                    <span className="text-white font-medium">{professional.csatRating}/5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="neuro21-secondary-text">Response Time</span>
                    <span className="text-white font-medium">&lt; 2 hours</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="neuro21-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 neuro21-accent" />
                    Monthly Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">${professional.monthlyEarnings}</div>
                    <div className="text-sm neuro21-secondary-text">Total earnings</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="neuro21-secondary-text">Free: {professional.freeSessionsCompleted}</span>
                      <span className="neuro21-secondary-text">Paid: {professional.paidSessionsThisMonth}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "75%" }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="neuro21-card">
                <CardHeader>
                  <CardTitle className="text-white">Impact Score</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold neuro21-accent">92</div>
                    <div className="text-sm neuro21-secondary-text">Overall impact score</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="neuro21-secondary-text">Patient outcomes</span>
                      <span className="text-white">Excellent</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="neuro21-secondary-text">Community contribution</span>
                      <span className="text-white">High</span>
                    </div>
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
