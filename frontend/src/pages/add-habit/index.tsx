import { useState } from "react";
import ObjectId from "bson-objectid";

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
    { previousHabits: Habit[] }
  >({
    mutation: {
      onMutate: async ({ data: newHabit }) => {
        await queryClient.cancelQueries();

        const previousHabits =
          queryClient.getQueryData<
            HabitControllerFindAllByUserIdQueryResult["data"]
          >(habitsQueryKey) || [];

        queryClient.setQueryData<
          HabitControllerFindAllByUserIdQueryResult["data"]
        >(habitsQueryKey, (prevHabits) => [newHabit, ...(prevHabits || [])]);

        return {
          previousHabits,
        };
      },
      onError: (_, __, context) => {
        queryClient.setQueryData<
          HabitControllerFindAllByUserIdQueryResult["data"]
        >(habitsQueryKey, context ? context.previousHabits : []);
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
      {/* <PageHeader></PageHeader> */}
      <HabitForm habit={habit} onChange={setHabit} onSubmit={handleSubmit} />
    </Modal>
  );
}
