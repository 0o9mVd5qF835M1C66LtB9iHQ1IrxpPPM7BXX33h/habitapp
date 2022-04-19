import { Input, Button, Heading } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

import { WeekSelector } from "./week-selector";
import { Habit } from "../../generated/api";

export type HabitFormProps = {
  habit: Habit;
  onChange: Dispatch<SetStateAction<Habit>>;
  onSubmit(): void;
};

export function HabitForm({ habit, onChange, onSubmit }: HabitFormProps) {
  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange((habit) => ({
      ...habit,
      title: e.target.value,
    }));
  }

  function handleWeekdayClick(weekday: number) {
    onChange((habit) => ({
      ...habit,
      isoWeekdays: habit.isoWeekdays.includes(weekday)
        ? habit.isoWeekdays.filter((selected) => selected !== weekday)
        : [...habit.isoWeekdays, weekday],
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSubmit();
  }

  return (
    <>
      <Heading
        as="h1"
        size="md"
        marginBottom="16"
        color="gray.900"
        textAlign="center"
      >
        Add new habit
      </Heading>
      <form onSubmit={handleSubmit}>
        <Input
          value={habit.title}
          marginBottom="3"
          placeholder="Type habit name"
          onChange={handleTitleChange}
        />
        <WeekSelector
          selectedWeekdays={habit.isoWeekdays}
          onWeekdaySelect={handleWeekdayClick}
        />
        <Button
          type="submit"
          isFullWidth
          colorScheme="purple.600"
          marginTop="8"
        >
          Create Habit
        </Button>
      </form>
    </>
  );
}
