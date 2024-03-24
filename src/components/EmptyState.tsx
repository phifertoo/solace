import React from "react";
import { Text, Button, Center } from "@chakra-ui/react";

const EmptyState = () => {
  return (
    <Center flexDirection="column" mt="20">
      <Text fontSize="lg" mb="4">
        You have no notes yet. Create your first note above!
      </Text>
    </Center>
  );
};

export default EmptyState;
