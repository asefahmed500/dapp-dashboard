"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { getTokens } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import type { Token } from "@/lib/types"

export function TokenList() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("marketCap")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    async function loadTokens() {
      setLoading(true)
      try {
        const data = await getTokens(sortBy, sortOrder)
        setTokens(data)
      } catch (error) {
        console.error("Error loading tokens:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTokens()
  }, [sortBy, sortOrder])

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tokens</CardTitle>
        <CardDescription>Track your token portfolio and market data</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : tokens.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-muted-foreground mb-4">No tokens found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("price")}
                      className="flex items-center p-0 h-auto font-medium"
                    >
                      Price
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("change24h")}
                      className="flex items-center p-0 h-auto font-medium"
                    >
                      24h Change
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("volume")}
                      className="flex items-center p-0 h-auto font-medium"
                    >
                      Volume
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("marketCap")}
                      className="flex items-center p-0 h-auto font-medium"
                    >
                      Market Cap
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokens.map((token) => (
                  <TableRow key={token.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="w-8 h-8 mr-2 rounded-full bg-muted flex items-center justify-center">
                          {token.symbol.charAt(0)}
                        </div>
                        <div>
                          <div>{token.name}</div>
                          <div className="text-xs text-muted-foreground">{token.symbol}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(token.price)}</TableCell>
                    <TableCell>
                      <span className={token.change24h >= 0 ? "text-green-500" : "text-red-500"}>
                        {token.change24h >= 0 ? "+" : ""}
                        {(token.change24h * 100).toFixed(2)}%
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{formatCurrency(token.volume)}</TableCell>
                    <TableCell className="hidden md:table-cell">{formatCurrency(token.marketCap)}</TableCell>
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
  )
}
