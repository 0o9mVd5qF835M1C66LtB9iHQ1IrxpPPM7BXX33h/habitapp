import { DayPicker } from "react-day-picker";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Text,
  Flex,
  IconButton,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import { isoWeekdays } from "../../constants";
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from "react-icons/hi";
import { Habit } from "../../generated/api";
import { isCompletedOnDate, shouldBeCompletedOnDate } from "../../helpers";

function isSelectedMonthDate(date: Dayjs, selectedMonth: Dayjs): boolean {
  return date.isSame(selectedMonth, "month");
}

type Props = {
  habit: Habit;
};

export function Calendar({ habit }: Props) {
  const [selectedDate] = useState<Dayjs>(dayjs());
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs());

  function handlePrevMonthClick() {
    setSelectedMonth(selectedMonth.subtract(1, "month"));
  }

  function handleNextMonthClick() {
    setSelectedMonth(selectedMonth.add(1, "month"));
  }

  return (
    <DayPicker
      selected={selectedDate.toDate()}
      month={selectedMonth.toDate()}
      components={{
        Caption: ({ id }) => {
          return (
            <Flex
              id={id}
              justifyContent="space-between"
              alignItems="center"
              marginBottom="2"
            >
              <IconButton
                aria-label="previous month"
                color="gray.500"
                variant="ghost"
                icon={<HiChevronLeft size={20} />}
                onClick={handlePrevMonthClick}
              />
              <Text fontWeight="medium">
                {selectedMonth.format("MMMM YYYY")}
              </Text>
              <IconButton
                aria-label="previous month"
                color="gray.500"
                variant="ghost"
                onClick={handleNextMonthClick}
                icon={<HiChevronRight size={20} />}
              />
            </Flex>
          );
        },
        Head: () => {
          return (
            <thead>
              <tr>
                {isoWeekdays.map((isoWeekday) => (
                  <td key={`iso-weekday-${isoWeekday}`}>
                    <Text
                      width="100%"
                      textAlign="center"
                      fontSize="sm"
                      fontWeight="medium"
                      paddingY="2.5"
                    >
                      {dayjs().isoWeekday(isoWeekday).format("dd")}
                    </Text>
                  </td>
                ))}
              </tr>
            </thead>
          );
        },
        Day: ({ date }) => {
          const dayjsDate = dayjs(date);

          return (
            <Flex
              key={`date-${Number(date)}`}
              flexDirection="column"
              position="relative"
              alignItems="center"
              paddingY="2.5"
            >
              <Text
                fontSize="sm"
                textColor={
                  isSelectedMonthDate(dayjsDate, selectedMonth)
                    ? // eslint-disable-next-line react-hooks/rules-of-hooks
                      useColorModeValue("gray.700", "whiteAlpha.800")
                    : // eslint-disable-next-line react-hooks/rules-of-hooks
                      useColorModeValue("gray.300", "gray.600")
                }
              >
                {dayjsDate.format("D")}
              </Text>
              {(() => {
                if (isCompletedOnDate(habit, dayjsDate)) {
                  return (
                    <Icon
                      position="absolute"
                      marginTop="6"
                      color="green.400"
                      as={HiOutlineCheckCircle}
                    />
                  );
                }

                if (shouldBeCompletedOnDate(habit, dayjsDate)) {
                  return (
                    <Icon
                      position="absolute"
                      marginTop="6"
                      color="red.400"
                      as={HiOutlineXCircle}
                    />
                  );
                }
              })()}
            </Flex>
          );
        },
      }}
    />
  );
}
