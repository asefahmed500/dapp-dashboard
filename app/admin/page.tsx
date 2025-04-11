import { Suspense } from "react"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminSkeleton } from "@/components/admin/admin-skeleton"

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your DApp settings and data</p>
      </div>

      <Suspense fallback={<AdminSkeleton />}>
        <AdminDashboard />
      </Suspense>
    </div>
  )
}
