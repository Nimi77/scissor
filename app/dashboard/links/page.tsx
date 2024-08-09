"use client"

import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react';
import Link from 'next/link';

const Links = () => {
  return (
    <Box p={4} borderRadius="lg" shadow="md">
      <Heading as="h2" size="lg" mb={4}>
        Manage Your Links
      </Heading>
      <Text fontSize="md" color="gray.500" mb={8}>
        View, edit, and manage all your shortened links.
      </Text>

      <Link href="/dashboard/create-link" passHref>
        <Button colorScheme="teal" size="lg" borderRadius="lg">
          Create New Link
        </Button>
      </Link>
    </Box>
  );
};

export default Links;