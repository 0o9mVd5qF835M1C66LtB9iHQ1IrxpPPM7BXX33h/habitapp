import { useEffect, useState } from "react";
import {
  HiArrowLeft,
  HiPencil,
  HiOutlineLightningBolt,
  HiOutlineStar,
} from "react-icons/hi";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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
                <Text color="purple.500" fontSize="xs" fontWeight="medium">
                  Days of week
                </Text>
                <Text>{getOccurenceString(habit.isoWeekdays)}</Text>
              </Flex>
            </InfoBlock>
            <InfoBlock marginLeft="1">
              <Flex flexDirection="column">
                <Text color="purple.500" fontSize="xs" fontWeight="medium">
                  Habit started
                </Text>
                <Text>{getCreatedDateDifference(habit)}</Text>
              </Flex>
            </InfoBlock>
          </Flex>
          <Flex flexDirection="column" marginBottom="4">
            <InfoBlock marginBottom="2">
              <Icon
                as={HiOutlineLightningBolt}
                fontSize={20}
                marginRight="4"
                color="yellow.500"
              />
              <Flex alignItems="center" justifyContent="space-between" flex="1">
                <Flex flexDirection="column">
                  <Text color="purple.500" fontSize="xs" fontWeight="medium">
                    Current streak
                  </Text>
                  <Text>{getStreakRangeString(currentStreak)}</Text>
                </Flex>
                <Text>{currentStreak.length}</Text>
              </Flex>
            </InfoBlock>
            <InfoBlock>
              <Icon
                as={HiOutlineStar}
                fontSize={20}
                marginRight="4"
                color="yellow.500"
              />
              <Flex alignItems="center" justifyContent="space-between" flex="1">
                <Flex flexDirection="column">
                  <Text color="purple.500" fontSize="xs" fontWeight="medium">
                    Longest streak
                  </Text>
                  <Text>{getStreakRangeString(longestStreak)}</Text>
                </Flex>
                <Text>{longestStreak.length}</Text>
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
