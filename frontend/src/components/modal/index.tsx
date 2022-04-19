import { ReactNode } from "react";
import {
  Modal as ChakraModal,
  ModalBody,
  Box,
  forwardRef,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HiX } from "react-icons/hi";

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
};

export function Modal({ isOpen = true, onClose, children }: Props) {
  const navigate = useNavigate();

  function handleClose() {
    onClose ? onClose() : navigate(-1);
  }

  return (
    <ChakraModal isOpen={isOpen} onClose={handleClose}>
      <Box width="sm" marginX="auto" position="relative">
        <ModalBody>{children}</ModalBody>
      </Box>
    </ChakraModal>
  );
}

export const ModalCloseButton = forwardRef<IconButtonProps, "button">(
  (props, ref) => {
    const navigate = useNavigate();

    return (
      <IconButton
        icon={props.icon ? props.icon : <HiX size={18} />}
        size="sm"
        variant="ghost"
        ref={ref}
        onClick={() => navigate(-1)}
        {...props}
      />
    );
  }
);
