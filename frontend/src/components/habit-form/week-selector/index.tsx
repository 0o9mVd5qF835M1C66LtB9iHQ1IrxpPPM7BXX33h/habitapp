import { Button, Flex } from "@chakra-ui/react";
import dayjs from "dayjs";

import { isoWeekdays } from "../../../constants";

type Props = {
  selectedWeekdays: number[];
  onWeekdaySelect: (weekday: number) => void;
};

export function WeekSelector({ selectedWeekdays, onWeekdaySelect }: Props) {
  return (
    <Flex gap="4px">
      {isoWeekdays.map((weekday) => {
        const isSelectedWeekday = selectedWeekdays.includes(weekday);
        return (
          <Button
            key={`iso-weekday-${weekday}`}
            variant={isSelectedWeekday ? "solid" : "outline"}
            colorScheme={isSelectedWeekday ? "purple" : "gray"}
            fontSize="small"
            flex="1"
            onClick={() => onWeekdaySelect(weekday)}
          >
            {dayjs().isoWeekday(weekday).format("ddd")}
          </Button>
        );
      })}
    </Flex>
  );
}
