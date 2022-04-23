import { useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import dayjs, { Dayjs } from "dayjs";
import { Button, chakra } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setSelectedDay } from "../../../redux";

function getDays() {
  const calendarDays: Dayjs[] = [];
  const startDate = dayjs().add(2, "day");

  for (let i = 0; i < 33; i++) {
    calendarDays.push(startDate.subtract(i, "day"));
  }

  return calendarDays;
}

const ChakraScrollContainer = chakra(ScrollContainer);

export function Calendar() {
  const daysRef = useRef<Dayjs[]>(getDays());
  const selectedDay = useSelector((state: RootState) => state.home.selectedDay);
  const dispatch = useDispatch();

  function handleDayClick(day: Dayjs) {
    dispatch(setSelectedDay(day.valueOf()));
  }

  return (
    <ChakraScrollContainer
      display="flex"
      flexDirection="row-reverse"
      paddingY="2"
      gap="8px"
      marginBottom="3"
    >
      {daysRef.current.map((day, index) => {
        const isSelectedDate = dayjs(selectedDay).isSame(day, "day");
        return (
          <Button
            key={`day-${index}`}
            variant={isSelectedDate || day.isToday() ? "solid" : "outline"}
            colorScheme={isSelectedDate ? "purple" : "gray"}
            onClick={() => handleDayClick(day)}
            fontSize="small"
            fontWeight="normal"
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
