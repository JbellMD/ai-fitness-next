"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { motion } from "framer-motion"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { filterDataByDate } from "@/lib/date-filters"
import { database } from "@/lib/firebase"
import { ref, push, onValue } from "firebase/database"
import { Card } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Activity, ActivityFormData } from "@/types"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function ActivityLogger() {
  const { control, handleSubmit, reset } = useForm<ActivityFormData>({
    defaultValues: {
      activity: "",
      duration: "",
      intensity: "",
    },
  })
  const [successMessage, setSuccessMessage] = useState("")
  const [chartData, setChartData] = useState<any>(null)
  const [allActivities, setAllActivities] = useState<Activity[]>([])
  const [filterType, setFilterType] = useState("day")

  // Fetch activities from Firebase
  useEffect(() => {
    const activitiesRef = ref(database, "activities")

    onValue(activitiesRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const fetchedActivities = Object.values(data).map((item: any) => ({
          activity: item.activity,
          duration: Number(item.duration),
          intensity: item.intensity,
          timestamp: item.timestamp || new Date().toISOString(),
          timestampNum: item.timestampNum || Date.now()
        })) as Activity[]
        setAllActivities(fetchedActivities)
      } else {
        setAllActivities([])
      }
    })
  }, [])

  // Filter and prepare chart data
  useEffect(() => {
    const filteredActivities = filterDataByDate(allActivities, filterType)
    prepareChartData(filteredActivities)
  }, [allActivities, filterType])

  const prepareChartData = (data: Activity[]) => {
    const activityDurations = data.reduce((acc: Record<string, number>, activity) => {
      acc[activity.activity] = (acc[activity.activity] || 0) + activity.duration
      return acc
    }, {})

    const activityColors = {
      running: "#4caf50",
      yoga: "#f44336",
      weightlifting: "#2196f3",
      swimming: "#00bcd4",
      pilates: "#9c27b0",
    }

    const labels = Object.keys(activityDurations)
    const backgroundColors = labels.map(
      (label) => activityColors[label as keyof typeof activityColors] || "#ccc"
    )

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Total Duration (minutes)",
          data: Object.values(activityDurations),
          backgroundColor: backgroundColors,
        },
      ],
    })
  }

  const onSubmit = async (data: ActivityFormData) => {
    try {
      const newActivity: Activity = {
        activity: data.activity,
        duration: parseInt(data.duration, 10),
        intensity: data.intensity,
        timestamp: new Date().toISOString(),
        timestampNum: Date.now(),
      }

      await push(ref(database, "activities"), newActivity)
      setAllActivities((prevActivities) => [...prevActivities, newActivity])
      setSuccessMessage("Activity logged successfully!")
      reset()
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error adding activity:", error)
    }
  }

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="activity">Activity Type</Label>
            <Controller
              name="activity"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an activity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="weightlifting">Weightlifting</SelectItem>
                    <SelectItem value="swimming">Swimming</SelectItem>
                    <SelectItem value="pilates">Pilates</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Controller
              name="duration"
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field }) => (
                <Input
                  type="number"
                  id="duration"
                  {...field}
                  min="1"
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="intensity">Intensity Level</Label>
            <Controller
              name="intensity"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select intensity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Log Activity
          </Button>

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-600 text-center"
            >
              {successMessage}
            </motion.div>
          )}
        </form>
      </Card>

      <Card className="p-6">
        <div className="mb-4">
          <Label>Filter By</Label>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {chartData && (
          <div className="w-full aspect-[2/1]">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        )}
      </Card>
    </div>
  )
}
