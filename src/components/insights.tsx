"use client"

import { useEffect, useState } from "react"
import { database } from "@/lib/firebase"
import { ref, onValue } from "firebase/database"
import axios from "axios"
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
import { Activity } from "@/types"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export function Insights() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [insight, setInsight] = useState("")
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<any>(null)
  const [recommendations, setRecommendations] = useState<string[]>([])

  useEffect(() => {
    const fetchActivities = () => {
      const activitiesRef = ref(database, "activities")

      onValue(
        activitiesRef,
        (snapshot) => {
          const data = snapshot.val()
          if (data) {
            const fetchedActivities = Object.values(data) as Activity[]
            setActivities(fetchedActivities.reverse())
            prepareChartData(fetchedActivities)
            generateRecommendations(fetchedActivities)
            generateInsight(fetchedActivities)
          } else {
            setActivities([])
            setInsight("No activities logged yet to generate insights.")
            setLoading(false)
          }
        },
        (error) => {
          console.error("Error fetching activities: ", error)
          setInsight("Unable to fetch activities at this time.")
          setLoading(false)
        }
      )
    }

    fetchActivities()
  }, [])

  const prepareChartData = (data: Activity[]) => {
    const sortedData = data
      .map((activity) => ({
        date: new Date(activity.timestamp).toLocaleDateString(),
        duration: activity.duration,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const labels = sortedData.map((entry) => entry.date)
    const durations = sortedData.map((entry) => entry.duration)

    setChartData({
      labels,
      datasets: [
        {
          label: "Activity Duration (minutes)",
          data: durations,
          borderColor: "hsl(var(--primary))",
          backgroundColor: "hsl(var(--primary) / 0.2)",
          tension: 0.4,
        },
      ],
    })
  }

  const generateRecommendations = (data: Activity[]) => {
    const activityTypes = [...new Set(data.map((item) => item.activity))]
    const allActivities = ["running", "yoga", "weightlifting", "swimming", "pilates"]
    const recommendationsList = allActivities.filter(
      (rec) => !activityTypes.includes(rec)
    )
    setRecommendations(recommendationsList)
  }

  const generateInsight = async (data: Activity[]) => {
    try {
      const activitySummary = data
        .map((activity) => `${activity.activity}: ${activity.duration} mins`)
        .join(", ")

      const prompt = `
        Analyze the following fitness activities and provide motivational feedback:
        ${activitySummary}.
        Focus on celebrating progress and encouraging consistency.
      `

      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt,
          max_tokens: 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
        }
      )

      setInsight(
        response.data.choices[0]?.text.trim() || "No meaningful insights available."
      )
      setLoading(false)
    } catch (error) {
      console.error("Error generating insights: ", error)
      setInsight("Unable to generate insights at this time.")
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Activity Progress</h2>
        {chartData ? (
          <div className="w-full aspect-[2/1]">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Duration (minutes)",
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Date",
                    },
                  },
                },
              }}
            />
          </div>
        ) : (
          <Skeleton className="w-full aspect-[2/1]" />
        )}
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">AI Insights</h2>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          ) : (
            <p className="text-muted-foreground">{insight}</p>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Recommended Activities</h2>
          {recommendations.length > 0 ? (
            <ul className="space-y-2">
              {recommendations.map((activity) => (
                <li
                  key={activity}
                  className="flex items-center text-muted-foreground"
                >
                  <span className="mr-2">•</span>
                  Try {activity} to diversify your routine
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">
              Great job! You've tried all available activities.
            </p>
          )}
        </Card>
      </div>
    </div>
  )
}
