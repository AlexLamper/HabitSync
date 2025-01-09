'use client'

import { SetStateAction, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Habit } from '@/lib/types'
import { Rocket, Calendar, Target } from 'lucide-react'

interface HabitFormProps {
  onSubmit: (habit: Habit) => void;
}

export function HabitForm({ onSubmit }: HabitFormProps) {
  const [name, setName] = useState('')
  const [duration, setDuration] = useState<30 | 60 | 90>(30)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      duration,
      startDate: new Date().toISOString(),
      completedDays: [],
    }
    onSubmit(newHabit)
    setName('')
    setDuration(30)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Rocket className="mr-2" />
          Launch a New Habit
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="habit-name">What&apos;s your new habit?</Label>
            <Input
              id="habit-name"
              value={name}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setName(e.target.value)}
              required
              placeholder="Enter your habit"
            />
          </div>
          <div className="space-y-2">
            <Label>For how long?</Label>
            <RadioGroup defaultValue="30" onValueChange={(value: unknown) => setDuration(Number(value) as 30 | 60 | 90)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30" id="30-days" />
                <Label htmlFor="30-days" className="flex items-center">
                  <Calendar className="mr-2" />
                  30 days
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="60" id="60-days" />
                <Label htmlFor="60-days" className="flex items-center">
                  <Calendar className="mr-2" />
                  60 days
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="90" id="90-days" />
                <Label htmlFor="90-days" className="flex items-center">
                  <Calendar className="mr-2" />
                  90 days
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            <Target className="mr-2" />
            Set Your Goal
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

