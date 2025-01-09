import { HabitStore, Habit } from './types';

export function getHabitsFromStorage(): HabitStore {
  if (typeof window === 'undefined') return { habits: [] };
  const habits = localStorage.getItem('habits');
  return habits ? JSON.parse(habits) : { habits: [] };
}

export function saveHabitsToStorage(habitStore: HabitStore): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('habits', JSON.stringify(habitStore));
}

export function addHabitToStorage(habit: Habit): void {
  const habitStore = getHabitsFromStorage();
  habitStore.habits.push(habit);
  saveHabitsToStorage(habitStore);
}

export function updateHabitInStorage(updatedHabit: Habit): void {
  const habitStore = getHabitsFromStorage();
  const index = habitStore.habits.findIndex(h => h.id === updatedHabit.id);
  if (index !== -1) {
    habitStore.habits[index] = updatedHabit;
    saveHabitsToStorage(habitStore);
  }
}

export function removeHabitFromStorage(habitId: string): void {
  const habitStore = getHabitsFromStorage();
  habitStore.habits = habitStore.habits.filter(h => h.id !== habitId);
  saveHabitsToStorage(habitStore);
}

