"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Navigation } from "@/components/neuro21/navigation"
import { useAuth } from "@/lib/auth-context"
import { Wallet, AlertCircle, CheckCircle, Mail, Lock } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const { connectWallet, login } = useAuth()
  const router = useRouter()
  const [authMethod, setAuthMethod] = useState<"wallet" | "email">("wallet")
  const [isConnecting, setIsConnecting] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleWalletConnect = async () => {
    setIsConnecting(true)
    setConnectionStatus("idle")
    setErrorMessage("")

    try {
      await connectWallet()
      setConnectionStatus("success")

      // Redirect to journey after successful connection
      setTimeout(() => {
        router.push("/journey")
      }, 1500)
    } catch (error: any) {
      setConnectionStatus("error")
      setErrorMessage(error.message || "Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setErrorMessage("")

    try {
      await login(formData.email, formData.password)
      router.push("/journey")
    } catch (error: any) {
      setErrorMessage(error.message || "Login failed")
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              {authMethod === "wallet" ? (
                <Wallet className="w-8 h-8 text-gray-900" />
              ) : (
                <Mail className="w-8 h-8 text-gray-900" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="neuro21-secondary-text">
              {authMethod === "wallet"
                ? "Connect your wallet to access your Neuro21 journey"
                : "Sign in with your email and password"
              }
            </p>
          </div>

          {/* Auth Method Selector */}
          <div className="flex rounded-lg bg-gray-800 p-1">
            <Button
              variant={authMethod === "wallet" ? "default" : "ghost"}
              className={`flex-1 ${authMethod === "wallet" ? "neuro21-accent-bg text-gray-900" : "text-gray-300 hover:text-white"}`}
              onClick={() => setAuthMethod("wallet")}
            >
              <Wallet className="w-4 h-4 mr-2" />
              Wallet
            </Button>
            <Button
              variant={authMethod === "email" ? "default" : "ghost"}
              className={`flex-1 ${authMethod === "email" ? "neuro21-accent-bg text-gray-900" : "text-gray-300 hover:text-white"}`}
              onClick={() => setAuthMethod("email")}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
          </div>

          {authMethod === "wallet" ? (
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
                  onClick={handleWalletConnect}
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
              </CardContent>
            </Card>
          ) : (
            <Card className="neuro21-card">
              <CardHeader>
                <CardTitle className="text-white text-center">Sign In</CardTitle>
                <CardDescription className="text-center neuro21-secondary-text">
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEmailLogin} className="space-y-6">
                  {errorMessage && (
                    <Alert className="border-red-500 bg-red-500/10">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <AlertDescription className="text-red-400">{errorMessage}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoggingIn || !formData.email || !formData.password}
                    className="w-full neuro21-accent-bg hover:bg-yellow-500 text-gray-900 font-semibold"
                    size="lg"
                  >
                    {isLoggingIn ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                        Signing In...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Sign In
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="text-center space-y-4">
            <p className="neuro21-secondary-text text-sm">
              {authMethod === "wallet" ? "Don't have a wallet?" : "Don't have an account?"}
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              {authMethod === "wallet" ? (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                  >
                    <Link href="https://metamask.io/download/" target="_blank">
                      Install MetaMask
                    </Link>
                  </Button>
                  <Button
                    onClick={() => setAuthMethod("email")}
                    variant="outline"
                    className="flex-1 border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                  >
                    Use Email Instead
                  </Button>
                </>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                >
                  <Link href="/auth/register">Create Account</Link>
                </Button>
              )}
            </div>
          </div>

          <div className="text-center">
            <p className="neuro21-secondary-text text-xs">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
