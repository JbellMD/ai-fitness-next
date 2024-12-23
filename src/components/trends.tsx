"use client"

import { useEffect, useState } from "react"
import { database } from "@/lib/firebase"
import { ref, onValue } from "firebase/database"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Card } from "./ui/card"
import { Skeleton } from "./ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface Activity {
  activity: string
  duration: number
  intensity: string
  timestamp: string
  timestampNum: number
}

interface Meal {
  foodName: string
  calories: number
  mealType: string
  timestamp: string
}

export function Trends() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [meals, setMeals] = useState<Meal[]>([])
  const [activityTrend, setActivityTrend] = useState<any>(null)
  const [caloriesTrend, setCaloriesTrend] = useState<any>(null)
  const [timeRange, setTimeRange] = useState("week")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = () => {
      const activitiesRef = ref(database, "activities")
      const mealsRef = ref(database, "meals")

      onValue(activitiesRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          const fetchedActivities = Object.values(data) as Activity[]
          setActivities(fetchedActivities)
          prepareActivityTrend(fetchedActivities)
        }
      })

      onValue(mealsRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          const fetchedMeals = Object.values(data) as Meal[]
          setMeals(fetchedMeals)
          prepareCaloriesTrend(fetchedMeals)
        }
      })

      setLoading(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (activities.length > 0) {
      prepareActivityTrend(activities)
    }
    if (meals.length > 0) {
      prepareCaloriesTrend(meals)
    }
  }, [timeRange, activities, meals])

  const filterDataByTimeRange = (data: any[], timestampKey: string) => {
    const now = new Date()
    const timeRanges = {
      week: now.getTime() - 7 * 24 * 60 * 60 * 1000,
      month: now.getTime() - 30 * 24 * 60 * 60 * 1000,
      year: now.getTime() - 365 * 24 * 60 * 60 * 1000,
    }

    return data.filter((item) => {
      const itemTime = new Date(item[timestampKey]).getTime()
      return itemTime >= timeRanges[timeRange as keyof typeof timeRanges]
    })
  }

  const prepareActivityTrend = (data: Activity[]) => {
    const filteredData = filterDataByTimeRange(data, "timestamp")
    const groupedData = filteredData.reduce((acc: Record<string, number>, activity) => {
      const date = new Date(activity.timestamp).toLocaleDateString()
      acc[date] = (acc[date] || 0) + activity.duration
      return acc
    }, {})

    const sortedDates = Object.keys(groupedData).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    )

    setActivityTrend({
      labels: sortedDates,
      datasets: [
        {
          label: "Activity Duration (minutes)",
          data: sortedDates.map((date) => groupedData[date]),
          borderColor: "hsl(var(--primary))",
          backgroundColor: "hsl(var(--primary) / 0.2)",
          tension: 0.4,
        },
      ],
    })
  }

  const prepareCaloriesTrend = (data: Meal[]) => {
    const filteredData = filterDataByTimeRange(data, "timestamp")
    const groupedData = filteredData.reduce((acc: Record<string, number>, meal) => {
      const date = new Date(meal.timestamp).toLocaleDateString()
      acc[date] = (acc[date] || 0) + meal.calories
      return acc
    }, {})

    const sortedDates = Object.keys(groupedData).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    )

    setCaloriesTrend({
      labels: sortedDates,
      datasets: [
        {
          label: "Calories Consumed",
          data: sortedDates.map((date) => groupedData[date]),
          borderColor: "hsl(var(--destructive))",
          backgroundColor: "hsl(var(--destructive) / 0.2)",
          tension: 0.4,
        },
      ],
    })
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  }

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Fitness Trends</h2>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="year">Past Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Activity Duration</h3>
            {loading || !activityTrend ? (
              <Skeleton className="w-full aspect-[2/1]" />
            ) : (
              <div className="w-full aspect-[2/1]">
                <Line data={activityTrend} options={chartOptions} />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Calorie Intake</h3>
            {loading || !caloriesTrend ? (
              <Skeleton className="w-full aspect-[2/1]" />
            ) : (
              <div className="w-full aspect-[2/1]">
                <Line data={caloriesTrend} options={chartOptions} />
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
