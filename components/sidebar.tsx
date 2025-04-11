"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Wallet, BarChart3, ArrowRightLeft, Settings, Coins, Package, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: ArrowRightLeft,
    },
    {
      name: "Tokens",
      path: "/tokens",
      icon: Coins,
    },
    {
      name: "Assets",
      path: "/assets",
      icon: Package,
    },
    {
      name: "Wallets",
      path: "/wallets",
      icon: Wallet,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Admin",
      path: "/admin",
      icon: ShieldCheck,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="hidden md:flex flex-col h-screen w-64 bg-card border-r">
      <div className="p-6">
        <h1 className="text-2xl font-bold">DApp Dashboard</h1>
      </div>
      <div className="flex-1 px-4 py-2 space-y-2">
        {routes.map((route) => (
          <Link key={route.path} href={route.path}>
            <Button variant="ghost" className={cn("w-full justify-start", pathname === route.path && "bg-accent")}>
              <route.icon className="mr-2 h-5 w-5" />
              {route.name}
            </Button>
          </Link>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            U
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">User</p>
            <p className="text-xs text-muted-foreground">user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
