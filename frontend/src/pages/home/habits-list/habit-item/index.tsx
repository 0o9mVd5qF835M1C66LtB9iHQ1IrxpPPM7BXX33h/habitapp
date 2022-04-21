import { AxiosError } from "axios";
import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useQueryClient } from "react-query";
import dayjs from "dayjs";

import {
  Habit,
  useCompletedDateControllerCreateCompletedDate as useCreateCompletedDate,
  CompletedDateControllerFindAllByRangeQueryResult as CompletedDatesQueryResult,
  useCompletedDateControllerDeleteCompletedDate as useCompletedDateDelete,
} from "../../../../generated/api";
import { WeekdayText } from "./weekday-text";
import { Streak } from "./streak";
import { Checkbox } from "./checkbox";
import { Title } from "./title";
import { RootState } from "../../../../redux";
import ObjectID from "bson-objectid";

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

  const deleteCompletedDateMutation = useCompletedDateDelete<
    AxiosError<unknown, unknown>,
    {
      prevCompletedDatesResult: CompletedDatesQueryResult | undefined;
    }
  >({
    mutation: {
      onMutate: ({ id }) => {
        const prevCompletedDatesResult =
          queryClient.getQueryData<CompletedDatesQueryResult>(
            completedDatesQueryKey
          );

        queryClient.setQueryData<CompletedDatesQueryResult | undefined>(
          completedDatesQueryKey,
          (state) =>
            state
              ? {
                  ...state,
                  data: state.data.filter(
                    (completedDate) => completedDate._id !== id
                  ),
                }
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
        _id: ObjectID().toHexString(),
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
      {(() => {
        if (habit.isoWeekdays.includes(dayjs(selectedDay).isoWeekday())) {
          return (
            <Checkbox
              onComplete={handleComplete}
              onUncomplete={() => {}}
              isCompleted={isHabitCompleted}
            />
          );
        }

        return null;
      })()}
    </Flex>
  );
}
