import { HiOutlineX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Input,
  Form,
  Modal,
  PageContainer,
  PageHeader,
  WeekSelector,
} from "../../components";

export function AddHabitPage() {
  const navigate = useNavigate();

  function handleGoBackClick() {
    navigate(-1);
  }

  return (
    <Modal>
      <PageContainer>
        <PageHeader>
          <div className="flex flex-row-reverse justify-between items-center">
            <Button onClick={handleGoBackClick}>
              <HiOutlineX />
            </Button>
          </div>
        </PageHeader>
        <Form className="flex flex-1 flex-col items-center pt-32">
          <h1 className="text-base text-gray-900 font-bold text-center mb-20">
            Add new habit
          </h1>
          <Input className="w-full mb-2" placeholder="Enter your habit" />
          <WeekSelector className="mb-6" />
          <Button className="text-white bg-primary-600 p-2 w-full text-base">
            Create habit
          </Button>
        </Form>
      </PageContainer>
    </Modal>
  );
}
