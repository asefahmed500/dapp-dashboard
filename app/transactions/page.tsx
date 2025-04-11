import { Suspense } from "react"
import { TransactionList } from "@/components/transactions/transaction-list"
import { TransactionsSkeleton } from "@/components/transactions/transactions-skeleton"

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">View and manage your transactions</p>
      </div>

      <Suspense fallback={<TransactionsSkeleton />}>
        <TransactionList />
      </Suspense>
    </div>
  )
}
