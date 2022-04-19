import { Text } from "@chakra-ui/react";

type Props = {
  title: string;
  isCompleted: boolean;
};

export function Title({ title, isCompleted }: Props) {
  return (
    <Text
      fontSize="md"
      textDecoration={isCompleted ? "line-through" : "none"}
      mb="2.5"
    >
      {title}
    </Text>
  );
}
