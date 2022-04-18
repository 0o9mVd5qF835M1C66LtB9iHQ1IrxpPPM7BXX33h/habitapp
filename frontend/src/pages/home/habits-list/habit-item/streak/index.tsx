import { IoFlame } from "react-icons/io5";
import { Habit } from "../../../../../generated/api";

type Props = {
  habit: Habit;
};

export function Streak({ habit }: Props) {
  return (
    <div className="flex flex-row items-center">
      <IoFlame className="text-sm text-purple-1" />
      <div className="text-sm ml-1 text-purple-1">
        {habit.currentStreakDates.length} day streak
      </div>
    </div>
  );
}
