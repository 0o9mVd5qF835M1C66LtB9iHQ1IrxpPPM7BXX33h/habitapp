import {
  Flex,
  FlexProps,
  forwardRef,
  useColorModeValue,
} from "@chakra-ui/react";

export const InfoBlock = forwardRef<FlexProps, "div">((props, ref) => {
  return (
    <Flex
      flex="1"
      ref={ref}
      backgroundColor={useColorModeValue("gray.50", "blackAlpha.100")}
      border="1px"
      borderColor="blackAlpha.200"
      borderRadius="lg"
      paddingX="4"
      paddingY="4"
      alignItems="center"
      {...props}
    >
      {props.children}
    </Flex>
  );
});
