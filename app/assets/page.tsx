import { Suspense } from "react"
import { AssetList } from "@/components/assets/asset-list"
import { AssetsSkeleton } from "@/components/assets/assets-skeleton"

export default function AssetsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
        <p className="text-muted-foreground">Manage your digital assets</p>
      </div>

      <Suspense fallback={<AssetsSkeleton />}>
        <AssetList />
      </Suspense>
    </div>
  )
}
