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
    <Card className="p-8 w-full max-w-md mx-auto shadow-lg">
      <div className="flex flex-col items-center space-y-4 mb-8">
        <Icons.dumbbellLogo className="h-16 w-16" />
        <h1 className="text-3xl font-bold text-center">Create Account</h1>
        <p className="text-sm text-muted-foreground text-center">
          Enter your details to create a new account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full"
            required
          />
        </div>

        {error && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md text-center">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
          {loading && (
            <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
          )}
          Create Account
        </Button>

        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Button
            variant="link"
            className="pl-1 font-medium"
            onClick={() => router.push("/login")}
          >
            Sign in
          </Button>
        </div>
      </form>
    </Card>
  )
}
