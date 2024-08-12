"use client";

import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const Settings = () => {
  return (
    <Box p={4} borderRadius="lg" shadow="md" bgColor="white">
      <Heading as="h2" size="lg" mb={4}>
        Settings
      </Heading>
      <Text fontSize="md" color="gray.500" mb={8}>
        Adjust your account settings, preferences, and more.
      </Text>

      <Button
        color="white"
        borderRadius="lg"
        bg="#FF4C24"
        size="lg"
        _hover={{
          transition: "all 0.3s ease",
          boxShadow: "0 4px 12px rgba(237, 87, 52, 0.3)",
        }}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default Settings;
