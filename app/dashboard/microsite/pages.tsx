"use client"

import React from 'react';
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const MicrositePage = () => {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" shadow="md">
      <Heading as="h2" size="lg" mb={4}>
        Microsite Management
      </Heading>
      <Text fontSize="md" color="gray.500">
        Customize and manage your microsite here.
      </Text>
    </Box>
  );
};

export default MicrositePage;