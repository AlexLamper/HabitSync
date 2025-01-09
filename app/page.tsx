'use client'

import { useState, useEffect } from 'react'
import { HabitTracker } from '@/components/HabitTracker'
import { Navigation } from '@/components/Navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Habit } from '@/lib/types'
import { getHabitsFromStorage, removeHabitFromStorage } from '@/lib/localStorage'
import confetti from 'canvas-confetti'
import { 
  // Sparkles, 
  Award, 
  TrendingUp 
} from 'lucide-react'

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([])

  useEffect(() => {
    const storedHabits = getHabitsFromStorage()
    setHabits(storedHabits.habits)
  }, [])

  const handleDelete = (habitId: string) => {
    removeHabitFromStorage(habitId)
    setHabits(habits.filter(h => h.id !== habitId))
  }

  const totalProgress = habits.length > 0
    ? Math.round(habits.reduce((sum, habit) => sum + (habit.completedDays.length / habit.duration), 0) / habits.length * 100)
    : 0

  const longestStreak = habits.reduce((max, habit) => Math.max(max, habit.completedDays.length), 0)

  const celebrateProgress = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  return (
    <main className="container mx-auto max-w-2xl p-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        {/* <Sparkles className="mr-2 text-yellow-500" /> */}
        Habit Tracker
      </h1>
      <Navigation />
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{totalProgress}%</p>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{longestStreak}</p>
              <p className="text-sm text-muted-foreground">Longest Streak</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {habits.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingUp className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <p>No habits added yet. Click &quot;Add Habit&quot; to get started!</p>
            <Button className="mt-4" onClick={() => window.location.href = '/add'}>Add Your First Habit</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {habits.map(habit => (
            <HabitTracker key={habit.id} habit={habit} onDelete={handleDelete} />
          ))}
          <div className="text-center mt-6">
            <Button onClick={celebrateProgress} className="animate-pulse">
              <Award className="mr-2" />
              Celebrate Progress!
            </Button>
          </div>
        </>
      )}
    </main>
  )
}

