import { NextResponse } from "next/server"
import { connectToMongoDB, Transaction } from "@/lib/mongoose"
import { mockTransactions } from "@/lib/mock-data"
import { generateTransactionHash } from "@/lib/blockchain"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const status = searchParams.get("status")
    const token = searchParams.get("token")

    await connectToMongoDB()

    // Build query
    const query: any = {}
    if (type) query.type = type
    if (status) query.status = status
    if (token) query.token = token

    const transactions = await Transaction.find(query).sort({ timestamp: -1 }).lean()

    return NextResponse.json({
      success: true,
      data: transactions,
    })
  } catch (error) {
    console.error("Error fetching transactions with Mongoose:", error)

    // Filter mock data based on query params
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const status = searchParams.get("status")
    const token = searchParams.get("token")

    let filteredTransactions = [...mockTransactions]

    if (type) {
      filteredTransactions = filteredTransactions.filter((t) => t.type === type)
    }

    if (status) {
      filteredTransactions = filteredTransactions.filter((t) => t.status === status)
    }

    if (token) {
      filteredTransactions = filteredTransactions.filter((t) => t.token === token)
    }

    return NextResponse.json({
      success: true,
      data: filteredTransactions,
    })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    await connectToMongoDB()

    // Generate a unique ID and hash
    const id = `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    const hash = generateTransactionHash()

    // Create new transaction
    const newTransaction = await Transaction.create({
      id,
      type: body.type,
      amount: body.amount,
      from: body.from,
      to: body.to,
      timestamp: new Date(),
      status: "pending", // New transactions start as pending
      token: body.token,
      fee: body.fee || 0.001,
      hash,
    })

    return NextResponse.json({
      success: true,
      data: newTransaction,
      message: "Transaction created successfully",
    })
  } catch (error) {
    console.error("Error creating transaction with Mongoose:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Failed to create transaction",
      },
      { status: 500 },
    )
  }
}
