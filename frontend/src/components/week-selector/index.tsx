import { useState } from "react";
import { weekDays } from "../../constants";
import { Button } from "../button";

type WeekSelectorProps = {
  className?: string;
};

export function WeekSelector(props: WeekSelectorProps) {
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);

  function handleWeekDayClick(weekDay: number) {
    setSelectedWeekDays((currentSelected) => {
      if (currentSelected.includes(weekDay)) {
        return currentSelected.filter((selected) => selected !== weekDay);
      }

      return [...currentSelected, weekDay];
    });
  }

  return (
    <div className={`flex justify-around w-full ${props.className || ""}`}>
      {weekDays.map((weekDay, index) => {
        const isSelectedWeekDay = selectedWeekDays.includes(index);

        return (
          <Button
            className={`${
              isSelectedWeekDay
                ? "text-white bg-primary-600"
                : "border text-gray-900"
            } border-b-gray-100 p-2 w-[44px] h-[44px] flex justify-center items-center text-sm`}
            onClick={() => handleWeekDayClick(index)}
          >
            {weekDay}
          </Button>
        );
      })}
    </div>
  );
}
