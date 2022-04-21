import { Flex, Icon, Text } from "@chakra-ui/react";
import { HiOutlineLightningBolt } from "react-icons/hi";

import { Habit } from "../../../../../generated/api";

type Props = {
  habit: Habit;
};

export function Streak({ habit }: Props) {
  return (
    <Flex
      alignItems="center"
      color={habit.currentStreakDates.length ? "yellow.500" : "gray.500"}
    >
      <Icon as={HiOutlineLightningBolt} marginRight="1" />
      <Text fontSize="xs">{habit.currentStreakDates.length} day streak</Text>
    </Flex>
  );
}
