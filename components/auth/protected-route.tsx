"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Lock } from 'lucide-react'
import Link from 'next/link'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredAuth?: boolean
  requiredWallet?: boolean
  userType?: 'user' | 'professional'
  fallback?: React.ReactNode
}

export function ProtectedRoute({
  children,
  requiredAuth = true,
  requiredWallet = false,
  userType,
  fallback
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="neuro21-card max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-yellow-400" />
              <p className="text-white">Loading...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Check authentication
  if (requiredAuth && !user?.isAuthenticated) {
    if (fallback) return <>{fallback}</>

    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="neuro21-card max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <Lock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold text-white mb-2">Access Required</h2>
              <p className="text-gray-400 mb-6">
                You need to be logged in to access this page.
              </p>
              <div className="space-y-3">
                <Button asChild className="w-full neuro21-accent-bg hover:bg-yellow-500 text-gray-900">
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800">
                  <Link href="/auth/register">Create Account</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Check wallet connection
  if (requiredWallet && !user?.walletConnected) {
    if (fallback) return <>{fallback}</>

    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="neuro21-card max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-gray-900" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Wallet Required</h2>
              <p className="text-gray-400 mb-6">
                You need to connect your wallet to access this feature.
              </p>
              <Button className="w-full neuro21-accent-bg hover:bg-yellow-500 text-gray-900">
                Connect Wallet
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Check user type
  if (userType && user?.type !== userType) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="neuro21-card max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <Lock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
              <p className="text-gray-400 mb-6">
                This page is only accessible to {userType === 'professional' ? 'professionals' : 'users'}.
              </p>
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

// HOC for protecting pages
export function withAuth<T extends object>(
  Component: React.ComponentType<T>,
  options: Omit<ProtectedRouteProps, 'children'> = {}
) {
  return function AuthenticatedComponent(props: T) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    )
  }
}
