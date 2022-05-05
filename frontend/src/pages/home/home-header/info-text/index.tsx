import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { Text, useColorModeValue } from "@chakra-ui/react";

import {
  getHabitControllerFindAllByUserIdQueryKey,
  HabitControllerFindAllByUserIdQueryResult,
} from "../../../../generated/api";
import { RootState } from "../../../../redux";
import { countNumOfUncompletedHabitsOnDate } from "../../../../helpers";

export function InfoText() {
  const selectedDay = useSelector((state: RootState) => state.home.selectedDay);
  const [uncompletedHabitsAmount, setUncompletedHabitsAmount] = useState(0);
  const queryClient = useQueryClient();

  const habitsQueryFromCache =
    queryClient.getQueryData<HabitControllerFindAllByUserIdQueryResult>(
      getHabitControllerFindAllByUserIdQueryKey()
    );

  const findUncompletedHabits = useCallback(() => {
    if (!habitsQueryFromCache) {
      setUncompletedHabitsAmount(0);
      return;
    }

    const numOfUncompletedHabits = countNumOfUncompletedHabitsOnDate(
      habitsQueryFromCache.data,
      dayjs(selectedDay)
    );

    setUncompletedHabitsAmount(numOfUncompletedHabits);
  }, [selectedDay, habitsQueryFromCache]);

  useEffect(() => {
    findUncompletedHabits();
  }, [findUncompletedHabits]);

  return (
    <Text color={useColorModeValue("gray.500", "gray.400")}>
      {uncompletedHabitsAmount === 0
        ? "All habits completed"
        : uncompletedHabitsAmount > 1
        ? `${uncompletedHabitsAmount} habits left to complete`
        : `${uncompletedHabitsAmount} habit left to complete`}
    </Text>
  );
}
