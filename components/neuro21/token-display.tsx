import { Coins } from "lucide-react"

interface TokenDisplayProps {
  balance: number
  className?: string
}

export function TokenDisplay({ balance, className = "" }: TokenDisplayProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Coins className="w-5 h-5 text-yellow-400" />
      <span className="font-semibold text-white">{balance.toLocaleString()}</span>
      <span className="text-gray-400 text-sm">$ADHD</span>
    </div>
  )
}
