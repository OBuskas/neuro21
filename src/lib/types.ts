export interface User {
  id: string
  metamaskId: string
  name: string
  email: string
  bio: string
  tokenBalance: number
  plan: "free" | "premium"
  tier: number
  nextBillingDate?: string
  connectedWallet: string
  type: "user" | "professional"
}

export interface Professional extends User {
  type: "professional"
  donatedSessions: number
  soldSessions: number
  pricePerSession: number
  csatRating: number
}

export interface JourneyGoal {
  id: string
  name: string
  description: string
  score: number
  maxScore: number
  icon: string
}

export interface DailyProgress {
  date: string
  goals: JourneyGoal[]
  tokensEarned: number
  completed: boolean
}

export interface Session {
  id: string
  professionalId: string
  userId: string
  type: "free" | "paid"
  duration: number
  cost: number
  date: string
  status: "scheduled" | "completed" | "cancelled"
}
