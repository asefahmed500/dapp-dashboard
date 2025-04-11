import { NextResponse } from "next/server"
import { connectToMongoDB, Token } from "@/lib/mongoose"
import { mockTokens } from "@/lib/mock-data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sortBy = searchParams.get("sortBy") || "marketCap"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    await connectToMongoDB()

    // Build sort object
    const sort: any = {}
    sort[sortBy] = sortOrder === "asc" ? 1 : -1

    const tokens = await Token.find({}).sort(sort).lean()

    return NextResponse.json({
      success: true,
      data: tokens,
    })
  } catch (error) {
    console.error("Error fetching tokens with Mongoose:", error)

    // Sort mock data based on query params
    const { searchParams } = new URL(request.url)
    const sortBy = searchParams.get("sortBy") || "marketCap"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    const sortedTokens = [...mockTokens]

    sortedTokens.sort((a: any, b: any) => {
      if (sortOrder === "desc") {
        return b[sortBy] - a[sortBy]
      }
      return a[sortBy] - b[sortBy]
    })

    return NextResponse.json({
      success: true,
      data: sortedTokens,
    })
  }
}
