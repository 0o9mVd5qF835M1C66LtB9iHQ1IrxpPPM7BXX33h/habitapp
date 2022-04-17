import { HiOutlineX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { Button } from "../button";

export function PageCloseButton() {
  const navigate = useNavigate();

  function handleGoBackClick() {
    navigate(-1);
  }

  return (
    <Button onClick={handleGoBackClick}>
      <HiOutlineX />
    </Button>
  );
}
