import dayjs, { Dayjs } from "dayjs";

import { Habit } from "../generated/api";

export function isCompletedOnDate(habit: Habit, date: Dayjs) {
  return habit.completedDates.some((completedDate) =>
    date.isSame(completedDate, "day")
  );
}

export function shouldBeCompletedOnWeekday(
  habit: Habit,
  isoWeekday: number
): boolean {
  return habit.isoWeekdays.includes(isoWeekday);
}

export function shouldBeCompletedOnDate(habit: Habit, date: Dayjs): boolean {
  const isBeforeCreationDate = date.isBefore(habit.dateCreated, "day");
  const isFutureDate = date.isAfter(Date.now(), "day");

  if (isBeforeCreationDate || isFutureDate) {
    return false;
  }

  return shouldBeCompletedOnWeekday(habit, date.isoWeekday());
}

export function calculateCurrentStreak(habit: Habit) {
  const startDate = dayjs();
  let date = startDate;
  const streak = [];

  while (true) {
    if (!shouldBeCompletedOnWeekday(habit, date.isoWeekday())) {
      date = date.subtract(1, "day");
      continue;
    }

    if (!isCompletedOnDate(habit, date)) {
      if (date.isToday()) {
        date = date.subtract(1, "day");
        continue;
      }

      break;
    }

    streak.unshift(date.valueOf());
    date = date.subtract(1, "day");
  }

  return streak;
}

export function calculateLongestStreak(habit: Habit) {
  if (!habit.completedDates.length) {
    return [];
  }

  const firstCompletedDate = habit.completedDates[0];
  const startDate = dayjs(firstCompletedDate);

  let date = startDate;
  let longestStreak: number[] = [];
  let streak: number[] = [];

  for (let i = 0; i < habit.completedDates.length; i++) {
    if (!shouldBeCompletedOnWeekday(habit, date.isoWeekday())) {
      date = date.subtract(1, "day");
      continue;
    }

    if (!isCompletedOnDate(habit, date)) {
      if (date.isToday()) {
        date = date.add(1, "day");
        continue;
      }

      if (streak.length > longestStreak.length) {
        longestStreak = [...streak];
      }

      streak = [];
      continue;
    }

    streak.push(date.valueOf());
    date = date.add(1, "day");

    if (streak.length > longestStreak.length) {
      longestStreak = [...streak];
    }
  }

  return longestStreak;
}

export function getOccurenceString(weekdays: number[]): string {
  const everyDay = weekdays.length === 7;
  if (everyDay) {
    return "Everyday";
  }

  const everyWeekday =
    weekdays.length === 5 && weekdays.every((weekday) => weekday < 6);

  if (everyWeekday) {
    return "Weekdays";
  }

  return weekdays
    .map((weekday) => `${dayjs().isoWeekday(weekday).format("ddd")}`)
    .join(", ");
}

export function getCreatedDateDifference(habit: Habit) {
  const difference = dayjs(Date.now()).diff(habit.dateCreated, "day");

  if (difference === 0) {
    return "Today";
  }

  if (difference === 1) {
    return "Yesterday";
  }

  return `${difference} days ago`;
}

export function getStreakRangeString(streakDates: number[]) {
  if (!streakDates.length) {
    return "N/A";
  }

  const startDate = dayjs(streakDates[0]);
  const endDate = dayjs(streakDates[streakDates.length - 1]);

  return `${startDate.format("MMM D")} - ${endDate.format("MMM D")}`;
}

export function countNumOfUncompletedHabitsOnDate(
  habits: Habit[],
  date: Dayjs
) {
  const numOfCompletedHabits = habits.filter((habit) =>
    habit.completedDates.some((comletedDate) =>
      date.isSame(comletedDate, "day")
    )
  ).length;

  const numOfHabitsToCompleteOnSelectedDate = habits.filter((habit) =>
    habit.isoWeekdays.includes(date.isoWeekday())
  ).length;

  return numOfHabitsToCompleteOnSelectedDate - numOfCompletedHabits;
}
