import {
  PageCloseButton,
  Modal,
  PageContainer,
  PageHeader,
  HabitForm,
} from "../../components";

export function AddHabitPage() {
  return (
    <Modal>
      <PageContainer>
        <PageHeader>
          <div className="flex flex-row-reverse justify-between items-center">
            <PageCloseButton />
          </div>
        </PageHeader>
        <HabitForm />
      </PageContainer>
    </Modal>
  );
}
