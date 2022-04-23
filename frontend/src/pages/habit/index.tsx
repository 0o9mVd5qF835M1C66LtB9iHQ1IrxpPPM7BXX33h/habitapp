import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowLeft, HiPencil, HiOutlineLightningBolt } from "react-icons/hi";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { useQueryClient } from "react-query";

import {
  calculateCurrentStreak,
  calculateLongestStreak,
  getOccurenceString,
  getCreatedDateDifference,
  getStreakRangeString,
} from "../../helpers";
import {
  Habit,
  getHabitControllerFindAllByUserIdQueryKey as getHabitsQueryKey,
  HabitControllerFindAllByUserIdQueryResult as HabitsQueryResult,
} from "../../generated/api";
import {
  Modal,
  ModalCloseButton,
  PageContainer,
  PageHeader,
} from "../../components";
import { InfoBlock } from "./info-block";
import { Calendar } from "./calendar";

type Props = {
  habit: Habit;
};

function HabitComponent({ habit }: Props) {
  const [currentStreak, setCurrentStreak] = useState<number[]>(
    calculateCurrentStreak(habit)
  );
  const [longestStreak, setLongestStreak] = useState<number[]>(
    calculateLongestStreak(habit)
  );

  useEffect(() => {
    setCurrentStreak(calculateCurrentStreak(habit));
    setLongestStreak(calculateLongestStreak(habit));
  }, [habit.completedDates.length]);

  return (
    <Flex flexDirection="column">
      <Text fontSize="3xl" fontWeight="bold" marginBottom="6">
        {habit.title}
      </Text>
      <Flex marginBottom="2">
        <InfoBlock marginRight="1">
          <Flex flexDirection="column">
            <Text color="purple.600" fontSize="xs" fontWeight="semibold">
              Days of week
            </Text>
            <Text color="gray.900">
              {getOccurenceString(habit.isoWeekdays)}
            </Text>
          </Flex>
        </InfoBlock>
        <InfoBlock marginLeft="1">
          <Flex flexDirection="column">
            <Text color="purple.600" fontSize="xs" fontWeight="semibold">
              Habit started
            </Text>
            <Text color="gray.900">{getCreatedDateDifference(habit)}</Text>
          </Flex>
        </InfoBlock>
      </Flex>
      <Flex flexDirection="column" marginBottom="4">
        <InfoBlock marginBottom="2">
          <Icon
            as={HiOutlineLightningBolt}
            w="24px"
            height="24px"
            marginRight="2"
            color="yellow.500"
          />
          <Flex alignItems="center" justifyContent="space-between" flex="1">
            <Flex flexDirection="column">
              <Text color="purple.600" fontSize="xs" fontWeight="semibold">
                Current streak
              </Text>
              <Text color="gray.900">
                {getStreakRangeString(currentStreak)}
              </Text>
            </Flex>
            <Text color="gray.900">{currentStreak.length}</Text>
          </Flex>
        </InfoBlock>
        <InfoBlock>
          <Icon
            as={HiOutlineLightningBolt}
            w="24px"
            height="24px"
            marginRight="2"
            color="yellow.500"
          />
          <Flex alignItems="center" justifyContent="space-between" flex="1">
            <Flex flexDirection="column">
              <Text color="purple.600" fontSize="xs" fontWeight="semibold">
                Longest streak
              </Text>
              <Text color="gray.900">
                {getStreakRangeString(longestStreak)}
              </Text>
            </Flex>
            <Text color="gray.900">{longestStreak.length}</Text>
          </Flex>
        </InfoBlock>
      </Flex>
      <Flex>
        <Calendar habit={habit} />
      </Flex>
    </Flex>
  );
}

type PageParams = {
  habitId: string;
};

export function HabitPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { habitId } = useParams<PageParams>();
  const [habit, setHabit] = useState<Habit>();

  useEffect(() => {
    if (!habitId) {
      navigate("/");
      return;
    }

    const queryData = queryClient.getQueryData<HabitsQueryResult>(
      getHabitsQueryKey()
    );

    if (!queryData) {
      navigate("/");
      return;
    }

    const foundHabit = queryData.data.find((habit) => habit._id === habitId);
    if (!foundHabit) {
      navigate("/");
      return;
    }

    setHabit(foundHabit);
  }, [habitId]);

  if (!habitId || !habit) {
    return null;
  }

  return (
    <Modal>
      <PageContainer>
        <PageHeader>
          <Flex width="100%" justifyContent="space-between">
            <ModalCloseButton
              icon={<HiArrowLeft size={18} />}
              size="md"
              aria-label="go back to habits list"
            />
            <ModalCloseButton
              icon={<HiPencil size={18} />}
              size="md"
              aria-label="edit habit"
              onClick={() => navigate(`/habits/${habitId}/edit`)}
            />
          </Flex>
        </PageHeader>
        <HabitComponent habit={habit} />
      </PageContainer>
    </Modal>
  );
}
