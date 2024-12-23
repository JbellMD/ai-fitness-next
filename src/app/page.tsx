"use client"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"

export default function Home() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut(auth)
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold sm:inline-block">
                AI Fitness Tracker
              </span>
            </a>
          </div>
          <nav className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="flex items-center space-x-6">
              {user ? (
                <>
                  <a
                    href="/dashboard"
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                  >
                    Dashboard
                  </a>
                  <Button
                    variant="ghost"
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
              )}
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Your AI-Powered Fitness Journey
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Track your workouts, analyze your progress, and get personalized recommendations with AI assistance.
            </p>
            {!user && (
              <div className="space-x-4">
                <Button onClick={() => router.push("/login")} size="lg">
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
