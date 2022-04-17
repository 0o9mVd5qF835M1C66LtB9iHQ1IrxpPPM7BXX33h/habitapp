import { Form } from "../form";
import { Input } from "../input";
import { WeekSelector } from "../week-selector";
import { Button } from "../button";
import { Habit } from "../../generated/api";

type HabitFormProps = {
  habit: Habit;
};

export function HabitForm({}: HabitFormProps) {
  return (
    <Form className="flex flex-1 flex-col items-center pt-32">
      <h1 className="text-base text-gray-900 font-bold text-center mb-20">
        Add new habit
      </h1>
      <Input className="w-full mb-2" placeholder="Enter your habit" />
      <WeekSelector className="mb-6" />
      <Button className="text-white bg-primary-600 p-2 w-full text-base">
        Create habit
      </Button>
    </Form>
  );
}
