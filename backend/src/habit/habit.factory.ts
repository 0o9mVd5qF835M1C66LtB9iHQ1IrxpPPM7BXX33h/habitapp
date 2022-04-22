import { Types } from "mongoose";
import faker from "@faker-js/faker";

import { Habit } from "./habit.schema";

export class HabitFactory {
  static create(habit: Partial<Habit> = {}) {
    const newHabit: Habit = {
      _id: habit._id || new Types.ObjectId(),
      userId: habit.userId || new Types.ObjectId(),
      title: faker.word.verb(2),
      isoWeekdays: habit.isoWeekdays || [0],
      completedDates: [],
      dateCreated: habit.dateCreated || Date.now(),
      archived: habit.archived || false,
    };

    return newHabit;
  }
}
