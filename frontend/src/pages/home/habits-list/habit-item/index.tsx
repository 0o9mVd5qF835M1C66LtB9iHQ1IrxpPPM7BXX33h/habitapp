import { AxiosError } from "axios";
import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useQueryClient } from "react-query";

import {
  Habit,
  useCompletedDateControllerCreateCompletedDate as useCreateCompletedDate,
  CompletedDateControllerFindAllByRangeQueryResult as CompletedDatesQueryResult,
} from "../../../../generated/api";
import { WeekdayText } from "./weekday-text";
import { Streak } from "./streak";
import { Checkbox } from "./checkbox";
import { Title } from "./title";
import { RootState } from "../../../../redux";

type Props = {
  habit: Habit;
  isHabitCompleted: boolean;
};

export function HabitItem({ habit, isHabitCompleted }: Props) {
  const selectedDay = useSelector((state: RootState) => state.home.selectedDay);
  const queryClient = useQueryClient();
  const completedDatesQueryKey = useSelector(
    (state: RootState) => state.home.completedDatesQueryKey
  );

  const createCompletedDateMutation = useCreateCompletedDate<
    AxiosError<unknown, unknown>,
    {
      prevCompletedDatesResult: CompletedDatesQueryResult | undefined;
    }
  >({
    mutation: {
      onMutate: ({ data: newCompletedDate }) => {
        const prevCompletedDatesResult =
          queryClient.getQueryData<CompletedDatesQueryResult>(
            completedDatesQueryKey
          );

        queryClient.setQueryData<CompletedDatesQueryResult | undefined>(
          completedDatesQueryKey,
          (state) =>
            state
              ? { ...state, data: [...state.data, newCompletedDate] }
              : undefined
        );

        return {
          prevCompletedDatesResult,
        };
      },
      onSettled: () => {
        queryClient.invalidateQueries(completedDatesQueryKey);
      },
    },
  });

  function handleComplete() {
    createCompletedDateMutation.mutate({
      data: {
        date: selectedDay,
        habitId: habit._id,
        userId: habit.userId,
      },
    });
  }

  function handleUnComplete() {}

  return (
    <Flex
      width="100%"
      shadow="base"
      paddingX="3"
      paddingY="3.5"
      marginBottom="4"
      border="1px"
      borderColor="gray.100"
      borderRadius="lg"
      cursor="pointer"
      // onClick={() => onClick(habit)}
    >
      <div className="w-full">
        <WeekdayText weekdays={habit.isoWeekdays} />
        <Title title={habit.title} isCompleted={isHabitCompleted} />
        <Streak habit={habit} />
      </div>
      <Checkbox
        onComplete={handleComplete}
        onUncomplete={() => {}}
        isCompleted={isHabitCompleted}
      />
    </Flex>
  );
}
