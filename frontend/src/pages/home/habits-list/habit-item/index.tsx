import { Dayjs } from "dayjs";
import { Box } from "@chakra-ui/react";
import { Habit } from "../../../../generated/api";

import { WeekdayText } from "./weekday-text";
import { Streak } from "./streak";
import { Checkbox } from "./checkbox";
import { Title } from "./title";

type Props = {
  habit: Habit;
  selectedDate: Dayjs;
  isHabitCompleted: boolean;
  onComplete: (habit: Habit) => void;
  onUncomplete: (habit: Habit) => void;
  onClick: (habit: Habit) => void;
};

export function HabitItem(props: Props) {
  const {
    habit,
    selectedDate,
    isHabitCompleted,
    onClick,
    onComplete,
    onUncomplete,
  } = props;

  return (
    <Box
      onClick={() => onClick(habit)}
      className="flex flex-row items-center py-2 mb-2 border shadow-sm rounded-xl text-slate-900 px-3 cursor-pointer bg-purple-max"
    >
      <div className="w-full">
        <WeekdayText weekdays={habit.isoWeekdays} />
        <Title title={habit.title} isCompleted={isHabitCompleted} />
        <Streak habit={habit} />
      </div>
      {habit.isoWeekdays.includes(selectedDate.isoWeekday()) ? (
        <Checkbox
          onComplete={() => onComplete(habit)}
          onUncomplete={() => onUncomplete(habit)}
          isCompleted={isHabitCompleted}
        />
      ) : null}
    </Box>
  );
}
