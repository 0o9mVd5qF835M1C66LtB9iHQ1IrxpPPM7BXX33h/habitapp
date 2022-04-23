import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalCloseButton } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import { AxiosError } from "axios";

import { Modal, PageHeader, HabitForm } from "../../components";
import {
  HabitControllerFindAllByUserIdQueryResult as HabitsQueryResult,
  getHabitControllerFindAllByUserIdQueryKey,
  Habit,
  useHabitControllerEditHabit as useHabitEditMutation,
} from "../../generated/api";

type Props = {
  editingHabit: Habit;
};

export function EditHabitPage({ editingHabit }: Props) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const habitsQueryKey = getHabitControllerFindAllByUserIdQueryKey()[0];

  const [habit, setHabit] = useState<Habit>(editingHabit);

  const editHabitMutation = useHabitEditMutation<
    AxiosError<unknown, unknown>,
    {
      previousHabitsQueryResult: HabitsQueryResult | undefined;
    }
  >({
    mutation: {
      onMutate: async ({ data: newHabit }) => {
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
                    habitInCache._id === habit._id
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

  function handleSubmit() {
    editHabitMutation.mutateAsync({
      id: editingHabit._id,
      data: {
        title: habit.title,
        isoWeekdays: habit.isoWeekdays,
      },
    });
  }

  return (
    <Modal>
      <PageHeader marginBottom="10">
        <ModalCloseButton />
      </PageHeader>
      <HabitForm
        formTitle="editHabit"
        habit={habit}
        submitText="Edit Habit"
        onChange={setHabit}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}
