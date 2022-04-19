import { Flex, Spinner } from "@chakra-ui/react";

import { useHabitControllerFindAllByUserId } from "../../../generated/api";
import { HabitItem } from "./habit-item";

export function HabitsList() {
  const habitsQuery = useHabitControllerFindAllByUserId();

  return (
    <Flex direction="column" flex="1">
      {(() => {
        const isInitialLoading =
          habitsQuery.isLoading && !habitsQuery.isFetching;

        if (isInitialLoading || !habitsQuery.data) {
          return (
            <Flex flex="1" justifyContent="center">
              <Spinner marginTop="20" size="lg" color="gray.200" />
            </Flex>
          );
        }

        const habits = habitsQuery.data.data;

        return habits.map((habit) => (
          <HabitItem habit={habit} isHabitCompleted={false} />
        ));
      })()}
    </Flex>
  );
}
