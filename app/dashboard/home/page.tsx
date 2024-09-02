"use client";

import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FaLink, FaChartBar, FaCogs } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <Box
      my={4}
      mx={{ base: "auto", md: 6 }}
      p={{ base: 2, md: 6 }}
      className="dashboard-home"
    >
      <Box>
        <Heading as="h1" size="2xl" mb={4}>
          Welcome to linktrim
        </Heading>
        <Text color="gray.700">
          Simplify your links, track your performance, and customize your brand.
          Scissor makes URL shortening easy and efficient, giving you the tools
          to manage and analyze your links all in one place.
        </Text>
      </Box>

      <VStack spacing={10} align="stretch" my={6}>
        <Box px={4} py={6} bgColor="white" shadow="sm" borderWidth="1px" borderRadius="lg">
          <Flex alignItems="center" justify="left" gap={4}>
            <Icon as={FaLink} w={5} h={5} color="gray.800" />
            <Heading as="h3" fontSize="xl">
              Create Your Short Link
            </Heading>
          </Flex>
          <Text color="gray.600" mt="4" mb="6">
            Start by creating a short, memorable URL that you can share with
            your audience. It&apos;s quick and easy—just enter your long URL and
            let Scissor do the rest.
          </Text>
          <Button
            bg="#FF4C24"
            color="white"
            _hover={{
              transition: "0.2s ease-in",
              bgColor: "#ED5734",
            }}
            onClick={() => router.push("/dashboard/link")}
          >
            Shorten Link
          </Button>
        </Box>

        <Box px={4} py={6} bgColor="white" shadow="sm" borderWidth="1px" borderRadius="lg">
          <Flex alignItems="center" gap={4}>
            <Icon as={FaChartBar} w={5} h={5} color="gray.800" />
            <Heading as="h3" fontSize="xl">
              Track Your Link Performance
            </Heading>
          </Flex>
          <Text color="gray.600" mt="4" mb="6">
            Gain insights into how your links are performing. View click
            statistics, geographic data, and more to optimize your marketing
            strategy.
          </Text>
          <Button
            bg="#FF4C24"
            color="white"
            _hover={{
              transition: "0.2s ease-in",
              bg: "#ED5734",
            }}
            onClick={() => router.push("/dashboard/analytics")}
          >
            View Analytics
          </Button>
        </Box>

        <Box px={4} py={6} bgColor="white" shadow="sm"  borderWidth="1px" borderRadius="lg">
          <Flex alignItems="center" justifyContent="flex-start" gap={4}>
            <Icon as={FaCogs} w={5} h={5} color="gray.800" />
            <Heading as="h3" fontSize="xl">
              Create Custom URLs
            </Heading>
          </Flex>
          <Text color="gray.600" mt="4" mb="6">
            Edit, delete, or customize your URLs anytime. Keep your link
            portfolio organized and up-to-date with Scissor&apos;s management
            tools.
          </Text>
          <Button
            bg="#FF4C24"
            color="white"
            _hover={{
              transition: "0.2s ease-in",
              bgColor: "#ED5734"
            }}
            onClick={() => router.push("/dashboard/custom-links")}
          >
            Customize URL
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default Home;