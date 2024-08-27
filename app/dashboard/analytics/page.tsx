"use client"

import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Heading,
  useToast,
  Spinner,
  VStack,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FaChartLine } from "react-icons/fa";
import axios from "axios";

interface LinkAnalytics {
  id: number;
  customUrl: string;
  createdAt: string;
  clicks: number;
}

const Analytics: React.FC = () => {
  const [links, setLinks] = useState<LinkAnalytics[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toast = useToast();

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get("/api/links");

        if (response.status !== 200) {
          throw new Error("Failed to fetch links");
        }

        const data = response.data.map((link: any) => ({
          id: link.id,
          customUrl: link.shortened_url,
          createdAt: link.created_at,
          clicks: link.clicks || 0,
        }));

        setLinks(data);
      } catch (error) {
        toast({
          title: "Error fetching links",
          description: "Unable to load your links at this time.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, [toast]);

  return (
    <Box p={{ base: 4, md: 6 }} mx={{ base: "auto", md: 6 }} my={4}>
      <Box>
        <Heading as="h3" size="lg">
          Track your links
        </Heading>
        <Text color="gray.600" my={4}>
          View and manage all your shortened links. Track analytics such as the
          number of clicks.
        </Text>
      </Box>

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
              bgColor="white"
              aria-label={`Link analytics for ${link.customUrl}`}
            >
              <Text fontWeight="600" mb={2}>
                {link.customUrl}
              </Text>
              <Flex alignItems="center" justifyContent="space-between">
                <Text color="gray.600">Clicks Over Time</Text>
                <Text color="gray.600">
                  <Icon as={FaChartLine} mr={2} color="gray.900" />
                  {link.clicks}
                </Text>
              </Flex>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text>No links created yet. Start by creating a new link!</Text>
      )}
    </Box>
  );
};

export default Analytics;