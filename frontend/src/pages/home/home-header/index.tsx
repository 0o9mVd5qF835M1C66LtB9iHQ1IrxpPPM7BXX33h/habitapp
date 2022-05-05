import {
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";

import { Link } from "react-router-dom";
import { SettingsDropdown } from "./settings-dropdown";
import { DateText } from "./date-text";

export function HomeHeader() {
  return (
    <Box
      borderBottom="1px"
      borderBottomColor={useColorModeValue("gray.100", "whiteAlpha.300")}
      paddingY="3"
    >
      <Flex alignItems="center" justify="space-between" width="100%">
        <Box>
          <DateText />
          <Text color={useColorModeValue("gray.500", "gray.400")}>
            All habits completed
          </Text>
        </Box>
        <HStack>
          <IconButton
            to="/add-habit"
            as={Link}
            aria-label="Add new habit"
            colorScheme="purple"
            icon={<IoAddOutline size={20} />}
          />
          <SettingsDropdown />
        </HStack>
      </Flex>
    </Box>
  );
}
