import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"

export function MainNav() {
  const pathname = usePathname()

  const items = [
    {
      title: "Activity",
      href: "/activity",
      icon: Icons.activity,
    },
    {
      title: "Nutrition",
      href: "/nutrition",
      icon: Icons.apple,
    },
    {
      title: "Insights",
      href: "/insights",
      icon: Icons.brain,
    },
    {
      title: "Trends",
      href: "/trends",
      icon: Icons.trendingUp,
    },
  ]

  return (
    <nav className="flex items-center space-x-6">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.dumbbellLogo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          AI Fitness Tracker
        </span>
      </Link>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
