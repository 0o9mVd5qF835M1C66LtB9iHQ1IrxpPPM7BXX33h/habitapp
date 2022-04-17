import { useRef, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import dayjs, { Dayjs } from "dayjs";

import { weekDays } from "../../constants";
import { Button } from "../button";

function getDays() {
  const calendarDays: Dayjs[] = [];
  const startDate = dayjs().add(2, "day");

  for (let i = 0; i < 33; i++) {
    calendarDays.push(startDate.subtract(i, "day"));
  }

  return calendarDays;
}

type CalendarSliderProps = {
  onClick?: (day: Dayjs) => void;
};

export function CalendarSlider({ onClick = () => {} }: CalendarSliderProps) {
  const daysRef = useRef<Dayjs[]>(getDays());
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  function handleDayClick(day: Dayjs) {
    setSelectedDate(day);
    onClick(day);
  }

  return (
    <ScrollContainer className="py-3 flex overflow-auto flex-row-reverse">
      {daysRef.current.map((day) => {
        const isSelectedDate = selectedDate.isSame(day, "day");

        return (
          <Button
            className={`mx-1 ${
              isSelectedDate ? "bg-primary-600" : "bg-white"
            } ${!isSelectedDate ? "border-gray-300" : ""} border ${
              isSelectedDate ? "text-white" : "text-gray-900"
            } font-normal w-[44px] min-w-[44px] h-[44px] p-0 text-xs`}
            onClick={() => handleDayClick(day)}
          >
            {day.date()}
            <br />
            {weekDays[day.day()]}
          </Button>
        );
      })}
    </ScrollContainer>
  );
}
