import { NextResponse } from "next/server"
import { connectToMongoDB, Asset } from "@/lib/mongoose"
import { mockAssets } from "@/lib/mock-data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const chain = searchParams.get("chain")

    await connectToMongoDB()

    // Build query
    const query: any = {}
    if (type) query.type = type
    if (chain) query.chain = chain

    const assets = await Asset.find(query).sort({ value: -1 }).lean()

    return NextResponse.json({
      success: true,
      data: assets,
    })
  } catch (error) {
    console.error("Error fetching assets with Mongoose:", error)

    // Filter mock data based on query params
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const chain = searchParams.get("chain")

    let filteredAssets = [...mockAssets]

    if (type) {
      filteredAssets = filteredAssets.filter((a) => a.type === type)
    }

    if (chain) {
      filteredAssets = filteredAssets.filter((a) => a.chain === chain)
    }

    return NextResponse.json({
      success: true,
      data: filteredAssets,
    })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    await connectToMongoDB()

    // Generate a unique ID
    const id = `asset-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    // Create new asset
    const newAsset = await Asset.create({
      id,
      name: body.name,
      symbol: body.symbol,
      type: body.type,
      balance: body.balance,
      value: body.value,
      chain: body.chain,
      contractAddress: body.contractAddress,
      tokenId: body.tokenId,
      image: body.image || `/placeholder.svg?height=100&width=100`,
    })

    return NextResponse.json({
      success: true,
      data: newAsset,
      message: "Asset created successfully",
    })
  } catch (error) {
    console.error("Error creating asset with Mongoose:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Failed to create asset",
      },
      { status: 500 },
    )
  }
}
