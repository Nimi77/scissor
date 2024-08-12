"use client";

import React from "react";
import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { FiTrendingUp, FiLink, FiPieChart, FiSettings } from "react-icons/fi";
import Link from "next/link";

const stats = [
  {
    id: 1,
    title: "Total Links Created",
    stat: "2",
    icon: FiLink,
    description: "Links created in this month",
  },
  {
    id: 2,
    title: "Campaigns Run",
    stat: "32",
    icon: FiPieChart,
    description: "Campaigns run in the last quarter",
  },
  {
    id: 3,
    title: "Engagement Rate",
    stat: "87%",
    icon: FiTrendingUp,
    description: "Average engagement rate this month",
  },
];

const sections = [
  { name: "Campaigns", icon: FiPieChart, href: "/dashboard/campaigns"},
  { name: "Settings", icon: FiSettings, href: "/dashboard/settings"}
];

const DefaultPage = () => {
  return (
    <Box p={4} borderRadius="lg" shadow="md" bgColor="white">
      <Heading as="h1" size="xl" mb={4}>
        Welcome to Scissor Dashboard
      </Heading>
      <Text color="gray.500" mb={8}>
        Manage your links, campaigns, and settings from one central place.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        {stats.map((stat) => (
          <Stat key={stat.id} p={4} bg="white" borderRadius="lg" shadow="base">
            <Flex justify="space-between" align="center">
              <Box>
                <StatLabel fontSize="lg">{stat.title}</StatLabel>
                <StatNumber>{stat.stat}</StatNumber>
                <StatHelpText fontSize="md">{stat.description}</StatHelpText>
              </Box>
              <Box as={stat.icon} size="30px" />
            </Flex>
          </Stat>
        ))}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {sections.map((section) => (
          <Link key={section.name} href={section.href}>
            <Flex
              align="center"
              p={4}
              borderRadius="lg"
              bg="teal.600"
              color="white"
              cursor="pointer"
              _hover={{ bg: "teal.500" }}
              transition="background-color 0.3s ease"
            >
              <Box as={section.icon} size="24px" mr={4} />
              <Text>{section.name}</Text>
            </Flex>
          </Link>
        ))}
      </SimpleGrid>

      <Box mt={8}>
        <Link href="/dashboard/create-link">
          <Button
            size="lg"
            w="full"
            py={6}
            borderRadius="lg"
            bg="#FF4C24"
            color="white"
            _hover={{
              transition: "0.3s ease",
              boxShadow: "0 4px 12px rgba(237, 87, 52, 0.3)",
              textDecoration:"none"
            }}
          >
            Create New Link
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default DefaultPage;
