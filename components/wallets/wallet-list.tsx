"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getWallets } from "@/lib/data"
import { formatCurrency, shortenAddress } from "@/lib/utils"
import { WalletBalanceChart } from "@/components/wallets/wallet-balance-chart"
import type { Wallet } from "@/lib/types"
import { mockWalletBalanceHistory } from "@/lib/mock-data"

export function WalletList() {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadWallets() {
      setLoading(true)
      try {
        const data = await getWallets()
        setWallets(data)
      } catch (error) {
        console.error("Error loading wallets:", error)
      } finally {
        setLoading(false)
      }
    }

    loadWallets()
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Wallets</CardTitle>
          <CardDescription>Manage your connected wallets</CardDescription>
          <div className="flex justify-end mt-4">
            <Button>Connect Wallet</Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : wallets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <p className="text-muted-foreground mb-4">No wallets connected</p>
              <Button>Connect Wallet</Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead className="hidden md:table-cell">Last Activity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wallets.map((wallet) => (
                    <TableRow key={wallet.id}>
                      <TableCell className="font-medium">{wallet.name}</TableCell>
                      <TableCell>{shortenAddress(wallet.address)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {wallet.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatCurrency(wallet.balance)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(wallet.lastActivity).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Wallet Balance History</CardTitle>
          <CardDescription>Track your wallet balance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <WalletBalanceChart data={mockWalletBalanceHistory} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
