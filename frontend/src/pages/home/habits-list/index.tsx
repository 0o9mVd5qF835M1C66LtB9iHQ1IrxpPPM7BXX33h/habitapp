import { Flex, Spinner } from "@chakra-ui/react";

import { Habit } from "../../../generated/api";
import { HabitItem } from "./habit-item";

type Props = {
  habits: Habit[];
  isLoading: boolean;
};

export function HabitsList({ habits, isLoading }: Props) {
  return (
    <Flex direction="column" flex="1">
      {(() => {
        if (isLoading) {
          return (
            <Flex flex="1" justifyContent="center">
              <Spinner marginTop="20" size="lg" color="gray.200" />
            </Flex>
          );
        }

        return habits.map((habit) => (
          <HabitItem key={`habit-${habit._id}`} habit={habit} />
        ));
      })()}
    </Flex>
  );
}
