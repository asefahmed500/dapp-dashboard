import { NextResponse } from "next/server"
import {
  connectToMongoDB,
  Transaction,
  Token,
  Wallet,
  Asset,
  Metrics,
  WalletActivity,
  TokenDistribution,
  TransactionActivity,
  WalletBalanceHistory,
  UserSettings,
} from "@/lib/mongoose"
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

export async function GET() {
  try {
    await connectToMongoDB()

    // Clear existing collections
    try {
      await Transaction.deleteMany({})
      await Token.deleteMany({})
      await Wallet.deleteMany({})
      await Asset.deleteMany({})
      await Metrics.deleteMany({})
      await WalletActivity.deleteMany({})
      await TokenDistribution.deleteMany({})
      await TransactionActivity.deleteMany({})
      await WalletBalanceHistory.deleteMany({})
      await UserSettings.deleteMany({})
    } catch (error) {
      console.error("Error clearing collections:", error)
      return NextResponse.json(
        {
          success: false,
          message: "Failed to clear existing collections",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 },
      )
    }

    // Insert mock data
    const transactionsResult = await Transaction.insertMany(mockTransactions)
    const tokensResult = await Token.insertMany(mockTokens)
    const walletsResult = await Wallet.insertMany(mockWallets)
    const assetsResult = await Asset.insertMany(mockAssets)
    const metricsResult = await Metrics.create(mockDashboardMetrics)
    const walletActivityResult = await WalletActivity.insertMany(mockWalletActivity)
    const tokenDistributionResult = await TokenDistribution.insertMany(mockTokenDistribution)
    const transactionActivityResult = await TransactionActivity.insertMany(mockTransactionActivity)
    const walletBalanceHistoryResult = await WalletBalanceHistory.insertMany(mockWalletBalanceHistory)
    const userSettingsResult = await UserSettings.create(mockUserSettings)

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully with Mongoose",
      counts: {
        transactions: transactionsResult.length,
        tokens: tokensResult.length,
        wallets: walletsResult.length,
        assets: assetsResult.length,
        metrics: metricsResult ? 1 : 0,
        walletActivity: walletActivityResult.length,
        tokenDistribution: tokenDistributionResult.length,
        transactionActivity: transactionActivityResult.length,
        walletBalanceHistory: walletBalanceHistoryResult.length,
        userSettings: userSettingsResult ? 1 : 0,
      },
    })
  } catch (error) {
    console.error("Error seeding database with Mongoose:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to seed database with Mongoose",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
