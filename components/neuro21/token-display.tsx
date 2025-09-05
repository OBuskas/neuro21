import { Badge } from "@/components/ui/badge"
import { Flame } from "lucide-react"

interface TokenDisplayProps {
  balance: number
  className?: string
}

export function TokenDisplay({ balance = 0, className = "" }: TokenDisplayProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Badge variant="outline" className="gap-1.5 px-3 py-1.5 text-sm">
        <Flame className="h-4 w-4 text-amber-500" />
        <span className="font-mono font-medium">{balance.toLocaleString()}</span>
        <span>#HEAL</span>
      </Badge>
    </div>
  )
}
