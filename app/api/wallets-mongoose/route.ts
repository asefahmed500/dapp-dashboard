import { NextResponse } from "next/server"
import { connectToMongoDB, Wallet } from "@/lib/mongoose"
import { mockWallets } from "@/lib/mock-data"
import { generateWalletAddress } from "@/lib/blockchain"

export async function GET() {
  try {
    await connectToMongoDB()

    const wallets = await Wallet.find({}).sort({ balance: -1 }).lean()

    return NextResponse.json({
      success: true,
      data: wallets,
    })
  } catch (error) {
    console.error("Error fetching wallets with Mongoose:", error)

    // Fallback to mock data
    return NextResponse.json({
      success: true,
      data: mockWallets,
    })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    await connectToMongoDB()

    // Generate a unique ID and address if not provided
    const id = body.id || `wallet-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    const address = body.address || generateWalletAddress()

    // Create new wallet
    const newWallet = await Wallet.create({
      id,
      name: body.name,
      address,
      balance: body.balance || 0,
      type: body.type || "hot",
      lastActivity: new Date(),
    })

    return NextResponse.json({
      success: true,
      data: newWallet,
      message: "Wallet created successfully",
    })
  } catch (error) {
    console.error("Error creating wallet with Mongoose:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Failed to create wallet",
      },
      { status: 500 },
    )
  }
}
