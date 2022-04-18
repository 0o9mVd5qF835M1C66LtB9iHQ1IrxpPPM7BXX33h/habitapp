import { useRef, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import dayjs, { Dayjs } from "dayjs";
import { Button, chakra } from "@chakra-ui/react";

function getDays() {
  const calendarDays: Dayjs[] = [];
  const startDate = dayjs().add(2, "day");

  for (let i = 0; i < 33; i++) {
    calendarDays.push(startDate.subtract(i, "day"));
  }

  return calendarDays;
}

const ChakraScrollContainer = chakra(ScrollContainer);

type CalendarSliderProps = {
  onClick?: (day: Dayjs) => void;
};

export function Calendar({ onClick = () => {} }: CalendarSliderProps) {
  const daysRef = useRef<Dayjs[]>(getDays());
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  function handleDayClick(day: Dayjs) {
    setSelectedDate(day);
    onClick(day);
  }

  return (
    <ChakraScrollContainer
      display="flex"
      flexDirection="row-reverse"
      paddingY="2"
      gap="8px"
    >
      {daysRef.current.map((day) => {
        const isSelectedDate = selectedDate.isSame(day, "day");
        return (
          <Button
            variant={isSelectedDate || day.isToday() ? "solid" : "outline"}
            colorScheme={isSelectedDate ? "purple" : "gray"}
            onClick={() => handleDayClick(day)}
            fontSize="small"
            boxShadow="sm"
          >
            {day.date()}
            <br />
            {day.format("ddd")}
          </Button>
        );
      })}
    </ChakraScrollContainer>
  );
}
