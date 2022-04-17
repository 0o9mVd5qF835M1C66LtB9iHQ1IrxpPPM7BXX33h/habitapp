import { HiOutlineX } from "react-icons/hi";

import {
  Button,
  Input,
  Form,
  Modal,
  PageContainer,
  PageHeader,
} from "../../components";

export type AddHabitPageProps = {};

export function AddHabitPage(props: AddHabitPageProps) {
  return (
    <Modal>
      <PageContainer>
        <PageHeader>
          <div className="flex flex-row-reverse justify-between items-center">
            <Button>
              <HiOutlineX />
            </Button>
          </div>
        </PageHeader>
        <Form className="flex flex-1 flex-col justify-center items-center">
          <h1 className="text-base text-gray-900 font-bold text-center mb-20">
            Add new habit
          </h1>
          <Input className="w-full mb-4" placeholder="Enter your habit" />
          <Button className="text-white bg-primary-600 w-full text-base">
            Create habit
          </Button>
        </Form>
      </PageContainer>
    </Modal>
  );
}
