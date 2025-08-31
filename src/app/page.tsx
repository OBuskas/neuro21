import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/neuro21/navigation"
import { TokenDisplay } from "@/components/neuro21/token-display"
import {
  Brain,
  Target,
  Coins,
  Users,
  Calendar,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle,
  Star,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="neuro21-accent-bg mb-4">Web3 Mental Health Platform</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
              Transform Your Mental Health Journey with <span className="neuro21-accent">Neuro21</span>
            </h1>
            <p className="text-xl neuro21-secondary-text mb-8 max-w-3xl mx-auto text-pretty">
              A gamified platform designed for neurodivergent individuals to track progress, earn tokens, and access
              professional mental health support through innovative web3 technology.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="neuro21-accent-bg hover:bg-yellow-500">
              <Link href="/auth/register">Start Your Journey</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
            >
              <Link href="/auth/login">Connect Wallet</Link>
            </Button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative max-w-4xl mx-auto">
            <img
              src="/modern-dashboard-interface-with-brain-and-mental-h.png"
              alt="Neuro21 Platform Dashboard"
              className="rounded-lg shadow-2xl border border-gray-700"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Neuro21?</h2>
            <p className="text-xl neuro21-secondary-text max-w-2xl mx-auto">
              Designed specifically for neurodivergent individuals with ADHD, autism, and other conditions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="neuro21-card">
              <CardHeader>
                <Brain className="w-12 h-12 neuro21-accent mb-4" />
                <CardTitle className="text-white">Neurodivergent-Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="neuro21-secondary-text">
                  Built with understanding of ADHD, autism, and other neurodivergent conditions. Our approach respects
                  your unique brain wiring.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="neuro21-card">
              <CardHeader>
                <Target className="w-12 h-12 neuro21-accent mb-4" />
                <CardTitle className="text-white">Gamified Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="neuro21-secondary-text">
                  Track daily goals in exercise, nutrition, and sleep. Earn tokens for achievements and maintain
                  motivation through gamification.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="neuro21-card">
              <CardHeader>
                <Coins className="w-12 h-12 neuro21-accent mb-4" />
                <CardTitle className="text-white">Token Economy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="neuro21-secondary-text">
                  Earn tokens through daily activities. Use them to access professional consultations with psychologists
                  and psychiatrists.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="neuro21-card">
              <CardHeader>
                <Users className="w-12 h-12 neuro21-accent mb-4" />
                <CardTitle className="text-white">Professional Network</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="neuro21-secondary-text">
                  Access qualified mental health professionals who understand neurodivergent needs and provide
                  specialized support.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="neuro21-card">
              <CardHeader>
                <Shield className="w-12 h-12 neuro21-accent mb-4" />
                <CardTitle className="text-white">Web3 Security</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="neuro21-secondary-text">
                  Your data and tokens are secured by blockchain technology. Maintain privacy and control over your
                  mental health journey.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="neuro21-card">
              <CardHeader>
                <TrendingUp className="w-12 h-12 neuro21-accent mb-4" />
                <CardTitle className="text-white">Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="neuro21-secondary-text">
                  Visualize your mental health journey with detailed analytics and progress reports tailored to
                  neurodivergent patterns.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Plans Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
            <p className="text-xl neuro21-secondary-text">
              Start free or unlock premium features for accelerated progress
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <Card className="neuro21-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-white mb-2">Free Plan</CardTitle>
                    <CardDescription className="neuro21-secondary-text">Perfect for getting started</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-gray-600 text-gray-400">
                    $0/month
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center py-4">
                  <TokenDisplay balance={30} className="text-lg" />
                  <span className="neuro21-secondary-text ml-2">/day max</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white">Daily goal tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white">Basic progress analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white">Access to free professional sessions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white">Community support</span>
                  </div>
                </div>

                <Button asChild className="w-full mt-6 bg-transparent" variant="outline">
                  <Link href="/auth/register">Get Started Free</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="neuro21-card border-yellow-400 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="neuro21-accent-bg">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </Badge>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-white mb-2">Premium Plan</CardTitle>
                    <CardDescription className="neuro21-secondary-text">Accelerate your progress</CardDescription>
                  </div>
                  <Badge className="neuro21-accent-bg">$25/month</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center py-4">
                  <TokenDisplay balance={90} className="text-lg" />
                  <span className="neuro21-secondary-text ml-2">/day max</span>
                  <Badge variant="outline" className="ml-2 border-yellow-400 text-yellow-400">
                    3x more
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white">Everything in Free</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white">3x token earning rate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white">Advanced analytics & insights</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white">Priority professional booking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white">Personalized recommendations</span>
                  </div>
                </div>

                <Button asChild className="w-full mt-6 neuro21-accent-bg hover:bg-yellow-500">
                  <Link href="/auth/register?plan=premium">Start Premium Trial</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ADHD Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Designed for ADHD Minds</h2>
            <p className="text-xl neuro21-secondary-text max-w-3xl mx-auto">
              Our platform understands the unique challenges and strengths of ADHD brains, providing tools that work
              with your natural patterns, not against them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Zap className="w-8 h-8 neuro21-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Dopamine-Driven Rewards</h3>
                  <p className="neuro21-secondary-text">
                    Instant token rewards for completed tasks provide the dopamine hits that ADHD brains crave, making
                    habit formation more sustainable.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Target className="w-8 h-8 neuro21-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Flexible Goal Setting</h3>
                  <p className="neuro21-secondary-text">
                    Score your daily goals from 0-10 instead of binary success/failure. Partial progress still earns
                    rewards, reducing all-or-nothing thinking.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Calendar className="w-8 h-8 neuro21-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Executive Function Support</h3>
                  <p className="neuro21-secondary-text">
                    Visual progress tracking and gamified elements help with planning, organization, and maintaining
                    focus on long-term goals.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/adhd-brain-visualization-with-colorful-neural-netw.png"
                alt="ADHD Brain Benefits"
                className="rounded-lg shadow-xl border border-gray-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-lg">N21</span>
                </div>
                <span className="text-white font-bold text-xl">Neuro21</span>
              </div>
              <p className="neuro21-secondary-text mb-4 max-w-md">
                Empowering neurodivergent individuals through gamified mental health support and web3 technology.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  <Github className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <div className="space-y-2">
                <Link
                  href="/auth/register"
                  className="block neuro21-secondary-text hover:text-yellow-400 transition-colors"
                >
                  Get Started
                </Link>
                <Link href="/journey" className="block neuro21-secondary-text hover:text-yellow-400 transition-colors">
                  Journey
                </Link>
                <Link
                  href="/professionals"
                  className="block neuro21-secondary-text hover:text-yellow-400 transition-colors"
                >
                  Find Professionals
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <Link href="/help" className="block neuro21-secondary-text hover:text-yellow-400 transition-colors">
                  Help Center
                </Link>
                <Link href="/contact" className="block neuro21-secondary-text hover:text-yellow-400 transition-colors">
                  Contact Us
                </Link>
                <Link href="/privacy" className="block neuro21-secondary-text hover:text-yellow-400 transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="neuro21-secondary-text">
              © 2024 Neuro21. All rights reserved. Built with ❤️ for the neurodivergent community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
