"use client";

import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  useToast,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { FaChartBar } from "react-icons/fa";
import axios from "axios";

interface LinkAnalytics {
  id: string;
  shortUrl: string;
  clicks: number;
  uniqueVisitors: number;
}

const Analytics: React.FC = () => {
  const [links, setLinks] = useState<LinkAnalytics[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toast = useToast();

  // Fetch data when the component is rendered on the client
  const fetchLinks = async () => {
    try {
      const response = await axios.get("/api/links");

      setLinks(response.data);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error fetching links",
        description: "Unable to load your links at this time.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  // Trigger fetching when the component mounts
  if (isLoading && typeof window !== "undefined") {
    fetchLinks();
  }

  return (
    <Box
      bgColor="white"
      p={{ base: 4, md: 6 }}
      mx={{ base: "auto", md: 24 }}
      my={4}
      borderRadius="lg"
      shadow="md"
    >
      <Heading as="h3" size="lg">
        Track your links
      </Heading>
      <Text color="gray.500" my={4}>
        View and manage all your shortened links. Track analytics such as the
        number of clicks and unique visitors.
      </Text>

      {isLoading ? (
        <Spinner size="md" color="#FF4C24" />
      ) : links.length > 0 ? (
        <VStack spacing={6} align="stretch">
          {links.map((link) => (
            <Box
              key={link.id}
              w="full"
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              shadow="sm"
              aria-label={`Link analytics for ${link.shortUrl}`}
            >
              <HStack justify="space-between">
                <Text fontWeight="bold">{link.shortUrl}</Text>
                <HStack spacing={4}>
                  <Text>
                    <Icon as={FaChartBar} color="#FF4C24" mr={2} />
                    Clicks: {link.clicks}
                  </Text>
                  <Text>Unique Visitors: {link.uniqueVisitors}</Text>
                </HStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text color="green">
          No links created yet. Start by creating a new link!
        </Text>
      )}
    </Box>
  );
};

export default Analytics;