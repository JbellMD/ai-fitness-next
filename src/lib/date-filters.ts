import { Activity } from "@/types"

export function filterDataByDate(activities: Activity[], filterType: string) {
  const now = new Date()
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime()
  const startOfWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay()
  ).getTime()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
  const startOfYear = new Date(now.getFullYear(), 0, 1).getTime()

  return activities.filter((activity) => {
    const activityTime = activity.timestampNum

    switch (filterType) {
      case "day":
        return activityTime >= startOfDay
      case "week":
        return activityTime >= startOfWeek
      case "month":
        return activityTime >= startOfMonth
      case "year":
        return activityTime >= startOfYear
      default:
        return true
    }
  })
}
