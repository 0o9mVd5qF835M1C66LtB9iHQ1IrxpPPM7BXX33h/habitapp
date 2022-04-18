import { ReactNode } from "react";
import {
  Modal as ChakraModal,
  ModalBody,
  Box,
  ModalCloseButton,
  Container,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </Box>
    </ChakraModal>
  );
}
