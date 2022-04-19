import { IconButton } from "@chakra-ui/react";
import { HiOutlineCheck } from "react-icons/hi";

type Props = {
  onComplete: () => void;
  onUncomplete: () => void;
  isCompleted: boolean;
};

export function Checkbox({ onComplete, onUncomplete, isCompleted }: Props) {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    isCompleted ? onUncomplete() : onComplete();
  }

  return (
    <IconButton
      icon={isCompleted ? <HiOutlineCheck /> : undefined}
      aria-label={isCompleted ? "uncomplete habit" : "complete habit"}
      borderRadius="full"
      colorScheme={isCompleted ? "green" : "gray"}
      variant={isCompleted ? "solid" : "outline"}
      size="sm"
      onClick={handleClick}
    />
  );
}
