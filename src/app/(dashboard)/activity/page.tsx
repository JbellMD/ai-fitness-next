import { ActivityLogger } from "@/components/activity-logger"

export default function ActivityPage() {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Activity Tracking</h1>
      <ActivityLogger />
    </div>
  )
}
