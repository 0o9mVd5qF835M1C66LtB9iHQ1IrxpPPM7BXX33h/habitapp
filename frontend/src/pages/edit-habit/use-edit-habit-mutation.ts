import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { AxiosError } from "axios";

import {
  HabitControllerFindAllByUserIdQueryResult as HabitsQueryResult,
  getHabitControllerFindAllByUserIdQueryKey as getHabitsQueryKey,
  useHabitControllerEditHabit,
} from "../../generated/api";

export function useEditHabitMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const habitsQueryKey = getHabitsQueryKey()[0];

  const editHabitMutation = useHabitControllerEditHabit<
    AxiosError<unknown, unknown>,
    {
      previousHabitsQueryResult: HabitsQueryResult | undefined;
    }
  >({
    mutation: {
      onMutate: async ({ id: habitId, data: newHabit }) => {
        navigate("/home");

        await queryClient.cancelQueries();

        const previousHabitsQueryResult =
          queryClient.getQueryData<HabitsQueryResult>(habitsQueryKey);

        queryClient.setQueryData<HabitsQueryResult | undefined>(
          habitsQueryKey,
          (prevResult) =>
            prevResult
              ? {
                  ...prevResult,
                  data: prevResult.data.map((habitInCache) =>
                    habitInCache._id === habitId
                      ? {
                          ...habitInCache,
                          ...newHabit,
                        }
                      : habitInCache
                  ),
                }
              : undefined
        );

        return {
          previousHabitsQueryResult,
        };
      },
      onError: (_, __, context) => {
        if (context) {
          queryClient.setQueryData<HabitsQueryResult | undefined>(
            habitsQueryKey,
            context.previousHabitsQueryResult
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(habitsQueryKey);
      },
    },
  });

  return editHabitMutation;
}
