import { NutritionTracker } from "@/components/nutrition-tracker"

export default function NutritionPage() {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Nutrition Tracking</h1>
      <NutritionTracker />
    </div>
  )
}
