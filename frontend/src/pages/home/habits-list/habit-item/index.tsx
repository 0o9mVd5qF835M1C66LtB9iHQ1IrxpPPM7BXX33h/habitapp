import { Dayjs } from "dayjs";
import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Habit, HabitCompletedDate } from "../../types";
import { WeekdayText } from "./weekday-text";
import { Streak } from "./streak";
import { Checkbox } from "./checkbox";
import { Title } from "./title";
import { Box } from "@chakra-ui/react";

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
        <WeekdayText weekdays={habit.weekdays} />
        <Title title={habit.title} isCompleted={isHabitCompleted} />
        <Streak habit={habit} />
      </div>
      {habit.weekdays.includes(selectedDate.isoWeekday()) ? (
        <Checkbox
          onComplete={() => onComplete(habit)}
          onUncomplete={() => onUncomplete(habit)}
          isCompleted={isHabitCompleted}
        />
      ) : null}
    </Box>
  );
}
