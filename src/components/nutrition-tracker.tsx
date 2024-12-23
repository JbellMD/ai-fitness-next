"use client"

import { useState, useEffect } from "react"
import { database } from "@/lib/firebase"
import { ref, push, onValue } from "firebase/database"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { motion } from "framer-motion"
import axios from "axios"
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
import { NutrientSuggestions } from "./nutrient-suggestions"

ChartJS.register(ArcElement, Tooltip, Legend)

interface Meal {
  foodName: string
  calories: number
  mealType: string
  timestamp: string
}

export function NutritionTracker() {
  const [foodName, setFoodName] = useState("")
  const [calories, setCalories] = useState("")
  const [mealType, setMealType] = useState("breakfast")
  const [chartData, setChartData] = useState<any>(null)
  const [allMeals, setAllMeals] = useState<Meal[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState("")
  const [totalCalories, setTotalCalories] = useState(0)

  useEffect(() => {
    const mealsRef = ref(database, "meals")
    onValue(mealsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const fetchedMeals = Object.values(data) as Meal[]
        setAllMeals(fetchedMeals)
        calculateTotalCalories(fetchedMeals)
        prepareChartData(fetchedMeals)
      } else {
        setAllMeals([])
        setTotalCalories(0)
        setChartData(null)
      }
    })
  }, [])

  const calculateTotalCalories = (meals: Meal[]) => {
    const total = meals.reduce((sum, meal) => sum + meal.calories, 0)
    setTotalCalories(total)
  }

  const prepareChartData = (meals: Meal[]) => {
    const mealTypeCalories = meals.reduce(
      (acc: Record<string, number>, meal) => {
        acc[meal.mealType] = (acc[meal.mealType] || 0) + meal.calories
        return acc
      },
      {}
    )

    const colors = {
      breakfast: "#FF6384",
      lunch: "#36A2EB",
      dinner: "#FFCE56",
      snack: "#4BC0C0",
    }

    setChartData({
      labels: Object.keys(mealTypeCalories),
      datasets: [
        {
          data: Object.values(mealTypeCalories),
          backgroundColor: Object.keys(mealTypeCalories).map(
            (type) => colors[type as keyof typeof colors]
          ),
        },
      ],
    })
  }

  const searchFood = async (query: string) => {
    if (!query) return

    try {
      const response = await axios.get(
        `https://api.nutritionix.com/v1_1/search/${query}`,
        {
          params: {
            appId: process.env.NEXT_PUBLIC_NUTRITIONIX_APP_ID,
            appKey: process.env.NEXT_PUBLIC_NUTRITIONIX_APP_KEY,
            fields: ["item_name", "nf_calories"],
          },
        }
      )

      const foodSuggestions = response.data.hits.map(
        (hit: any) => hit.fields.item_name
      )
      setSuggestions(foodSuggestions)
    } catch (error) {
      console.error("Error fetching food suggestions:", error)
    }
  }

  const handleFoodNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFoodName(value)
    searchFood(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!foodName || !calories) {
      return
    }

    try {
      const newMeal = {
        foodName,
        calories: parseInt(calories),
        mealType,
        timestamp: new Date().toISOString(),
      }

      await push(ref(database, "meals"), newMeal)
      setSuccessMessage("Meal logged successfully!")
      setFoodName("")
      setCalories("")
      setSuggestions([])
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error adding meal:", error)
    }
  }

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="foodName">Food Name</Label>
            <Input
              type="text"
              id="foodName"
              value={foodName}
              onChange={handleFoodNameChange}
              required
            />
            {suggestions.length > 0 && (
              <ul className="mt-2 border rounded-md divide-y">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setFoodName(suggestion)
                      setSuggestions([])
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="calories">Calories</Label>
            <Input
              type="number"
              id="calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mealType">Meal Type</Label>
            <Select value={mealType} onValueChange={setMealType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Log Meal
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

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Daily Summary</h3>
          <p className="text-3xl font-bold text-primary">
            {totalCalories} calories
          </p>
          {chartData && (
            <div className="mt-4 aspect-square">
              <Pie
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Nutrient Suggestions</h3>
          <NutrientSuggestions totalCalories={totalCalories} />
        </Card>
      </div>
    </div>
  )
}
