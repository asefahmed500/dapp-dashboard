// This script can be used to seed the database from the command line
// Run with: npx ts-node scripts/seed.ts

async function seedDatabase() {
  try {
    // Determine the base URL (use localhost for local development)
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

    console.log("Seeding database...")
    console.log(`Using API URL: ${baseUrl}`)

    // Call the seed endpoint
    const response = await fetch(`${baseUrl}/seed-mongoose`)
    const data = await response.json()

    if (data.success) {
      console.log("✅ Database seeded successfully!")
      console.log("Data inserted:")
      console.log(data.counts)
    } else {
      console.error("❌ Failed to seed database:", data.message)
      if (data.error) {
        console.error("Error details:", data.error)
      }
    }
  } catch (error) {
    console.error("❌ Error seeding database:", error instanceof Error ? error.message : "Unknown error")
  }
}

seedDatabase()
