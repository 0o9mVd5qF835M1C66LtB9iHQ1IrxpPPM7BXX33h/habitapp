import { Box, BoxProps, forwardRef } from "@chakra-ui/react";

export const PageHeader = forwardRef<BoxProps, "div">((props, ref) => (
  <Box width="full" height="72px" ref={ref} {...props} />
));
