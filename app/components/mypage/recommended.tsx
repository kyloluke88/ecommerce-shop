import { Box, VStack, Text } from '@chakra-ui/react';

export const Recommended = () => (
  <Box w={{ base: "full", xl: "300px" }} display={{ base: "none", xl: "block" }}>
    <Box h="500px" bg="white" rounded="xl" border="1px" borderColor="gray.100" p={6} borderStyle="dashed">
      <VStack justify="center" h="full" color="gray.400" textAlign="center">
        <Text fontWeight="bold">Recommended</Text>
        <Text fontSize="xs">Placeholder for ads</Text>
      </VStack>
    </Box>
  </Box>
);