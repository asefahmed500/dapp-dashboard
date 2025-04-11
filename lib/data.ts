import { fetchWithFallback } from "@/lib/utils"
import {
  mockTransactions,
  mockTokens,
  mockWallets,
  mockAssets,
  mockDashboardMetrics,
  mockWalletActivity,
  mockTokenDistribution,
  mockTransactionActivity,
  mockWalletBalanceHistory,
  mockUserSettings,
} from "@/lib/mock-data"

import type {
  Transaction,
  Token,
  Wallet,
  Asset,
  DashboardMetrics,
  WalletActivityData,
  TokenDistributionData,
  TransactionActivityData,
  WalletBalanceHistoryData,
  UserSettings,
  ApiResponse,
} from "@/lib/types"

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

// Dashboard data
export async function getDashboardData(): Promise<{
  metrics: DashboardMetrics
  recentTransactions: Transaction[]
  popularTokens: Token[]
  walletActivity: WalletActivityData[]
  tokenDistribution: TokenDistributionData[]
  transactionActivity: TransactionActivityData[]
  walletBalanceHistory: WalletBalanceHistoryData[]
}> {
  try {
    // Try to fetch from Mongoose API first
    const data = await fetchWithFallback(`${API_URL}/dashboard-mongoose`)
    return data
  } catch (error) {
    console.error("Error fetching dashboard data:", error)

    // Fallback to mock data
    return {
      metrics: mockDashboardMetrics,
      recentTransactions: mockTransactions.slice(0, 5),
      popularTokens: mockTokens.slice(0, 5),
      walletActivity: mockWalletActivity,
      tokenDistribution: mockTokenDistribution,
      transactionActivity: mockTransactionActivity,
      walletBalanceHistory: mockWalletBalanceHistory,
    }
  }
}

// Transactions
export async function getTransactions(filters?: { type?: string; status?: string; token?: string }): Promise<
  Transaction[]
> {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams()
    if (filters?.type && filters.type !== "") queryParams.append("type", filters.type)
    if (filters?.status && filters.status !== "") queryParams.append("status", filters.status)
    if (filters?.token && filters.token !== "") queryParams.append("token", filters.token)

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ""

    // Try to fetch from Mongoose API first
    const response = await fetchWithFallback(`${API_URL}/transactions-mongoose${queryString}`)
    return response.data || []
  } catch (error) {
    console.error("Error fetching transactions:", error)

    // Fallback to mock data with filtering
    let filteredTransactions = [...mockTransactions]

    if (filters?.type && filters.type !== "") {
      filteredTransactions = filteredTransactions.filter((t) => t.type === filters.type)
    }

    if (filters?.status && filters.status !== "") {
      filteredTransactions = filteredTransactions.filter((t) => t.status === filters.status)
    }

    if (filters?.token && filters.token !== "") {
      filteredTransactions = filteredTransactions.filter((t) => t.token === filters.token)
    }

    return filteredTransactions
  }
}

export async function getTransactionById(id: string): Promise<Transaction | null> {
  try {
    // Try to fetch from Mongoose API first
    const response = await fetchWithFallback(`${API_URL}/transactions-mongoose/${id}`)
    return response.data || null
  } catch (error) {
    console.error(`Error fetching transaction ${id}:`, error)

    // Fallback to mock data
    const transaction = mockTransactions.find((t) => t.id === id)
    return transaction || null
  }
}

