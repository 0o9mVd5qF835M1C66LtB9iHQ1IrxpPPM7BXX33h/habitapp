import { Flex, Icon, Text } from "@chakra-ui/react";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { HiOutlineLightningBolt } from "react-icons/hi";

import { Habit } from "../../../../../generated/api";
import { useAuthUser } from "../../../../../hooks";

type Props = {
  habit: Habit;
};

export function Streak({ habit }: Props) {
  const user = useAuthUser();
  const [streak, setStreak] = useState<number[]>([]);

  const calculateStreak = useCallback(() => {
    function shouldComplete(isoWeekday: number) {
      return habit.isoWeekdays.includes(isoWeekday);
    }

    function isCompleted(date: Dayjs) {
      return habit.completedDates.some((completedDate) =>
        date.isSame(completedDate, "day")
      );
    }

    const startDate = dayjs();
    const endDate = dayjs(user.dateCreated);
    let date = startDate;
    const streak = [];

    while (date.isSameOrAfter(endDate, "day")) {
      const shouldCompleteOnDate = shouldComplete(date.isoWeekday());

      if (!shouldCompleteOnDate) {
        date = date.subtract(1, "day");
        continue;
      }

      const isCompletedOnDate = isCompleted(date);

      if (!isCompletedOnDate) break;

      streak.push(date.valueOf());
      date = date.subtract(1, "day");
    }

    return streak;
  }, [habit.completedDates, habit.isoWeekdays, user.dateCreated]);

  useEffect(() => {
    setStreak((prev) => [...calculateStreak()]);
  }, [calculateStreak]);

  return (
    <Flex alignItems="center" color={streak.length ? "yellow.500" : "gray.500"}>
      <Icon as={HiOutlineLightningBolt} marginRight="1" />
      <Text fontSize="xs">{streak.length} day streak</Text>
    </Flex>
  );
}
