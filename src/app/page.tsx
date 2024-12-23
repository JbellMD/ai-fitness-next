import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription } from "@/components/ui/card"

export default function Home() {
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
              <a
                href="/activity"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Activity
              </a>
              <a
                href="/insights"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Insights
              </a>
              <a
                href="/nutrition"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Nutrition
              </a>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Track Your Fitness Journey with AI
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Log activities, track nutrition, and get AI-powered insights to reach your fitness goals faster
            </p>
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Activity Logger</h3>
                  <CardDescription>
                    Track your workouts and daily activities
                  </CardDescription>
                  <Button className="mt-4" variant="secondary" asChild>
                    <a href="/activity">Get Started →</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">AI Insights</h3>
                  <CardDescription>
                    Get personalized recommendations and analysis
                  </CardDescription>
                  <Button className="mt-4" variant="secondary" asChild>
                    <a href="/insights">View Insights →</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Nutrition Tracker</h3>
                  <CardDescription>
                    Monitor your diet and nutritional intake
                  </CardDescription>
                  <Button className="mt-4" variant="secondary" asChild>
                    <a href="/nutrition">Track Now →</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
