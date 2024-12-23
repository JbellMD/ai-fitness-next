"use client"

import { ActivityLogger } from "@/components/activity-logger"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <ActivityLogger />
      </div>
    </ProtectedRoute>
  )
}
