export const mockTransactions = [
  {
    id: "1",
    type: "send",
    amount: 1.5,
    from: "Wallet A",
    to: "Wallet B",
    timestamp: new Date(),
    status: "completed",
    token: "ETH",
    fee: 0.001,
    hash: "0x123",
  },
  {
    id: "2",
    type: "receive",
    amount: 2.0,
    from: "Wallet C",
    to: "Wallet A",
    timestamp: new Date(),
    status: "completed",
    token: "BTC",
    fee: 0,
    hash: "0x456",
  },
]

export const mockTokens = [
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    price: 3000,
    change24h: 0.05,
    volume: 1000000,
    marketCap: 360000000000,
    image: "/eth.png",
  },
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    price: 60000,
    change24h: -0.02,
    volume: 500000,
    marketCap: 1200000000000,
    image: "/btc.png",
  },
]

export const mockWallets = [
  {
    id: "wallet-a",
    name: "My Wallet A",
    address: "0xabc123",
    balance: 10.5,
    type: "hot",
    lastActivity: new Date(),
  },
  {
    id: "wallet-b",
    name: "Savings Wallet",
    address: "0xdef456",
    balance: 100.2,
    type: "cold",
    lastActivity: new Date(),
  },
]

export const mockAssets = [
  {
    id: "asset-eth",
    name: "Ethereum",
    symbol: "ETH",
    type: "token",
    balance: 5.2,
    value: 15600,
    chain: "Ethereum",
    contractAddress: "0x...",
    tokenId: null,
    image: "/eth.png",
  },
  {
    id: "asset-nft",
    name: "Cool NFT",
    symbol: "NFT",
    type: "nft",
    balance: 1,
    value: 500,
    chain: "Ethereum",
    contractAddress: "0x...",
    tokenId: "123",
    image: "/nft.png",
  },
]

export const mockDashboardMetrics = {
  totalBalance: 16100,
  totalTransactions: 150,
  activeWallets: 5,
  pendingTransactions: 2,
}

export const mockWalletActivity = [
  { month: "Jan", transactions: 5 },
  { month: "Feb", transactions: 10 },
  { month: "Mar", transactions: 8 },
  { month: "Apr", transactions: 12 },
  { month: "May", transactions: 7 },
]

export const mockTokenDistribution = [
  { token: "ETH", percentage: 60 },
  { token: "BTC", percentage: 30 },
  { token: "USDC", percentage: 10 },
]

export const mockTransactionActivity = [
  { date: "2024-01-01", sent: 5, received: 10 },
  { date: "2024-01-02", sent: 8, received: 5 },
  { date: "2024-01-03", sent: 2, received: 7 },
]

export const mockWalletBalanceHistory = [
  { date: "2024-01-01", balance: 10000 },
  { date: "2024-01-02", balance: 10500 },
  { date: "2024-01-03", balance: 11000 },
]

export const mockUserSettings = {
  id: "user-1",
  email: "test@example.com",
  notifications: {
    email: true,
    push: false,
    transactions: true,
  },
  theme: "light",
  currency: "USD",
  language: "en",
}
