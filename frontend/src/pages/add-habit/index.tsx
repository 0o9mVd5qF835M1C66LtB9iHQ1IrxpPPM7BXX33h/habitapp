import { useState } from "react";
import ObjectId from "bson-objectid";
import { useNavigate } from "react-router-dom";
import { ModalCloseButton } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import { AxiosError } from "axios";

import { Modal, PageHeader, HabitForm } from "../../components";
import {
  HabitControllerFindAllByUserIdQueryResult,
  useHabitControllerCreateHabit,
  getHabitControllerFindAllByUserIdQueryKey,
  CreateHabitInput,
} from "../../generated/api";
import { useAuthUser } from "../../hooks";

export function AddHabitPage() {
  const user = useAuthUser();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const habitsQueryKey = getHabitControllerFindAllByUserIdQueryKey()[0];

  const [habit, setHabit] = useState<CreateHabitInput>({
    _id: new ObjectId().toHexString(),
    title: "",
    userId: user._id,
    isoWeekdays: [],
    dateCreated: Number(new Date()),
    completedDates: [],
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
      <PageHeader marginBottom="10">
        <ModalCloseButton />
      </PageHeader>
      <HabitForm
        formTitle="Add new habit"
        habit={habit}
        submitText="Create Habit"
        onChange={setHabit}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}
