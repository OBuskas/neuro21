"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/neuro21/navigation"
import { Wallet, AlertCircle, CheckCircle, User, FileText } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [step, setStep] = useState<"wallet" | "profile">("wallet")
  const [isConnecting, setIsConnecting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [walletAddress, setWalletAddress] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    userType: "user" as "user" | "professional",
  })

  const connectMetamask = async () => {
    setIsConnecting(true)
    setConnectionStatus("idle")
    setErrorMessage("")

    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask is not installed. Please install MetaMask to continue.")
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length === 0) {
        throw new Error("No accounts found. Please make sure MetaMask is unlocked.")
      }

      await new Promise((resolve) => setTimeout(resolve, 1500))

      setWalletAddress(accounts[0])
      setConnectionStatus("success")
      setStep("profile")
    } catch (error: any) {
      setConnectionStatus("error")
      setErrorMessage(error.message || "Failed to connect to MetaMask")
    } finally {
      setIsConnecting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate account creation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to journey page
      window.location.href = "/journey"
    } catch (error) {
      setErrorMessage("Failed to create account. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              {step === "wallet" ? (
                <Wallet className="w-8 h-8 text-gray-900" />
              ) : (
                <User className="w-8 h-8 text-gray-900" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {step === "wallet" ? "Join Neuro21" : "Complete Your Profile"}
            </h2>
            <p className="neuro21-secondary-text">
              {step === "wallet"
                ? "Connect your wallet to get started"
                : "Tell us about yourself to personalize your experience"}
            </p>
          </div>

          {step === "wallet" ? (
            <Card className="neuro21-card">
              <CardHeader>
                <CardTitle className="text-white text-center">Connect Wallet</CardTitle>
                <CardDescription className="text-center neuro21-secondary-text">
                  Your wallet will be used to securely manage your tokens and identity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {connectionStatus === "error" && (
                  <Alert className="border-red-500 bg-red-500/10">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <AlertDescription className="text-red-400">{errorMessage}</AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={connectMetamask}
                  disabled={isConnecting}
                  className="w-full neuro21-accent-bg hover:bg-yellow-500 text-gray-900 font-semibold"
                  size="lg"
                >
                  {isConnecting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                      Connecting...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      Connect with MetaMask
                    </div>
                  )}
                </Button>

                <div className="text-center space-y-4">
                  <p className="neuro21-secondary-text text-sm">Already have an account?</p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                  >
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="neuro21-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Profile Information</CardTitle>
                    <CardDescription className="neuro21-secondary-text">
                      Help us personalize your Neuro21 experience
                    </CardDescription>
                  </div>
                  <Badge className="neuro21-accent-bg">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Wallet Connected
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <Alert className="border-red-500 bg-red-500/10">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <AlertDescription className="text-red-400">{errorMessage}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="wallet" className="text-white">
                      Connected Wallet
                    </Label>
                    <Input
                      id="wallet"
                      value={walletAddress}
                      disabled
                      className="bg-gray-700 border-gray-600 text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-white">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      placeholder="Tell us about yourself, your goals, or your neurodivergent journey..."
                      rows={4}
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white">Account Type</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant={formData.userType === "user" ? "default" : "outline"}
                        className={
                          formData.userType === "user"
                            ? "neuro21-accent-bg text-gray-900"
                            : "border-gray-600 text-white hover:bg-gray-800"
                        }
                        onClick={() => handleInputChange("userType", "user")}
                      >
                        <User className="w-4 h-4 mr-2" />
                        User
                      </Button>
                      <Button
                        type="button"
                        variant={formData.userType === "professional" ? "default" : "outline"}
                        className={
                          formData.userType === "professional"
                            ? "neuro21-accent-bg text-gray-900"
                            : "border-gray-600 text-white hover:bg-gray-800"
                        }
                        onClick={() => handleInputChange("userType", "professional")}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Professional
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email}
                    className="w-full neuro21-accent-bg hover:bg-yellow-500 text-gray-900 font-semibold"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                        Creating Account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="text-center">
            <Link href="/" className="neuro21-secondary-text hover:text-yellow-400 transition-colors text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
