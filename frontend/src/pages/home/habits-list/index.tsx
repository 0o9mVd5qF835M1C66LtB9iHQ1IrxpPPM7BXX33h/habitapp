import { Flex, Spinner } from "@chakra-ui/react";

import { useHabitControllerFindAllByUserId } from "../../../generated/api";
import { HabitItem } from "./habit-item";

export const completedDatesQueryKey = "completed dates query in home page";

export function HabitsList() {
  const habitsQuery = useHabitControllerFindAllByUserId();
  const habits = habitsQuery.data ? habitsQuery.data.data : [];

  return (
    <Flex direction="column" flex="1">
      {(() => {
        const isHabitsInitialLoading =
          habitsQuery.isLoading && !habitsQuery.isFetching;

        if (isHabitsInitialLoading) {
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
