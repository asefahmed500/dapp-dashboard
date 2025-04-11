"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { seedDatabase } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export function AdminDashboard() {
  const [seeding, setSeeding] = useState(false)
  const { toast } = useToast()

  async function handleSeedDatabase() {
    setSeeding(true)
    try {
      const result = await seedDatabase()
      if (result.success) {
        toast({
          title: "Database seeded",
          description: "The database has been seeded successfully.",
        })
      } else {
        throw new Error(result.message || "Failed to seed database")
      }
    } catch (error) {
      console.error("Error seeding database:", error)
      toast({
        title: "Error",
        description: "Failed to seed database. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSeeding(false)
    }
  }

  return (
    <Tabs defaultValue="database">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="database">Database</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
        <TabsTrigger value="environment">Environment</TabsTrigger>
      </TabsList>

      <TabsContent value="database" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Database Management</CardTitle>
            <CardDescription>Manage your database and seed data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Seed Database</h3>
              <p className="text-sm text-muted-foreground">
                Seed your database with mock data for testing and development. This will replace any existing data.
              </p>
              <Button onClick={handleSeedDatabase} disabled={seeding}>
                {seeding ? "Seeding..." : "Seed Database"}
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Database Status</h3>
              <div className="rounded-md bg-muted p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Connection:</span>
                  <span className="text-sm text-green-500">Connected</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Database:</span>
                  <span className="text-sm">{process.env.MONGODB_DB || "dapp-dashboard"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Collections:</span>
                  <span className="text-sm">10</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mongoose Admin</CardTitle>
            <CardDescription>Manage your Mongoose models and data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Access the Mongoose Admin Dashboard to manage your models and data.
              </p>
              <Button variant="outline">Open Mongoose Admin</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="api" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>API Endpoints</CardTitle>
            <CardDescription>View and test your API endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <h3 className="text-sm font-medium mb-2">GET /api/transactions</h3>
                <p className="text-xs text-muted-foreground mb-2">Get all transactions with optional filtering.</p>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Test
                  </Button>
                  <span className="text-xs text-green-500">200 OK</span>
                </div>
              </div>

              <div className="rounded-md bg-muted p-4">
                <h3 className="text-sm font-medium mb-2">GET /api/tokens</h3>
                <p className="text-xs text-muted-foreground mb-2">Get all tokens with optional sorting.</p>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Test
                  </Button>
                  <span className="text-xs text-green-500">200 OK</span>
                </div>
              </div>

              <div className="rounded-md bg-muted p-4">
                <h3 className="text-sm font-medium mb-2">GET /api/wallets</h3>
                <p className="text-xs text-muted-foreground mb-2">Get all wallets.</p>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Test
                  </Button>
                  <span className="text-xs text-green-500">200 OK</span>
                </div>
              </div>

              <div className="rounded-md bg-muted p-4">
                <h3 className="text-sm font-medium mb-2">GET /api/assets</h3>
                <p className="text-xs text-muted-foreground mb-2">Get all assets with optional filtering.</p>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Test
                  </Button>
                  <span className="text-xs text-green-500">200 OK</span>
                </div>
              </div>

              <div className="rounded-md bg-muted p-4">
                <h3 className="text-sm font-medium mb-2">GET /api/dashboard</h3>
                <p className="text-xs text-muted-foreground mb-2">Get dashboard data.</p>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Test
                  </Button>
                  <span className="text-xs text-green-500">200 OK</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="environment" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>View your environment configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-muted p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">MONGODB_URI:</span>
                <span className="text-sm">******</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">MONGODB_DB:</span>
                <span className="text-sm">{process.env.MONGODB_DB || "dapp-dashboard"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">PORT:</span>
                <span className="text-sm">{process.env.PORT || "3000"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">HOST:</span>
                <span className="text-sm">{process.env.HOST || "localhost"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">NEXT_PUBLIC_API_URL:</span>
                <span className="text-sm">{process.env.NEXT_PUBLIC_API_URL || "/api"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">NODE_ENV:</span>
                <span className="text-sm">{process.env.NODE_ENV || "development"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>View system information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-muted p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Next.js Version:</span>
                <span className="text-sm">14.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Node.js Version:</span>
                <span className="text-sm">18.x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">MongoDB Version:</span>
                <span className="text-sm">6.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Mongoose Version:</span>
                <span className="text-sm">8.1.1</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
