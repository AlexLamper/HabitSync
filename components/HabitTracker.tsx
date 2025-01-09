'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Habit } from '@/lib/types'
import { updateHabitInStorage } from '@/lib/localStorage'
import { format, differenceInDays, isSameDay } from 'date-fns'
import { parseISO } from "c:/Projects/habitsync/node_modules/date-fns/parseISO"
import { Trophy, Target, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface HabitTrackerProps {
  habit: Habit;
  onDelete: (id: string) => void;
  detailed?: boolean;
}

export function HabitTracker({ habit, onDelete, detailed = false }: HabitTrackerProps) {
  const [completedDays, setCompletedDays] = useState(habit.completedDays)

  const toggleDay = (date: string) => {
    const newCompletedDays = completedDays.includes(date)
      ? completedDays.filter(d => d !== date)
      : [...completedDays, date]

    setCompletedDays(newCompletedDays)
    const updatedHabit = { ...habit, completedDays: newCompletedDays }
    updateHabitInStorage(updatedHabit)
  }

  const startDate = parseISO(habit.startDate)
  const daysPassed = differenceInDays(new Date(), startDate)
  const progress = Math.round((completedDays.length / habit.duration) * 100)
  const streak = completedDays.length

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{habit.name}</span>
          {progress === 100 && <Trophy className="text-yellow-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="w-full" />
        <div className="flex justify-between items-center">
          <span>Day {daysPassed + 1} of {habit.duration}</span>
          <span className="font-bold">{progress}% Complete</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Current Streak: {streak} {streak === 1 ? 'day' : 'days'}</span>
          <Target className="text-green-500" />
        </div>
        {detailed && (
          <div className="grid grid-cols-7 gap-2 mt-4">
            {Array.from({ length: habit.duration }).map((_, index) => {
              const date = new Date(startDate.getTime() + index * 24 * 60 * 60 * 1000)
              const dateString = date.toISOString().split('T')[0]
              const isCompleted = completedDays.includes(dateString)
              const isPast = date <= new Date()
              const isToday = isSameDay(date, new Date())

              return (
                <Button
                  key={index}
                  variant={isCompleted ? "default" : "outline"}
                  className={`w-10 h-10 ${isToday ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                  onClick={() => isPast && toggleDay(dateString)}
                  disabled={!isPast}
                >
                  {format(date, 'd')}
                </Button>
              )
            })}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {detailed ? (
          <Button onClick={() => toggleDay(new Date().toISOString().split('T')[0])} variant={completedDays.includes(new Date().toISOString().split('T')[0]) ? "default" : "outline"}>
            {completedDays.includes(new Date().toISOString().split('T')[0]) ? "Completed Today" : "Mark as Complete"}
          </Button>
        ) : (
          <Link href={`/habit/${habit.id}`} passHref>
            <Button variant="outline">
              View Details <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
        <Button onClick={() => onDelete(habit.id)} variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
  )
}

