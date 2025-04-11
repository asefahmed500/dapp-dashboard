import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TokenDistribution } from "@/components/dashboard/token-distribution"
import { mockTokenDistribution } from "@/lib/mock-data"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your DApp portfolio and activity</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<MetricCardSkeleton />}>
          <MetricCard
            title="Total Balance"
            value="$16,100.00"
            description="Across all wallets"
            trend="+5.25%"
            trendDirection="up"
          />
        </Suspense>
        <Suspense fallback={<MetricCardSkeleton />}>
          <MetricCard
            title="Total Transactions"
            value="150"
            description="Last 30 days"
            trend="+12.5%"
            trendDirection="up"
          />
        </Suspense>
        <Suspense fallback={<MetricCardSkeleton />}>
          <MetricCard
            title="Active Wallets"
            value="5"
            description="Connected wallets"
            trend="0%"
            trendDirection="neutral"
          />
        </Suspense>
        <Suspense fallback={<MetricCardSkeleton />}>
          <MetricCard
            title="Pending Transactions"
            value="2"
            description="Awaiting confirmation"
            trend="-50%"
            trendDirection="down"
          />
        </Suspense>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<div className="h-[400px] rounded-lg bg-muted animate-pulse" />}>
          <TokenDistribution data={mockTokenDistribution} />
        </Suspense>

        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <TransactionItem
                type="send"
                amount="1.5 ETH"
                from="My Wallet"
                to="0x1234...5678"
                status="completed"
                timestamp="2 hours ago"
              />
              <TransactionItem
                type="receive"
                amount="2.0 BTC"
                from="0xabcd...efgh"
                to="My Wallet"
                status="completed"
                timestamp="1 day ago"
              />
              <TransactionItem
                type="swap"
                amount="500 USDC → 0.25 ETH"
                from="My Wallet"
                to="Uniswap"
                status="pending"
                timestamp="Just now"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  description,
  trend,
  trendDirection,
}: {
  title: string
  value: string
  description: string
  trend: string
  trendDirection: "up" | "down" | "neutral"
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div
          className={`mt-2 flex items-center text-xs ${
            trendDirection === "up" ? "text-green-500" : trendDirection === "down" ? "text-red-500" : "text-gray-500"
          }`}
        >
          {trendDirection === "up" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="mr-1 h-4 w-4"
            >
              <path d="m5 15 7-7 7 7" />
            </svg>
          )}
          {trendDirection === "down" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="mr-1 h-4 w-4"
            >
              <path d="m19 9-7 7-7-7" />
            </svg>
          )}
          {trend}
        </div>
      </CardContent>
    </Card>
  )
}

function MetricCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="h-4 w-24 rounded bg-muted animate-pulse" />
        <div className="h-4 w-4 rounded bg-muted animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="h-8 w-20 rounded bg-muted animate-pulse mb-2" />
        <div className="h-3 w-32 rounded bg-muted animate-pulse mb-2" />
        <div className="h-3 w-16 rounded bg-muted animate-pulse" />
      </CardContent>
    </Card>
  )
}

function TransactionItem({
  type,
  amount,
  from,
  to,
  status,
  timestamp,
}: {
  type: "send" | "receive" | "swap"
  amount: string
  from: string
  to: string
  status: "completed" | "pending" | "failed"
  timestamp: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div
          className={`rounded-full p-2 ${
            type === "send"
              ? "bg-red-100 text-red-600"
              : type === "receive"
                ? "bg-green-100 text-green-600"
                : "bg-blue-100 text-blue-600"
          }`}
        >
          {type === "send" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4"
            >
              <path d="m5 12 14 0" />
              <path d="m13 18 6-6-6-6" />
            </svg>
          )}
          {type === "receive" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4"
            >
              <path d="m19 12-14 0" />
              <path d="m11 18-6-6 6-6" />
            </svg>
          )}
          {type === "swap" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4"
            >
              <path d="m16 3 4 4-4 4" />
              <path d="M20 7H4" />
              <path d="m8 21-4-4 4-4" />
              <path d="M4 17h16" />
            </svg>
          )}
        </div>
        <div>
          <p className="text-sm font-medium">{amount}</p>
          <p className="text-xs text-muted-foreground">
            {type === "send" ? "To:" : type === "receive" ? "From:" : "Via:"}{" "}
            {type === "send" ? to : type === "receive" ? from : to}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`text-sm ${
            status === "completed" ? "text-green-500" : status === "pending" ? "text-yellow-500" : "text-red-500"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </p>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  )
}
