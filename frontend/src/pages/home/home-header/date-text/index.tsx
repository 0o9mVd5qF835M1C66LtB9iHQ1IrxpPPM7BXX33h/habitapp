import { Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

import { RootState } from "../../../../redux";

export function DateText() {
  const selectedDay = useSelector((state: RootState) => state.home.selectedDay);

  function getDayTitle() {
    const today = dayjs();

    if (today.isSame(selectedDay, "day")) {
      return "Today";
    }

    const selectedDayInDayjs = dayjs(selectedDay);

    if (selectedDayInDayjs.isSame(today.subtract(1, "day"), "day")) {
      return "Yesterday";
    }

    if (selectedDayInDayjs.isSame(today.add(1, "day"), "day")) {
      return "Tomorrow";
    }

    return selectedDayInDayjs.format("MMM, D");
  }

  return (
    <Text fontSize="2xl" fontWeight="bold">
      {getDayTitle()}
    </Text>
  );
}
