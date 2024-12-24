'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/ui/icons'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

export function MainNav() {
  const pathname = usePathname()

  const items = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Icons.home,
    },
    {
      title: 'Activity',
      href: '/activity',
      icon: Icons.activity,
    },
    {
      title: 'Nutrition',
      href: '/nutrition',
      icon: Icons.apple,
    },
    {
      title: 'Insights',
      href: '/insights',
      icon: Icons.brain,
    },
  ]

  return (
    <nav className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center space-x-4 lg:space-x-6">
        <Link href="/" className="flex items-center space-x-2">
          <Logo className="h-6 w-6" />
          <span className="hidden font-bold lg:inline-block">
            AI Fitness
          </span>
        </Link>
        <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
      </div>
    </nav>
  )
}
