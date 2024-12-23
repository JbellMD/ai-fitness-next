"use client"

import { useEffect, useState } from "react"
import { Card } from "./ui/card"
import { Progress } from "./ui/progress"

interface NutrientSuggestionsProps {
  totalCalories: number
}

export function NutrientSuggestions({ totalCalories }: NutrientSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const recommendedCalories = 2000 // This could be customized based on user profile

  useEffect(() => {
    const generateSuggestions = () => {
      const newSuggestions = []
      const remainingCalories = recommendedCalories - totalCalories

      if (totalCalories === 0) {
        newSuggestions.push(
          "Start your day with a balanced breakfast to fuel your activities!"
        )
      } else if (totalCalories < recommendedCalories * 0.3) {
        newSuggestions.push(
          "Consider adding more protein-rich foods to your meals."
        )
      } else if (totalCalories > recommendedCalories) {
        newSuggestions.push(
          "You've exceeded your daily calorie goal. Consider some light exercise!"
        )
      }

      if (remainingCalories > 0) {
        newSuggestions.push(
          `You have ${remainingCalories} calories remaining for the day.`
        )
      }

      setSuggestions(newSuggestions)
    }

    generateSuggestions()
  }, [totalCalories])

  const calorieProgress = (totalCalories / recommendedCalories) * 100

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Daily Progress</span>
          <span>
            {totalCalories} / {recommendedCalories} cal
          </span>
        </div>
        <Progress value={calorieProgress} />
      </div>

      <ul className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="text-sm text-muted-foreground"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  )
}
