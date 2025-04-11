import { NextResponse } from "next/server"
import {
  connectToMongoDB,
  Transaction,
  Token,
  Metrics,
  WalletActivity,
  TokenDistribution,
  TransactionActivity,
  WalletBalanceHistory,
} from "@/lib/mongoose"
import {
  mockTransactions,
  mockTokens,
  mockDashboardMetrics,
  mockWalletActivity,
  mockTokenDistribution,
  mockTransactionActivity,
  mockWalletBalanceHistory,
} from "@/lib/mock-data"

export async function GET() {
  try {
    await connectToMongoDB()

    // Fetch data from MongoDB
    const metrics = await Metrics.findOne({}).lean()
    const recentTransactions = await Transaction.find({}).sort({ timestamp: -1 }).limit(5).lean()
    const popularTokens = await Token.find({}).sort({ volume: -1 }).limit(5).lean()
    const walletActivity = await WalletActivity.find({}).lean()
    const tokenDistribution = await TokenDistribution.find({}).lean()
    const transactionActivity = await TransactionActivity.find({}).lean()
    const walletBalanceHistory = await WalletBalanceHistory.find({}).lean()

    return NextResponse.json({
      metrics: metrics || mockDashboardMetrics,
      recentTransactions: recentTransactions.length > 0 ? recentTransactions : mockTransactions.slice(0, 5),
      popularTokens: popularTokens.length > 0 ? popularTokens : mockTokens.slice(0, 5),
      walletActivity: walletActivity.length > 0 ? walletActivity : mockWalletActivity,
      tokenDistribution: tokenDistribution.length > 0 ? tokenDistribution : mockTokenDistribution,
      transactionActivity: transactionActivity.length > 0 ? transactionActivity : mockTransactionActivity,
      walletBalanceHistory: walletBalanceHistory.length > 0 ? walletBalanceHistory : mockWalletBalanceHistory,
    })
  } catch (error) {
    console.error("Error fetching dashboard data with Mongoose:", error)

    // Return mock data as fallback
    return NextResponse.json({
      metrics: mockDashboardMetrics,
      recentTransactions: mockTransactions.slice(0, 5),
      popularTokens: mockTokens.slice(0, 5),
      walletActivity: mockWalletActivity,
      tokenDistribution: mockTokenDistribution,
      transactionActivity: mockTransactionActivity,
      walletBalanceHistory: mockWalletBalanceHistory,
    })
  }
}
