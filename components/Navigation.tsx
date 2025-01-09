'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex space-x-4 mb-6">
      <Link href="/" passHref>
        <Button variant={pathname === '/' ? 'default' : 'outline'}>
          Dashboard
        </Button>
      </Link>
      <Link href="/add" passHref>
        <Button variant={pathname === '/add' ? 'default' : 'outline'}>
          Add Habit
        </Button>
      </Link>
    </nav>
  )
}

