"use client";

import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
  useToast,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { FaChartBar } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";

interface LinkAnalytics {
  id: string;
  shortUrl: string;
  clicks: number;
  uniqueVisitors: number;
}

const DashboardHome: React.FC = () => {
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
    <Box maxW="3xl" p={{ base: 4, md: 8 }} borderRadius="lg" shadow="md" bgColor="white">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        mb={4}
      >
        <Heading as="h2" size="lg">
          Manage Your Links
        </Heading>
        <Link href="/dashboard/custom-links">
          <Button
            color="white"
            size="lg"
            borderRadius="lg"
            bg="#FF4C24"
            _hover={{
              transition: "0.3s ease",
              bg: "#ED5734",
            }}
          >
            Create New Link
          </Button>
        </Link>
      </Flex>
      <Text fontSize="md" color="gray.500" mb={8}>
        View, edit, and manage all your shortened links. Track analytics such as
        the number of clicks and unique visitors.
      </Text>

      {isLoading ? (
        <Spinner size="lg" color="#FF4C24" />
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
        <Text color="gray.500">
          No links created yet. Start by creating a new link!
        </Text>
      )}
    </Box>
  );
};

export default DashboardHome;
