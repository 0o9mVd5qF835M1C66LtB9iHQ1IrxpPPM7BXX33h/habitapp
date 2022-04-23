import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { habitId } = useParams<Params>();
  const [habit, setHabit] = useState<Habit>();

  useEffect(() => {
    if (!habitId) {
      navigate("/");
      return;
    }

    const queryData = queryClient.getQueryData<HabitsQueryResult>(
      getHabitsQueryKey()
    );

    if (!queryData) {
      navigate("/");
      return;
    }

    const foundHabit = queryData.data.find((habit) => habit._id === habitId);
    if (!foundHabit) {
      navigate("/");
      return;
    }

    setHabit(foundHabit);
  }, [habitId]);

  if (!habitId || !habit) {
    return <></>;
  }

  return render(habit);
}
