"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TokenDisplay } from "./token-display"
import { Menu, X, User, Home, Target, LogOut, Wallet, Award } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface NavigationProps {
  userType?: "user" | "professional"
  tokenBalance?: number
}

export function Navigation({ userType = "user", tokenBalance = 0 }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout, connectWallet, disconnectWallet } = useAuth()

  const userNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/journey", label: "Journey", icon: Target },
    { href: "/achievements", label: "Achievements", icon: Award },
    { href: "/profile", label: "Profile", icon: User },
  ]

  const professionalNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: Target },
    { href: "/achievements", label: "Achievements", icon: Award },
    { href: "/profile", label: "Profile", icon: User },
  ]

  const navItems = (user?.type === "professional" ? professionalNavItems : userNavItems).filter(item => {
    // Hide authenticated routes if not logged in
    if (!user?.isAuthenticated && ["/journey", "/dashboard", "/achievements", "/profile"].includes(item.href)) {
      return false
    }
    return true
  })

  return (
    <nav className="neuro21-card border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <img src="/brain.svg" alt="Brain icon" className="w-8 h-8" />
            </div>
            <span className="text-white font-bold text-xl">Neuro21</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Authentication Section */}
            {user?.isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {user.type === "user" && <TokenDisplay balance={user.tokenBalance} />}

                {/* Wallet Status */}
                {user.walletConnected ? (
                  <Button
                    onClick={disconnectWallet}
                    variant="outline"
                    size="sm"
                    className="border-green-500 text-green-400 hover:bg-green-500/10"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connected
                  </Button>
                ) : (
                  <Button
                    onClick={connectWallet}
                    variant="outline"
                    size="sm"
                    className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                )}

                {/* Logout */}
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button asChild variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-800">
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild size="sm" className="neuro21-accent-bg hover:bg-yellow-500 text-gray-900">
                  <Link href="/auth/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Mobile Authentication Section */}
              <div className="pt-2 border-t border-gray-700 space-y-3">
                {user?.isAuthenticated ? (
                  <>
                    {user.type === "user" && <TokenDisplay balance={user.tokenBalance} />}

                    {/* Wallet Status */}
                    {user.walletConnected ? (
                      <Button
                        onClick={() => {
                          disconnectWallet()
                          setIsMenuOpen(false)
                        }}
                        variant="outline"
                        size="sm"
                        className="w-full border-green-500 text-green-400 hover:bg-green-500/10"
                      >
                        <Wallet className="w-4 h-4 mr-2" />
                        Wallet Connected
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          connectWallet()
                          setIsMenuOpen(false)
                        }}
                        variant="outline"
                        size="sm"
                        className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
                      >
                        <Wallet className="w-4 h-4 mr-2" />
                        Connect Wallet
                      </Button>
                    )}

                    {/* Logout */}
                    <Button
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full border-gray-600 text-white hover:bg-gray-800"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Button asChild variant="outline" size="sm" className="w-full border-gray-600 text-white hover:bg-gray-800">
                      <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    </Button>
                    <Button asChild size="sm" className="w-full neuro21-accent-bg hover:bg-yellow-500 text-gray-900">
                      <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
