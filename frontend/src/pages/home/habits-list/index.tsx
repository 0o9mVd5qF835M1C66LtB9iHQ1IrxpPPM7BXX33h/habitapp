import { Flex, Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import {
  useCompletedDateControllerFindAllByRange,
  useHabitControllerFindAllByUserId,
  getCompletedDateControllerFindAllByRangeQueryKey as getCompletedDatesQueryKey,
  CompletedDateControllerFindAllByRangeParams as CompletedDatesQueryParams,
} from "../../../generated/api";
import { RootState, setCompletedDatesQueryKey } from "../../../redux";
import { HabitItem } from "./habit-item";

export const completedDatesQueryKey = "completed dates query in home page";

export function HabitsList() {
  const selectedDay = useSelector((state: RootState) => state.home.selectedDay);
  const habitsQuery = useHabitControllerFindAllByUserId();
  const completedDatesQueryParams: CompletedDatesQueryParams = {
    startDate: Number(dayjs(selectedDay).startOf("day")),
    endDate: Number(dayjs(selectedDay).endOf("day")),
  };
  const dispatch = useDispatch();

  const completedDatesQueryKey = getCompletedDatesQueryKey(
    completedDatesQueryParams
  );

  const completedDatesForDayQuery = useCompletedDateControllerFindAllByRange(
    completedDatesQueryParams,
    {
      query: {
        queryKey: completedDatesQueryKey,
        onSuccess: () => {
          dispatch(setCompletedDatesQueryKey(completedDatesQueryKey));
        },
      },
    }
  );

  const completedDates = completedDatesForDayQuery.data
    ? completedDatesForDayQuery.data.data
    : [];

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
          <HabitItem
            key={`habit-${habit._id}`}
            habit={habit}
            isHabitCompleted={completedDates.some(
              (completedDate) => completedDate.habitId === habit._id
            )}
          />
        ));
      })()}
    </Flex>
  );
}
