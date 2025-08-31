import { Coins, ExternalLink } from "lucide-react"
import Link from "next/link"

interface TokenDisplayProps {
  balance: number
  className?: string
  showExplorerLink?: boolean
  contractAddress?: string
}

export function TokenDisplay({
  balance,
  className = "",
  showExplorerLink = false,
  contractAddress
}: TokenDisplayProps) {
  const formattedBalance = typeof balance === 'string'
    ? parseFloat(balance).toLocaleString()
    : balance.toLocaleString()

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Coins className="w-5 h-5 text-yellow-400" />
      <span className="font-semibold text-white">{formattedBalance}</span>
      <span className="text-gray-400 text-sm">$ADHD</span>

      {showExplorerLink && contractAddress && (
        <Link
          href={`https://basescan.org/token/${contractAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-yellow-400 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
        </Link>
      )}
    </div>
  )
}
