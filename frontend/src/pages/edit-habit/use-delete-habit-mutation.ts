import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { AxiosError } from "axios";
import {
  HabitControllerFindAllByUserIdQueryResult as HabitsQueryResult,
  getHabitControllerFindAllByUserIdQueryKey as getHabitsQueryKey,
  useHabitControllerDeleteHabit,
} from "../../generated/api";
import { AppRoutes } from "../../constants";

export function useDeleteHabitMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const habitsQueryKey = getHabitsQueryKey()[0];

  const deleteHabitMutation = useHabitControllerDeleteHabit<
    AxiosError<unknown, unknown>,
    {
      previousHabitsQueryResult: HabitsQueryResult | undefined;
    }
  >({
    mutation: {
      onMutate: async ({ id: habitId }) => {
        navigate(AppRoutes.HOME);

        await queryClient.cancelQueries();

        const previousHabitsQueryResult =
          queryClient.getQueryData<HabitsQueryResult>(habitsQueryKey);

        queryClient.setQueryData<HabitsQueryResult | undefined>(
          habitsQueryKey,
          (prevResult) =>
            prevResult
              ? {
                  ...prevResult,
                  data: prevResult.data.filter(
                    (habitInCache) => habitInCache._id !== habitId
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

  return deleteHabitMutation;
}
