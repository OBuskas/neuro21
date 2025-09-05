"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TokenDisplay } from "./token-display"
import { Menu, X, User, Home, Target } from "lucide-react"

interface NavigationProps {
  userType?: "user" | "professional"
  tokenBalance?: number
}

export function Navigation({ userType = "user", tokenBalance = 0 }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const userNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/journey", label: "Journey", icon: Target },
    { href: "/profile", label: "Profile", icon: User },
  ]

  const professionalNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: Target },
    { href: "/profile", label: "Profile", icon: User },
  ]

  const navItems = userType === "professional" ? professionalNavItems : userNavItems

  return (
    <nav className="neuro21-card border-b border-gray-700 bg-gray-800 sticky top-0 z-50">
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
            {userType === "user" && <TokenDisplay balance={tokenBalance} />}
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
              {userType === "user" && (
                <div className="pt-2 border-t border-gray-700">
                  <TokenDisplay balance={tokenBalance} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
