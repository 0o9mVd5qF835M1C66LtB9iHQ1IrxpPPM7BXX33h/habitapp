import { Flex, FlexProps, forwardRef } from "@chakra-ui/react";

export const InfoBlock = forwardRef<FlexProps, "div">((props, ref) => {
  return (
    <Flex
      flex="1"
      ref={ref}
      backgroundColor="gray.50"
      border="1px"
      borderColor="gray.200"
      borderRadius="lg"
      paddingX="4"
      paddingTop="2"
      paddingBottom="4"
      alignItems="center"
      {...props}
    >
      {props.children}
    </Flex>
  );
});
