import { Flex, Spinner } from "@chakra-ui/react";

import { useHabitControllerFindAllByUserId } from "../../../generated/api";
import { Empty } from "./empty";
import { HabitItem } from "./habit-item";

export function HabitsList() {
  const habitsQuery = useHabitControllerFindAllByUserId();
  const habits = habitsQuery.data ? habitsQuery.data.data : [];

  return (
    <Flex direction="column" flex="1">
      {(() => {
        if (habitsQuery.isLoading) {
          return (
            <Flex flex="1" justifyContent="center">
              <Spinner marginTop="20" size="lg" color="gray.200" />
            </Flex>
          );
        }

        if (!habits.length) {
          return <Empty />;
        }

        return habits.map((habit) => (
          <HabitItem key={`habit-${habit._id}`} habit={habit} />
        ));
      })()}
    </Flex>
  );
}
