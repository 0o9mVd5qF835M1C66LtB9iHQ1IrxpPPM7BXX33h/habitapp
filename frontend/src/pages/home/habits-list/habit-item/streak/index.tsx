import { Flex, Icon, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HiOutlineLightningBolt } from "react-icons/hi";

import { Habit } from "../../../../../generated/api";
import { calculateCurrentStreak } from "../../../../../helpers";

type Props = {
  habit: Habit;
};

export function Streak({ habit }: Props) {
  const [streak, setStreak] = useState<number[]>([]);

  useEffect(() => {
    setStreak(calculateCurrentStreak(habit));
  }, [habit.completedDates.length]);

  return (
    <Flex alignItems="center" color={streak.length ? "yellow.500" : "gray.500"}>
      <Icon as={HiOutlineLightningBolt} marginRight="1" />
      <Text fontSize="xs">{streak.length} day streak</Text>
    </Flex>
  );
}
