'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { HabitTracker } from '@/components/HabitTracker'
import { Navigation } from '@/components/Navigation'
import { Habit } from '@/lib/types'
import { getHabitsFromStorage, removeHabitFromStorage } from '@/lib/localStorage'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'

export default function HabitDetail({ params }: { params: { id: string } }) {
  const [habit, setHabit] = useState<Habit | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedHabits = getHabitsFromStorage()
    const foundHabit = storedHabits.habits.find(h => h.id === params.id)
    if (foundHabit) {
      setHabit(foundHabit)
    } else {
      router.push('/')
    }
  }, [params.id, router])

  const handleDelete = (habitId: string) => {
    removeHabitFromStorage(habitId)
    router.push('/')
  }

  if (!habit) {
    return <div>Loading...</div>
  }

  return (
    <main className="container mx-auto max-w-2xl p-4">
      <Navigation />
      <Button variant="ghost" onClick={() => router.push('/')} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
      <h1 className="text-3xl font-bold mb-6">{habit.name}</h1>
      <HabitTracker habit={habit} onDelete={handleDelete} detailed />
    </main>
  )
}

