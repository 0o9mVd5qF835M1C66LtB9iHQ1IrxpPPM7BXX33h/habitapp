import { IconButton } from "@chakra-ui/react";
import { HiOutlineCheck } from "react-icons/hi";

type Props = {
  onComplete: (action: "complete" | "uncomplete") => void;
  isCompleted: boolean;
};

export function Checkbox({ onComplete, isCompleted }: Props) {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onComplete(isCompleted ? "uncomplete" : "complete");
  }

  return (
    <IconButton
      icon={isCompleted ? <HiOutlineCheck /> : undefined}
      aria-label={isCompleted ? "uncomplete habit" : "complete habit"}
      borderRadius="full"
      colorScheme={isCompleted ? "green" : "gray"}
      variant={isCompleted ? "solid" : "outline"}
      boxShadow="sm"
      size="sm"
      onClick={handleClick}
    />
  );
}
