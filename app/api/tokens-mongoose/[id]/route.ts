import { NextResponse } from "next/server"
import { connectToMongoDB, Token } from "@/lib/mongoose"
import { mockTokens } from "@/lib/mock-data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    await connectToMongoDB()

    const token = await Token.findOne({ id }).lean()

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Token not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: token,
    })
  } catch (error) {
    console.error(`Error fetching token ${params.id} with Mongoose:`, error)

    // Fallback to mock data
    const token = mockTokens.find((t) => t.id === params.id)

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Token not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: token,
    })
  }
}
