import { Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import dayjs, { Dayjs } from "dayjs";
import { IoAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { SettingsDropdown } from "./settings-dropdown";

type Props = {
  selectedDay: Dayjs;
};
export function HomeHeader({ selectedDay }: Props) {
  function getDayTitle() {
    const today = dayjs();

    if (today.isSame(selectedDay, "day")) {
      return "Today";
    }

    if (selectedDay.isSame(today.subtract(1, "day"), "day")) {
      return "Yesterday";
    }

    if (selectedDay.isSame(today.add(1, "day"), "day")) {
      return "Tomorrow";
    }

    return selectedDay.format("MMM, D");
  }

  return (
    <Box borderBottom="1px" borderBottomColor="gray.100" paddingY="3">
      <Flex alignItems="center" justify="space-between" width="100%">
        <Box>
          <Text fontSize="2xl" color="gray.900" fontWeight="bold">
            {getDayTitle()}
          </Text>
          <Text color="gray.500" fontSize="small">
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
