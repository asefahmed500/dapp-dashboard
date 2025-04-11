import { Suspense } from "react"
import { WalletList } from "@/components/wallets/wallet-list"
import { WalletsSkeleton } from "@/components/wallets/wallets-skeleton"

export default function WalletsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Wallets</h1>
        <p className="text-muted-foreground">Manage your connected wallets</p>
      </div>

      <Suspense fallback={<WalletsSkeleton />}>
        <WalletList />
      </Suspense>
    </div>
  )
}
