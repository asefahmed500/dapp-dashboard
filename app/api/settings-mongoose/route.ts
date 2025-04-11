import { NextResponse } from "next/server"
import { connectToMongoDB, UserSettings } from "@/lib/mongoose"
import { mockUserSettings } from "@/lib/mock-data"

export async function GET() {
  try {
    await connectToMongoDB()

    // Get user settings (assuming a single user for simplicity)
    const settings = await UserSettings.findOne({}).lean()

    if (!settings) {
      // If no settings exist, return mock settings
      return NextResponse.json({
        success: true,
        data: mockUserSettings,
      })
    }

    return NextResponse.json({
      success: true,
      data: settings,
    })
  } catch (error) {
    console.error("Error fetching user settings with Mongoose:", error)

    // Fallback to mock data
    return NextResponse.json({
      success: true,
      data: mockUserSettings,
    })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()

    await connectToMongoDB()

    // Find existing settings or create new ones
    let settings = await UserSettings.findOne({})

    if (!settings) {
      // Create new settings if none exist
      settings = await UserSettings.create({
        id: "user-1",
        email: body.email || "user@example.com",
        notifications: body.notifications || {
          email: true,
          push: false,
          transactions: true,
        },
        theme: body.theme || "light",
        currency: body.currency || "USD",
        language: body.language || "en",
      })
    } else {
      // Update existing settings
      settings = await UserSettings.findOneAndUpdate({ id: settings.id }, { $set: body }, { new: true })
    }

    return NextResponse.json({
      success: true,
      data: settings,
      message: "Settings updated successfully",
    })
  } catch (error) {
    console.error("Error updating user settings with Mongoose:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Failed to update settings",
      },
      { status: 500 },
    )
  }
}
