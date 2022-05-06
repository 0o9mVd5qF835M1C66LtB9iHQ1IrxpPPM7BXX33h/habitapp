import { Box, Text } from "@chakra-ui/react";

export function Empty() {
  return (
    <Box textAlign="center" paddingTop="12">
      <Text>You don't have any habits yet.</Text>
      <Text>Tap “+” button to create your first habit</Text>
    </Box>
  );
}
