'use client'

import { useRouter } from 'next/navigation'
import { HabitForm } from '@/components/HabitForm'
import { Navigation } from '@/components/Navigation'
import { Habit } from '@/lib/types'
import { addHabitToStorage } from '@/lib/localStorage'

export default function AddHabit() {
  const router = useRouter()

  const handleSubmit = (habit: Habit) => {
    addHabitToStorage(habit)
    router.push('/')
  }

  return (
    <main className="container mx-auto max-w-2xl p-4">
      <h1 className="text-3xl font-bold mb-6">Add New Habit</h1>
      <Navigation />
      <HabitForm onSubmit={handleSubmit} />
    </main>
  )
}

