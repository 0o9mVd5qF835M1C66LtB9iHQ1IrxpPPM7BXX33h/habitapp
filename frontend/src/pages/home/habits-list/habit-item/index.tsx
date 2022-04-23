import { AxiosError } from "axios";
import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useQueryClient } from "react-query";
import dayjs from "dayjs";
import produce from "immer";

import {
  Habit,
  getHabitControllerFindAllByUserIdQueryKey,
  HabitControllerFindAllByUserIdQueryResult as HabitsQueryResult,
  useHabitControllerUpdateHabitCompletedDates,
} from "../../../../generated/api";
import { WeekdayText } from "./weekday-text";
import { Streak } from "./streak";
import { Checkbox } from "./checkbox";
import { Title } from "./title";
import { RootState } from "../../../../redux";
import {
  isCompletedOnDate,
  shouldBeCompletedOnWeekday,
} from "../../../../helpers";
import { useNavigate } from "react-router-dom";

type Props = {
  habit: Habit;
};

export function HabitItem({ habit }: Props) {
  const selectedDay = useSelector((state: RootState) => state.home.selectedDay);
  const queryClient = useQueryClient();
  const queryKey = getHabitControllerFindAllByUserIdQueryKey();
  const navigate = useNavigate();

  const updateHabitCompletedDatesMutation =
    useHabitControllerUpdateHabitCompletedDates<
      AxiosError<unknown, unknown>,
      {
        prevHabitsQueryResult: HabitsQueryResult | undefined;
      }
    >({
      mutation: {
        onMutate: async ({ data }) => {
          queryClient.cancelQueries(queryKey);

          const prevHabitsQueryResult =
            queryClient.getQueryData<HabitsQueryResult>(queryKey);

          if (prevHabitsQueryResult) {
            queryClient.setQueryData<HabitsQueryResult | undefined>(
              queryKey,
              (prevData) => {
                if (prevData) {
                  return produce(prevData, (draft) => {
                    const updatingHabit = draft.data.find(
                      (habit) => habit._id === data.habitId
                    );

                    if (!updatingHabit) {
                      throw new Error("Can't not found habit.");
                    }

                    updatingHabit.completedDates = data.completedDates;
                  });
                }
                return undefined;
              }
            );
          }

          return { prevHabitsQueryResult };
        },
        onError: (_, __, context) => {
          queryClient.setQueryData(queryKey, context?.prevHabitsQueryResult);
        },
        onSettled: () => {
          queryClient.invalidateQueries(queryKey);
        },
      },
    });

  function handleUpdateHabitCompletedDates(action: "complete" | "uncomplete") {
    if (action === "complete") {
      updateHabitCompletedDatesMutation.mutate({
        data: {
          habitId: habit._id,
          completedDates: [...habit.completedDates, selectedDay.valueOf()].sort(
            (a, b) => a - b
          ),
        },
      });
    } else {
      updateHabitCompletedDatesMutation.mutate({
        data: {
          habitId: habit._id,
          completedDates: habit.completedDates.filter(
            (completedDate) => !dayjs(selectedDay).isSame(completedDate, "day")
          ),
        },
      });
    }
  }

  function handleHabitItemClick() {
    navigate(`/habits/${habit._id}`);
  }

  const isCompletedOnSelectedDay = isCompletedOnDate(habit, dayjs(selectedDay));
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
      role="button"
      aria-label={`Habit: ${habit.title}`}
      onClick={handleHabitItemClick}
    >
      <div className="w-full">
        <WeekdayText weekdays={habit.isoWeekdays} />
        <Title title={habit.title} isCompleted={isCompletedOnSelectedDay} />
        <Streak habit={habit} />
      </div>
      {(() => {
        if (
          shouldBeCompletedOnWeekday(habit, dayjs(selectedDay).isoWeekday())
        ) {
          return (
            <Checkbox
              onComplete={handleUpdateHabitCompletedDates}
              isCompleted={isCompletedOnSelectedDay}
            />
          );
        }

        return null;
      })()}
    </Flex>
  );
}
