import {
  Box,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";

import { Link } from "react-router-dom";
import { SettingsDropdown } from "./settings-dropdown";
import { DateText } from "./date-text";
import { InfoText } from "./info-text";

export function HomeHeader() {
  return (
    <Box
      borderBottom="1px"
      borderBottomColor={useColorModeValue("gray.100", "whiteAlpha.300")}
      paddingY="3"
      position="sticky"
      top="0"
      backgroundColor="white"
      boxShadow="rgb(255 255 255) -3px 0px 3px 1px, rgb(255 255 255) 3px 0px 3px 1px"
      zIndex="overlay"
    >
      <Flex alignItems="center" justify="space-between" width="100%">
        <Box>
          <DateText />
          <InfoText />
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
