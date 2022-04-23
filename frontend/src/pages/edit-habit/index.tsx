import { HiOutlineX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import { Modal, PageContainer, PageHeader } from "../../components";

export function EditHabitPage() {
  const navigate = useNavigate();

  function handleGoBackClick() {
    navigate(-1);
  }

  return (
    <Modal isOpen={true} onClose={() => {}}>
      <PageContainer>
        <PageHeader>
          <div className="flex flex-row-reverse justify-between items-center">
            <Button onClick={handleGoBackClick}>
              <HiOutlineX />
            </Button>
          </div>
        </PageHeader>
        {/* <HabitForm habit={} onChange /> */}
      </PageContainer>
    </Modal>
  );
}
