import { Dayjs } from "dayjs";
import { Flex } from "@chakra-ui/react";
import {
  Habit,
  useCompletedDateControllerCreateCompletedDate,
} from "../../../../generated/api";

import { WeekdayText } from "./weekday-text";
import { Streak } from "./streak";
import { Checkbox } from "./checkbox";
import { Title } from "./title";

type Props = {
  habit: Habit;
  isHabitCompleted: boolean;
};

export function HabitItem(props: Props) {
  const { habit, isHabitCompleted } = props;

  const [] = useCompletedDateControllerCreateCompletedDate({
    mutation: {
      onMutate: () => {},
      onSuccess: () => {},
      onSettled: () => {},
    },
  });

  function handleComplete() {}

  function handleUnComplete() {}

  return (
    <Flex
      width="100%"
      shadow="base"
      paddingX="3"
      paddingY="3.5"
      marginBottom="4"
      border="1px"
      borderColor="gray.100"
      borderRadius="lg"
      cursor="pointer"
      // onClick={() => onClick(habit)}
    >
      <div className="w-full">
        <WeekdayText weekdays={habit.isoWeekdays} />
        <Title title={habit.title} isCompleted={isHabitCompleted} />
        <Streak habit={habit} />
      </div>
      <Checkbox
        onComplete={() => {}}
        onUncomplete={() => {}}
        isCompleted={isHabitCompleted}
      />
    </Flex>
  );
}
