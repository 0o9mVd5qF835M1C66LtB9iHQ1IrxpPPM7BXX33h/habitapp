import { Flex, Icon, Text } from "@chakra-ui/react";
import { HiOutlineLightningBolt } from "react-icons/hi";

import { Habit } from "../../../../../generated/api";

type Props = {
  habit: Habit;
};

export function Streak({ habit }: Props) {
  return (
    <Flex alignItems="center">
      <Icon as={HiOutlineLightningBolt} color="yellow.500" marginRight="1" />
      <Text color="yellow.500" fontSize="xs">
        {habit.currentStreakDates.length} day streak
      </Text>
    </Flex>
  );
}
