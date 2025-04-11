import { Suspense } from "react"
import { TokenList } from "@/components/tokens/token-list"
import { TokensSkeleton } from "@/components/tokens/tokens-skeleton"

export default function TokensPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tokens</h1>
        <p className="text-muted-foreground">Track your token portfolio</p>
      </div>

      <Suspense fallback={<TokensSkeleton />}>
        <TokenList />
      </Suspense>
    </div>
  )
}
