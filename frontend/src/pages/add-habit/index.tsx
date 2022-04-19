import { useState } from "react";
import ObjectId from "bson-objectid";
import { useNavigate } from "react-router-dom";

import { Modal, PageHeader, HabitForm } from "../../components";
import {
  Habit,
  HabitControllerFindAllByUserIdQueryResult,
  useHabitControllerCreateHabit,
  getHabitControllerFindAllByUserIdQueryKey,
  CreateHabitInput,
} from "../../generated/api";
import { useAuthUser } from "../../hooks";
import { useQueryClient } from "react-query";
import { AxiosError } from "axios";

export function AddHabitPage() {
  const user = useAuthUser();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const habitsQueryKey = getHabitControllerFindAllByUserIdQueryKey()[0];

  const [habit, setHabit] = useState<CreateHabitInput>({
    _id: ObjectId().toHexString(),
    title: "",
    userId: user._id,
    isoWeekdays: [],
    dateCreated: Number(new Date()),
    currentStreakDates: [],
    longestStreakDates: [],
    archived: false,
  });

  const createHabitMutation = useHabitControllerCreateHabit<
    AxiosError<unknown, unknown>,
    {
      previousHabitsQueryResult:
        | HabitControllerFindAllByUserIdQueryResult
        | undefined;
    }
  >({
    mutation: {
      onMutate: async ({ data: newHabit }) => {
        navigate("/home");

        await queryClient.cancelQueries();

        const previousHabitsQueryResult =
          queryClient.getQueryData<HabitControllerFindAllByUserIdQueryResult>(
            habitsQueryKey
          );

        queryClient.setQueryData<
          HabitControllerFindAllByUserIdQueryResult | undefined
        >(habitsQueryKey, (prevResult) =>
          prevResult
            ? { ...prevResult, data: [newHabit, ...prevResult.data] }
            : undefined
        );

        return {
          previousHabitsQueryResult,
        };
      },
      onError: (_, __, context) => {
        if (context) {
          queryClient.setQueryData<
            HabitControllerFindAllByUserIdQueryResult | undefined
          >(habitsQueryKey, context.previousHabitsQueryResult);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(habitsQueryKey);
      },
    },
  });

  function handleSubmit() {
    createHabitMutation.mutateAsync({
      data: { ...habit, dateCreated: Number(new Date()) },
    });
  }

  return (
    <Modal>
      <PageHeader></PageHeader>
      <HabitForm habit={habit} onChange={setHabit} onSubmit={handleSubmit} />
    </Modal>
  );
}
