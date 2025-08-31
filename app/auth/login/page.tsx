"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Navigation } from "@/components/neuro21/navigation"
import { Wallet, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const connectMetamask = async () => {
    setIsConnecting(true)
    setConnectionStatus("idle")
    setErrorMessage("")

    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask is not installed. Please install MetaMask to continue.")
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length === 0) {
        throw new Error("No accounts found. Please make sure MetaMask is unlocked.")
      }

      // Simulate authentication process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setConnectionStatus("success")

      // Redirect to dashboard after successful connection
      setTimeout(() => {
        window.location.href = "/journey"
      }, 1500)
    } catch (error: any) {
      setConnectionStatus("error")
      setErrorMessage(error.message || "Failed to connect to MetaMask")
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-gray-900" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="neuro21-secondary-text">Connect your wallet to access your Neuro21 journey</p>
          </div>

          <Card className="neuro21-card">
            <CardHeader>
              <CardTitle className="text-white text-center">Connect Wallet</CardTitle>
              <CardDescription className="text-center neuro21-secondary-text">
                Use MetaMask to securely access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {connectionStatus === "error" && (
                <Alert className="border-red-500 bg-red-500/10">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-400">{errorMessage}</AlertDescription>
                </Alert>
              )}

              {connectionStatus === "success" && (
                <Alert className="border-green-500 bg-green-500/10">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-green-400">
                    Successfully connected! Redirecting to your dashboard...
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={connectMetamask}
                disabled={isConnecting || connectionStatus === "success"}
                className="w-full neuro21-accent-bg hover:bg-yellow-500 text-gray-900 font-semibold"
                size="lg"
              >
                {isConnecting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </div>
                ) : connectionStatus === "success" ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Connected!
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    Connect with MetaMask
                  </div>
                )}
              </Button>

              <div className="text-center space-y-4">
                <p className="neuro21-secondary-text text-sm">Don't have an account?</p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                >
                  <Link href="/auth/register">Create Account</Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="neuro21-secondary-text text-xs">
                  By connecting, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>

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
