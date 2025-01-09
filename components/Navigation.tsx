'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()

  const getButtonTextColor = (bgColor: string) => {
    // If bg-primary is white (light background), text should be white
    return bgColor === 'bg-primary' ? 'text-white' : 'text-black'
  }

  return (
    <nav className="flex space-x-4 mb-6">
      <Link href="/" passHref>
        <Button
          className={`${pathname === '/' ? 'bg-primary' : 'bg-transparent'} ${getButtonTextColor(pathname === '/' ? 'bg-primary' : 'bg-transparent')} hover:text-white`}
        >
          Dashboard
        </Button>
      </Link>
      <Link href="/add" passHref>
        <Button
          className={`${pathname === '/add' ? 'bg-primary' : 'bg-transparent'} ${getButtonTextColor(pathname === '/add' ? 'bg-primary' : 'bg-transparent')} hover:text-white`}
        >
          Add Habit
        </Button>
      </Link>
    </nav>
  )
}
