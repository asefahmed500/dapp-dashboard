import { NextResponse } from "next/server"
import { connectToMongoDB, Transaction } from "@/lib/mongoose"
import { mockTransactions } from "@/lib/mock-data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    await connectToMongoDB()

    const transaction = await Transaction.findOne({ id }).lean()

    if (!transaction) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: transaction,
    })
  } catch (error) {
    console.error(`Error fetching transaction ${params.id} with Mongoose:`, error)

    // Fallback to mock data
    const transaction = mockTransactions.find((t) => t.id === params.id)

    if (!transaction) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: transaction,
    })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    await connectToMongoDB()

    const transaction = await Transaction.findOne({ id })

    if (!transaction) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction not found",
        },
        { status: 404 },
      )
    }

    // Update transaction
    const updatedTransaction = await Transaction.findOneAndUpdate({ id }, { $set: body }, { new: true }).lean()

    return NextResponse.json({
      success: true,
      data: updatedTransaction,
      message: "Transaction updated successfully",
    })
  } catch (error) {
    console.error(`Error updating transaction ${params.id} with Mongoose:`, error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Failed to update transaction",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    await connectToMongoDB()

    const transaction = await Transaction.findOne({ id })

    if (!transaction) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction not found",
        },
        { status: 404 },
      )
    }

    // Delete transaction
    await Transaction.deleteOne({ id })

    return NextResponse.json({
      success: true,
      message: "Transaction deleted successfully",
    })
  } catch (error) {
    console.error(`Error deleting transaction ${params.id} with Mongoose:`, error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Failed to delete transaction",
      },
      { status: 500 },
    )
  }
}
