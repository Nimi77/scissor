"use client"

import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

const Settings = () => {
  return (
    <Box p={4} borderRadius="lg" shadow="md">
      <Heading as="h2" size="lg" mb={4}>
        Settings
      </Heading>
      <Text fontSize="md" color="gray.500" mb={8}>
        Adjust your account settings, preferences, and more.
      </Text>

      <Button colorScheme="teal" size="lg" borderRadius="lg">
        Save Changes
      </Button>
    </Box>
  );
};

export default Settings;