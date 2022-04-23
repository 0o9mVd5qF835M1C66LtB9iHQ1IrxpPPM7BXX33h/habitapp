import { Text } from "@chakra-ui/react";
import { getOccurenceString } from "../../../../../helpers";

type Props = {
  weekdays: number[];
};

export function WeekdayText({ weekdays }: Props) {
  return (
    <Text color="purple.600" fontWeight="semibold" fontSize="xs">
      {getOccurenceString(weekdays)}
    </Text>
  );
}
