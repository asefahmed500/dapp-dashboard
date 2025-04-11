import { Suspense } from "react"
import { SettingsForm } from "@/components/settings/settings-form"
import { SettingsSkeleton } from "@/components/settings/settings-skeleton"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsForm />
      </Suspense>
    </div>
  )
}
