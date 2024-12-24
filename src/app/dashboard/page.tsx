'use client'

import { ActivityLogger } from '@/components/activity-logger'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="container space-y-8 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Track your fitness progress and get insights
            </p>
          </div>
          <Button className="w-full md:w-auto">
            <Icons.plus className="mr-2 h-4 w-4" />
            Log Activity
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Icons.activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">Recent Activities</h2>
                <p className="text-sm text-muted-foreground">
                  View and log your workouts
                </p>
              </div>
            </div>
            <ActivityLogger />
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Icons.trendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">Progress</h2>
                <p className="text-sm text-muted-foreground">
                  Track your fitness goals
                </p>
              </div>
            </div>
            {/* Add progress component here */}
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Icons.brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">AI Insights</h2>
                <p className="text-sm text-muted-foreground">
                  Get personalized recommendations
                </p>
              </div>
            </div>
            {/* Add insights component here */}
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
