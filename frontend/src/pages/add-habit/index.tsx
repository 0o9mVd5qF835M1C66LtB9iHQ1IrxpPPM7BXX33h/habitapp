import { Modal, PageHeader, HabitForm } from "../../components";

export function AddHabitPage() {
  return (
    <Modal>
      {
        // Why this? PageHeader??
      }
      <PageHeader></PageHeader>
      <HabitForm />
    </Modal>
  );
}
