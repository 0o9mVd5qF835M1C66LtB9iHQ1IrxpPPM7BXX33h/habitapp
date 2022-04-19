import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};

export function PageContainer({ children }: Props) {
  return (
    <Box
      width="sm"
      display="flex"
      flexDirection="column"
      height="100vh"
      marginX="auto"
      paddingX="6"
    >
      {children}
    </Box>
  );
}
