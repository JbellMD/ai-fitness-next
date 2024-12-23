"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

export function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      return setError("Passwords do not match")
    }

    setLoading(true)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push("/activity")
    } catch (error: any) {
      setError(
        error.message || "Failed to create account. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 w-full max-w-sm mx-auto">
      <div className="flex justify-center mb-6">
        <Icons.dumbbellLogo className="h-12 w-12" />
      </div>
      <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className="text-sm text-destructive text-center">{error}</div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign Up
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Button
            variant="link"
            className="p-0 h-auto font-normal"
            onClick={() => router.push("/login")}
          >
            Sign in
          </Button>
        </p>
      </form>
    </Card>
  )
}
