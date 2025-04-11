import { ethers } from "ethers"

// Generate a random Ethereum-like address
export function generateWalletAddress(): string {
  const wallet = ethers.Wallet.createRandom()
  return wallet.address
}

// Generate a transaction hash
export function generateTransactionHash(): string {
  const randomBytes = ethers.randomBytes(32)
  return ethers.keccak256(randomBytes)
}

// Sign a message with a private key (simulated)
export function signMessage(message: string): string {
  const wallet = ethers.Wallet.createRandom()
  return wallet.signMessageSync(message)
}

// Verify a signature (simulated)
export function verifySignature(message: string, signature: string, address: string): boolean {
  try {
    const recoveredAddress = ethers.verifyMessage(message, signature)
    return recoveredAddress.toLowerCase() === address.toLowerCase()
  } catch (error) {
    return false
  }
}

// Create a simulated blockchain transaction
export function createBlockchainTransaction(from: string, to: string, amount: number, token: string) {
  const timestamp = Date.now()
  const nonce = Math.floor(Math.random() * 1000)
  const gasPrice = Math.floor(Math.random() * 100) + 20 // gwei
  const gasLimit = 21000
  const blockNumber = Math.floor(Math.random() * 10000) + 10000000

  const txData = {
    from,
    to,
    amount,
    token,
    timestamp,
    nonce,
    gasPrice,
    gasLimit,
    gasUsed: gasLimit,
    blockNumber,
    hash: generateTransactionHash(),
  }

  return txData
}

// Get current gas price (simulated)
export function getCurrentGasPrice(): number {
  return Math.floor(Math.random() * 100) + 20 // gwei
}

// Estimate gas for a transaction (simulated)
export function estimateGas(to: string, data = ""): number {
  // Basic transaction is 21000 gas
  let gas = 21000

  // Add gas for data
  if (data && data.length > 0) {
    // Each non-zero byte costs 68 gas, each zero byte costs 4 gas
    const nonZeroBytes = (data.match(/[1-9A-Fa-f]/g) || []).length
    const zeroBytes = (data.match(/0/g) || []).length
    gas += nonZeroBytes * 68 + zeroBytes * 4
  }

  return gas
}

// Convert between wei and ether
export function weiToEther(wei: string): string {
  return ethers.formatEther(wei)
}

export function etherToWei(ether: string): string {
  return ethers.parseEther(ether).toString()
}

// Get network information
export function getNetworkInfo() {
  return {
    networkId: process.env.NEXT_PUBLIC_NETWORK_ID || "1",
    chainName: process.env.NEXT_PUBLIC_CHAIN_NAME || "Ethereum",
    blockExplorerUrl: process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL || "https://etherscan.io",
  }
}
