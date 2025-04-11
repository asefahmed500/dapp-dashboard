import mongoose from "mongoose"

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/dapp-dashboard"

// Cache the mongoose connection
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToMongoDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

// Mongoose models
const TransactionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true, enum: ["send", "receive", "swap", "stake", "unstake"] },
  amount: { type: Number, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, required: true, enum: ["completed", "pending", "failed"] },
  token: { type: String },
  fee: { type: Number },
  hash: { type: String },
})

const TokenSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  change24h: { type: Number, required: true },
  volume: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  image: { type: String },
})

const WalletSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  balance: { type: Number, required: true },
  type: { type: String, required: true },
  lastActivity: { type: Date, default: Date.now },
})

const AssetSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  type: { type: String, required: true, enum: ["token", "nft", "defi"] },
  balance: { type: Number, required: true },
  value: { type: Number, required: true },
  chain: { type: String, required: true },
  contractAddress: { type: String },
  tokenId: { type: String },
  image: { type: String },
})

const MetricsSchema = new mongoose.Schema({
  totalBalance: { type: Number, required: true },
  totalTransactions: { type: Number, required: true },
  activeWallets: { type: Number, required: true },
  pendingTransactions: { type: Number, required: true },
})

const WalletActivitySchema = new mongoose.Schema({
  month: { type: String, required: true },
  transactions: { type: Number, required: true },
})

const TokenDistributionSchema = new mongoose.Schema({
  token: { type: String, required: true },
  percentage: { type: Number, required: true },
})

const TransactionActivitySchema = new mongoose.Schema({
  date: { type: String, required: true },
  sent: { type: Number, required: true },
  received: { type: Number, required: true },
})

const WalletBalanceHistorySchema = new mongoose.Schema({
  date: { type: String, required: true },
  balance: { type: Number, required: true },
})

const UserSettingsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  notifications: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: false },
    transactions: { type: Boolean, default: true },
  },
  theme: { type: String, default: "system" },
  currency: { type: String, default: "USD" },
  language: { type: String, default: "en" },
})

// Create models
export const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema)
export const Token = mongoose.models.Token || mongoose.model("Token", TokenSchema)
export const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", WalletSchema)
export const Asset = mongoose.models.Asset || mongoose.model("Asset", AssetSchema)
export const Metrics = mongoose.models.Metrics || mongoose.model("Metrics", MetricsSchema)
export const WalletActivity = mongoose.models.WalletActivity || mongoose.model("WalletActivity", WalletActivitySchema)
export const TokenDistribution =
  mongoose.models.TokenDistribution || mongoose.model("TokenDistribution", TokenDistributionSchema)
export const TransactionActivity =
  mongoose.models.TransactionActivity || mongoose.model("TransactionActivity", TransactionActivitySchema)
export const WalletBalanceHistory =
  mongoose.models.WalletBalanceHistory || mongoose.model("WalletBalanceHistory", WalletBalanceHistorySchema)
export const UserSettings = mongoose.models.UserSettings || mongoose.model("UserSettings", UserSettingsSchema)
