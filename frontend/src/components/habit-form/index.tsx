import { Input, Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { WeekSelector } from "./week-selector";

type HabitFormProps = {};

export function HabitForm({}: HabitFormProps) {
  const [title, setTitle] = useState("");
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([]);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleWeekdayClick(weekday: number) {
    setSelectedWeekdays((currentSelected) => {
      if (currentSelected.includes(weekday)) {
        return currentSelected.filter((selected) => selected !== weekday);
      }

      return [...currentSelected, weekday];
    });
  }

  return (
    <form>
      <Heading
        as="h1"
        size="md"
        marginBottom="16"
        color="gray.900"
        textAlign="center"
      >
        Add new habit
      </Heading>
      <Input
        value={title}
        marginBottom="3"
        placeholder="Type habit name"
        onChange={handleTitleChange}
      />
      <WeekSelector
        selectedWeekdays={selectedWeekdays}
        onWeekdaySelect={handleWeekdayClick}
      />
      <Button isFullWidth colorScheme="purple" marginTop="8">
        Create Habit
      </Button>
    </form>
  );
}
