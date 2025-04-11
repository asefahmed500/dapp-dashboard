// Transaction types
export interface Transaction {
  id: string
  type: "send" | "receive" | "swap" | "stake" | "unstake"
  amount: number
  from: string
  to: string
  timestamp: Date
  status: "completed" | "pending" | "failed"
  token: string
  fee?: number
  hash?: string
}

// Token types
export interface Token {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  volume: number
  marketCap: number
  image?: string
}

// Wallet types
export interface Wallet {
  id: string
  name: string
  address: string
  balance: number
  type: string
  lastActivity: Date
}

// Asset types
export interface Asset {
  id: string
  name: string
  symbol: string
  type: "token" | "nft" | "defi"
  balance: number
  value: number
  chain: string
  contractAddress?: string
  tokenId?: string
  image?: string
}

// Dashboard metrics
export interface DashboardMetrics {
  totalBalance: number
  totalTransactions: number
  activeWallets: number
  pendingTransactions: number
}

// Chart data types
export interface WalletActivityData {
  month: string
  transactions: number
}

export interface TokenDistributionData {
  token: string
  percentage: number
}

export interface TransactionActivityData {
  date: string
  sent: number
  received: number
}

export interface WalletBalanceHistoryData {
  date: string
  balance: number
}

// User settings
export interface UserSettings {
  id: string
  email: string
  notifications: {
    email: boolean
    push: boolean
    transactions: boolean
  }
  theme: "light" | "dark" | "system"
  currency: string
  language: string
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Form types
export interface TransactionFormValues {
  type: "send" | "receive" | "swap" | "stake" | "unstake"
  amount: number
  from: string
  to: string
  token: string
}

export interface AssetFormValues {
  name: string
  symbol: string
  type: "token" | "nft" | "defi"
  balance: number
  value: number
  chain: string
  contractAddress?: string
  tokenId?: string
}

export interface SettingsFormValues {
  email: string
  notifications: {
    email: boolean
    push: boolean
    transactions: boolean
  }
  theme: "light" | "dark" | "system"
  currency: string
  language: string
}
