"use client";

import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

const DashboardHome = () => {
  return (
    <Box p={4} borderRadius="lg" shadow="md" bgColor="white">
      <Heading as="h2" size="lg" mb={4}>
        Manage Your Links
      </Heading>
      <Text fontSize="md" color="gray.500" mb={8}>
        View, edit, and manage all your shortened links.
      </Text>

      <Link href="/dashboard/custom-links">
        <Button
          color="white"
          size="lg"
          borderRadius="lg"
          bg="#FF4C24"
          _hover={{
            transition: "0.3s ease",
          }}
        >
          Create New Link
        </Button>
      </Link>
    </Box>
  );
};

export default DashboardHome;
