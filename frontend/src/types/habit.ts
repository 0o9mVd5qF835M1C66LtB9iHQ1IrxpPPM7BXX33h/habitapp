export type Habit = {
  userId: string;
  title: string;
  isoWeekdays: number[];
  dateCreated: number;
  archived: boolean;
  currentStreakDates: number[];
  longestStreakDates: number[];
};
