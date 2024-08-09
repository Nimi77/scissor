"use client"

import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const Logout = () => {
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" shadow="md">
      <Heading as="h2" size="lg" mb={4}>
        Log Out
      </Heading>
      <Text fontSize="md" color="gray.500" mb={8}>
        Are you sure you want to log out?
      </Text>

      <Button
        colorScheme="red"
        size="lg"
        borderRadius="lg"
        onClick={handleLogout}
        mb={4}
      >
        Confirm Log Out
      </Button>

      <Link href="/dashboard" passHref>
        <Button colorScheme="teal" size="lg" borderRadius="lg">
          Cancel
        </Button>
      </Link>
    </Box>
  );
};

export default Logout;