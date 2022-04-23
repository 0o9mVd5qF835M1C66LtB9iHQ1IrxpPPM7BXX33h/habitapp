import { useEffect, useState } from "react";
import { HiArrowLeft, HiPencil, HiOutlineLightningBolt } from "react-icons/hi";
import { Flex, Icon, Text } from "@chakra-ui/react";

import {
  calculateCurrentStreak,
  calculateLongestStreak,
  getOccurenceString,
  getCreatedDateDifference,
  getStreakRangeString,
} from "../../helpers";
import { Habit } from "../../generated/api";
import {
  Modal,
  ModalCloseButton,
  PageContainer,
  PageHeader,
} from "../../components";
import { InfoBlock } from "./info-block";
import { Calendar } from "./calendar";
import { useNavigate } from "react-router-dom";

type Props = {
  habit: Habit;
};

export function HabitPage({ habit }: Props) {
  const navigate = useNavigate();
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
              onClick={() => navigate(`/habits/${habit._id}/edit`)}
            />
          </Flex>
        </PageHeader>
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
      </PageContainer>
    </Modal>
  );
}
