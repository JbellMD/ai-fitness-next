"use client"; // Add this directive to mark the file as a Client Component

import { MainNav } from "@/components/main-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <MainNav />
          <div className="flex items-center space-x-4">
            {/* Add user profile menu here if needed */}
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="grid gap-6">
          {children}
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex h-14 items-center justify-between px-4 md:px-6">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Fitness. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
