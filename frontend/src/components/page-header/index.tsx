import { Flex, BoxProps, forwardRef } from "@chakra-ui/react";

export const PageHeader = forwardRef<BoxProps, "div">((props, ref) => (
  <Flex width="full" height="72px" alignItems="center" ref={ref} {...props} />
));
