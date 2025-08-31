"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, AuthState } from './types'

interface AuthContextType extends AuthState {
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  login: (email: string, password: string) => Promise<void>
  register: (userData: Partial<User>) => Promise<void>
  logout: () => void
  updateProfile: (updates: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  })

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('neuro21_user')
        if (savedUser) {
          const user = JSON.parse(savedUser)
          setAuthState({
            user: { ...user, isAuthenticated: true },
            isLoading: false,
            error: null,
          })
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            error: null,
          })
        }
      } catch (error) {
        console.error('Error checking auth:', error)
        setAuthState({
          user: null,
          isLoading: false,
          error: 'Failed to load user data',
        })
      }
    }

    checkAuth()
  }, [])

  const connectWallet = async (): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Check if MetaMask is available
      if (typeof window !== 'undefined' && window.ethereum) {
        // First, try to switch to Base network
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x2105' }], // Base mainnet chainId
          })
        } catch (switchError: any) {
          // If Base network is not added, add it
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x2105',
                chainName: 'Base',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://mainnet.base.org'],
                blockExplorerUrls: ['https://basescan.org'],
              }],
            })
          }
        }

        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })

        if (accounts && accounts.length > 0) {
          const walletAddress = accounts[0]
          const currentUser = authState.user

          const updatedUser: User = {
            ...currentUser,
            id: currentUser?.id || `user_${Date.now()}`,
            metamaskId: walletAddress,
            connectedWallet: walletAddress,
            walletConnected: true,
            isAuthenticated: true,
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            bio: currentUser?.bio || '',
            tokenBalance: currentUser?.tokenBalance || 0,
            plan: currentUser?.plan || 'free',
            tier: currentUser?.tier || 1,
            type: currentUser?.type || 'user',
          } as User

          localStorage.setItem('neuro21_user', JSON.stringify(updatedUser))
          setAuthState({
            user: updatedUser,
            isLoading: false,
            error: null,
          })
        } else {
          throw new Error('No accounts found')
        }
      } else {
        // Fallback for development - simulate wallet connection
        const mockWalletAddress = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
        const currentUser = authState.user

        const updatedUser: User = {
          ...currentUser,
          id: currentUser?.id || `user_${Date.now()}`,
          metamaskId: mockWalletAddress,
          connectedWallet: mockWalletAddress,
          walletConnected: true,
          isAuthenticated: true,
          name: currentUser?.name || '',
          email: currentUser?.email || '',
          bio: currentUser?.bio || '',
          tokenBalance: currentUser?.tokenBalance || 0,
          plan: currentUser?.plan || 'free',
          tier: currentUser?.tier || 1,
          type: currentUser?.type || 'user',
        } as User

        localStorage.setItem('neuro21_user', JSON.stringify(updatedUser))
        setAuthState({
          user: updatedUser,
          isLoading: false,
          error: null,
        })
      }
    } catch (error: any) {
      console.error('Wallet connection error:', error)
      setAuthState({
        user: null,
        isLoading: false,
        error: error.message || 'Failed to connect wallet',
      })
    }
  }

  const disconnectWallet = (): void => {
    const currentUser = authState.user
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        walletConnected: false,
        metamaskId: undefined,
        connectedWallet: undefined,
      }
      localStorage.setItem('neuro21_user', JSON.stringify(updatedUser))
      setAuthState({
        user: updatedUser,
        isLoading: false,
        error: null,
      })
    }
  }

  const login = async (email: string, password: string): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate login - in real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1500))

      // For demo purposes, create a basic user
      const user: User = {
        id: `user_${Date.now()}`,
        name: email.split('@')[0],
        email,
        bio: '',
        tokenBalance: 100,
        plan: 'free',
        tier: 1,
        type: 'user',
        isAuthenticated: true,
        walletConnected: false,
      }

      localStorage.setItem('neuro21_user', JSON.stringify(user))
      setAuthState({
        user,
        isLoading: false,
        error: null,
      })
    } catch (error: any) {
      setAuthState({
        user: null,
        isLoading: false,
        error: error.message || 'Login failed',
      })
    }
  }

  const register = async (userData: Partial<User>): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 2000))

      const user: User = {
        id: `user_${Date.now()}`,
        name: userData.name || '',
        email: userData.email || '',
        bio: userData.bio || '',
        metamaskId: userData.metamaskId,
        connectedWallet: userData.connectedWallet,
        tokenBalance: 100,
        plan: 'free',
        tier: 1,
        type: userData.type || 'user',
        isAuthenticated: true,
        walletConnected: !!userData.connectedWallet,
      }

      localStorage.setItem('neuro21_user', JSON.stringify(user))
      setAuthState({
        user,
        isLoading: false,
        error: null,
      })
    } catch (error: any) {
      setAuthState({
        user: null,
        isLoading: false,
        error: error.message || 'Registration failed',
      })
    }
  }

  const logout = (): void => {
    localStorage.removeItem('neuro21_user')
    setAuthState({
      user: null,
      isLoading: false,
      error: null,
    })
  }

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    if (!authState.user) return

    const updatedUser = { ...authState.user, ...updates }
    localStorage.setItem('neuro21_user', JSON.stringify(updatedUser))
    setAuthState(prev => ({
      ...prev,
      user: updatedUser,
    }))
  }

  const contextValue: AuthContextType = {
    ...authState,
    connectWallet,
    disconnectWallet,
    login,
    register,
    logout,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Add ethereum types for TypeScript
declare global {
  interface Window {
    ethereum?: any
  }
}
