import {
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { IoAddOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../redux";
import { SettingsDropdown } from "./settings-dropdown";

export function HomeHeader() {
  const selectedDay = useSelector((state: RootState) => state.home.selectedDay);

  function getDayTitle() {
    const today = dayjs();

    if (today.isSame(selectedDay, "day")) {
      return "Today";
    }

    const selectedDayInDayjs = dayjs(selectedDay);

    if (selectedDayInDayjs.isSame(today.subtract(1, "day"), "day")) {
      return "Yesterday";
    }

    if (selectedDayInDayjs.isSame(today.add(1, "day"), "day")) {
      return "Tomorrow";
    }

    return selectedDayInDayjs.format("MMM, D");
  }

  return (
    <Box
      borderBottom="1px"
      borderBottomColor={useColorModeValue("gray.100", "whiteAlpha.300")}
      paddingY="3"
    >
      <Flex alignItems="center" justify="space-between" width="100%">
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            {getDayTitle()}
          </Text>
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