export async function createTransaction(
  transaction: Omit<Transaction, "id" | "timestamp" | "status">,
): Promise<ApiResponse<Transaction>> {
  try {
    const response = await fetch(`${API_URL}/transactions-mongoose`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating transaction:", error)
    throw error
  }
}

// Tokens
export async function getTokens(sortBy?: string, sortOrder?: "asc" | "desc"): Promise<Token[]> {
  try {
    // Build query string
    const queryParams = new URLSearchParams()
    if (sortBy) queryParams.append("sortBy", sortBy)
    if (sortOrder) queryParams.append("sortOrder", sortOrder)

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ""

    // Try to fetch from Mongoose API first
    const response = await fetchWithFallback(`${API_URL}/tokens-mongoose${queryString}`)
    return response.data || []
  } catch (error) {
    console.error("Error fetching tokens:", error)

    // Fallback to mock data with sorting
    const sortedTokens = [...mockTokens]

    if (sortBy) {
      sortedTokens.sort((a: any, b: any) => {
        if (sortOrder === "desc") {
          return b[sortBy] - a[sortBy]
        }
        return a[sortBy] - b[sortBy]
      })
    }

    return sortedTokens
  }
}

export async function getTokenById(id: string): Promise<Token | null> {
  try {
    // Try to fetch from Mongoose API first
    const response = await fetchWithFallback(`${API_URL}/tokens-mongoose/${id}`)
    return response.data || null
  } catch (error) {
    console.error(`Error fetching token ${id}:`, error)

    // Fallback to mock data
    const token = mockTokens.find((t) => t.id === id)
    return token || null
  }
}

// Wallets
export async function getWallets(): Promise<Wallet[]> {
  try {
    // Try to fetch from Mongoose API first
    const response = await fetchWithFallback(`${API_URL}/wallets-mongoose`)
    return response.data || []
  } catch (error) {
    console.error("Error fetching wallets:", error)

    // Fallback to mock data
    return mockWallets
  }
}

export async function getWalletById(id: string): Promise<Wallet | null> {
  try {
    // Try to fetch from Mongoose API first
    const response = await fetchWithFallback(`${API_URL}/wallets-mongoose/${id}`)
    return response.data || null
  } catch (error) {
    console.error(`Error fetching wallet ${id}:`, error)

    // Fallback to mock data
    const wallet = mockWallets.find((w) => w.id === id)
    return wallet || null
  }
}

// Assets
export async function getAssets(filters?: { type?: string; chain?: string }): Promise<Asset[]> {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams()
    if (filters?.type && filters.type !== "") queryParams.append("type", filters.type)
    if (filters?.chain && filters.chain !== "") queryParams.append("chain", filters.chain)

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ""

    // Try to fetch from Mongoose API first
    const response = await fetchWithFallback(`${API_URL}/assets-mongoose${queryString}`)
    return response.data || []
  } catch (error) {
    console.error("Error fetching assets:", error)

    // Fallback to mock data with filtering
    let filteredAssets = [...mockAssets]

    if (filters?.type && filters.type !== "") {
      filteredAssets = filteredAssets.filter((a) => a.type === filters.type)
    }

    if (filters?.chain && filters.chain !== "") {
      filteredAssets = filteredAssets.filter((a) => a.chain === filters.chain)
    }

    return filteredAssets
  }
}

export async function getAssetById(id: string): Promise<Asset | null> {
  try {
    // Try to fetch from Mongoose API first
    const response = await fetchWithFallback(`${API_URL}/assets-mongoose/${id}`)
    return response.data || null
  } catch (error) {
    console.error(`Error fetching asset ${id}:`, error)

    // Fallback to mock data
    const asset = mockAssets.find((a) => a.id === id)
    return asset || null
  }
}

export async function createAsset(asset: Omit<Asset, "id">): Promise<ApiResponse<Asset>> {
  try {
    const response = await fetch(`${API_URL}/assets-mongoose`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(asset),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating asset:", error)
    throw error
  }
}

// User Settings
export async function getUserSettings(): Promise<UserSettings> {
  try {
    // Try to fetch from Mongoose API first
    const response = await fetchWithFallback(`${API_URL}/settings-mongoose`)
    return response.data || mockUserSettings
  } catch (error) {
    console.error("Error fetching user settings:", error)

    // Fallback to mock data
    return mockUserSettings
  }
}

export async function updateUserSettings(settings: Partial<UserSettings>): Promise<ApiResponse<UserSettings>> {
  try {
    const response = await fetch(`${API_URL}/settings-mongoose`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error updating user settings:", error)
    throw error
  }
}

// Database seeding
export async function seedDatabase(): Promise<ApiResponse<any>> {
  try {
    // Try to seed with Mongoose first
    const response = await fetch(`${API_URL}/seed-mongoose`, {
      method: "GET",
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error seeding database:", error)
    throw error
  }
}
