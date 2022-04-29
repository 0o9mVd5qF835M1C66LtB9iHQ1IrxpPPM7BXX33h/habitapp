import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  ModalCloseButton,
} from "@chakra-ui/react";

import { Modal, PageHeader, HabitForm } from "../../components";
import { Habit } from "../../generated/api";
import { useEditHabitMutation } from "./use-edit-habit-mutation";
import { useDeleteHabitMutation } from "./use-delete-habit-mutation";

type Props = {
  editingHabit: Habit;
};

export function EditHabitPage({ editingHabit }: Props) {
  const editHabitMutation = useEditHabitMutation();
  const deleteHabitMutation = useDeleteHabitMutation();
  const [habit, setHabit] = useState<Habit>(editingHabit);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const deleteDialogCancelRef = useRef(null);

  function handleSubmit() {
    editHabitMutation.mutateAsync({
      id: editingHabit._id,
      data: {
        title: habit.title,
        isoWeekdays: habit.isoWeekdays,
      },
    });
  }

  function handleCancelDeleteDialog() {
    setIsDeleteDialogOpen(false);
  }

  function handleOpenDeleteDialog() {
    setIsDeleteDialogOpen(true);
  }

  function handleHabitDelete() {
    deleteHabitMutation.mutateAsync({
      id: editingHabit._id,
    });
  }

  return (
    <Modal>
      <PageHeader marginBottom="10">
        <ModalCloseButton />
      </PageHeader>
      <HabitForm
        formTitle="Edit habit"
        habit={habit}
        submitText="Edit Habit"
        onChange={setHabit}
        onSubmit={handleSubmit}
      />
      <Flex width="100%" justifyContent="center" marginTop="4">
        <Button
          variant="link"
          fontWeight="light"
          textDecoration="underline"
          color="purple.500"
          onClick={handleOpenDeleteDialog}
        >
          Delete habit
        </Button>
      </Flex>
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={deleteDialogCancelRef}
        onClose={handleCancelDeleteDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete habit</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? you can't restore deleted habit.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={deleteDialogCancelRef}
                onClick={handleCancelDeleteDialog}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleHabitDelete} ml="3">
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Modal>
  );
}
