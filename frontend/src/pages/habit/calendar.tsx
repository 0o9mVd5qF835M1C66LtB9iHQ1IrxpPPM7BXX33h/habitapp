import { DayPicker } from "react-day-picker";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Text, Flex, IconButton, Icon } from "@chakra-ui/react";

import { isoWeekdays } from "../../constants";
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { Habit } from "../../generated/api";
import {
  isCompletedOnDate,
  shouldBeCompletedOnDate,
  shouldBeCompletedOnWeekday,
} from "../../helpers";

function isCurrentMonthDate(date: Date): boolean {
  const isAfter = dayjs(date).isSameOrAfter(dayjs().startOf("month"));
  const isBefore = dayjs(date).isSameOrBefore(dayjs().endOf("month"));

  return isAfter && isBefore;
}

type Props = {
  habit: Habit;
};

export function Calendar({ habit }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  function handlePrevMonthClick() {
    setSelectedMonth(dayjs(selectedMonth).subtract(1, "month").toDate());
  }

  function handleNextMonthClick() {
    setSelectedMonth(dayjs(selectedMonth).add(1, "month").toDate());
  }

  return (
    <DayPicker
      selected={selectedDate}
      month={selectedMonth}
      components={{
        Caption: ({ id, displayMonth }) => {
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
              <Text textColor="gray.700" fontWeight="medium">
                {dayjs(selectedMonth).format("MMMM YYYY")}
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
                textColor={isCurrentMonthDate(date) ? "gray.700" : "gray.500"}
              >
                {dayjs(date).format("D")}
              </Text>
              {(() => {
                if (isCompletedOnDate(habit, dayjs(date))) {
                  return (
                    <Icon
                      position="absolute"
                      marginTop="5"
                      color="green.400"
                      as={HiOutlineCheckCircle}
                    />
                  );
                }

                if (shouldBeCompletedOnDate(habit, dayjs(date))) {
                  return (
                    <Icon
                      position="absolute"
                      marginTop="9"
                      color="red.400"
                      as={HiOutlineCheckCircle}
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
