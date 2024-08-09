"use client"

import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const Campaigns = () => {
  return (
    <Box p={4} borderRadius="lg" shadow="md">
      <Heading as="h2" size="lg" mb={4}>
        Campaigns
      </Heading>
      <Text fontSize="md" color="gray.500">
        Track and manage your marketing campaigns.
      </Text>
    </Box>
  );
};

export default Campaigns;