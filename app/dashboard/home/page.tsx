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
      mx={{ md: "auto", lg: 12 }}
      p={{ base: 4, md: 6 }}
      className="dashboard-home"
    >
      <Box textAlign="center">
        <Heading as="h1" size="xl" mb={4}>
          Welcome to linktrim
        </Heading>
        <Text color="gray.600">
          Simplify your links, track your performance, and customize your brand.
          Scissor makes URL shortening easy and efficient, giving you the tools
          to manage and analyze your links all in one place.
        </Text>
      </Box>

      <VStack spacing={10} align="stretch" my={6}>
        <Box
          p={4}
          shadow="base"
          borderWidth="1px"
          borderRadius="lg"
        >
          <Flex alignItems="center" justify="left" gap={4}>
            <Icon as={FaLink} w={6} h={6} color="gray.900" />
            <Heading as="h3" fontSize="lg">Create Your First Short Link</Heading>
          </Flex>
          <Text color="gray.700" mt="4" mb="6">
            Start by creating a short, memorable URL that you can share with
            your audience. It&apos;s quick and easy—just enter your long URL and
            let Scissor do the rest.
          </Text>
          <Button
            bgColor="#D74D2F"
            color="white"
            _hover={{
              transition: "0.2s ease-in",
              bgColor: "#ED5734",
            }}
            onClick={() => router.push("/dashboard/custom-links")}
          >
            Create Link
          </Button>
        </Box>

        <Box p={4} shadow="base" borderWidth="1px" borderRadius="lg">
          <Flex alignItems="center" gap={4}>
            <Icon as={FaChartBar} w={6} h={6} color="gray.900" />
            <Heading as="h3" fontSize="lg">Track Your Link Performance</Heading>
          </Flex>
          <Text color="gray.600" mt="4" mb="6">
            Gain insights into how your links are performing. View click
            statistics, geographic data, and more to optimize your marketing
            strategy.
          </Text>
          <Button
            bgColor="#F9A396"
            color="whitesmoke"
            _hover={{
              transition: "0.2s ease-in",
              bgColor: "#ED5734",
            }}
            onClick={() => router.push("/dashboard/analytics")}
          >
            View Analytics
          </Button>
        </Box>

        <Box p={4} shadow="base" borderWidth="1px" borderRadius="lg">
          <Flex alignItems="center" justify="center" gap={4}>
            <Icon as={FaCogs} w={6} h={6} color="gray.900" />
            <Heading as="h3" fontSize="lg">Manage Your Links</Heading>
          </Flex>
          <Text color="gray.600" mt="4" mb="6">
            Edit, delete, or customize your short URLs anytime. Keep your link
            portfolio organized and up-to-date with Scissor&apos;s management
            tools.
          </Text>
          <Button
            mt={6}
            bgColor="#C14429"
            color="white"
            _hover={{
              transition: "0.2s ease-in",
              bgColor: "#ED5734",
            }}
            onClick={() => router.push("/dashboard/links")}
          >
            Manage Links
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default Home;