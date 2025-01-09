export interface Habit {
    id: string;
    name: string;
    duration: 30 | 60 | 90;
    startDate: string;
    completedDays: string[];
  }
  
  export interface HabitStore {
    habits: Habit[];
  }
  
  