import { Navigate, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";

import {
  Habit,
  getHabitControllerFindAllByUserIdQueryKey as getHabitsQueryKey,
  HabitControllerFindAllByUserIdQueryResult as HabitsQueryResult,
} from "../../generated/api";

type Params = {
  habitId: string;
};

type Props = {
  render: (habit: Habit) => JSX.Element;
};

export function WithHabitFromURLParams({ render }: Props): JSX.Element {
  const queryClient = useQueryClient();
  const { habitId } = useParams<Params>();

  const queryData = queryClient.getQueryData<HabitsQueryResult>(
    getHabitsQueryKey()
  );

  const habit = queryData?.data.find((habit) => habit._id === habitId);

  if (!habitId || !habit) {
    return <Navigate replace to="/404" />;
  }

  return render(habit);
}
