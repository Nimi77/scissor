import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { FaLink, FaChartBar, FaCogs } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <Box
      bgColor="white"
      p={{ base: 4, md: 6 }}
      mx={{ base: "auto", md: 24 }}
      my={4}
      borderRadius="lg"
      shadow="md"
    >
      <Heading as="h2" size="lg">
        Welcome to Scissor
      </Heading>
      <Text color="gray.600" mt={4} mb={6}>
        Simplify your links, track your performance, and customize your brand.
        Scissor makes URL shortening easy and efficient, giving you the tools to
        manage and analyze your links all in one place.
      </Text>

      <VStack spacing={4} align="start">
        <Box>
          <Heading as="h3">
            <FaLink style={{ display: "inline", marginRight: "8px" }} />
            Create Your First Short Link
          </Heading>
          <Text mt={2} mb={4}>
            Start by creating a short, memorable URL that you can share with
            your audience. It&apos;s quick and easy—just enter your long URL and
            let Scissor do the rest.
          </Text>
          <Button
            bg="#FF4C24"
            _hover={{
              transition: "0.4s ease-in",
              bg: "#ED5734",
            }}
            onClick={() => router.push("/dashboard/custom-links")}
          >
            Create Link
          </Button>
        </Box>

        <Box>
          <Heading as="h3">
            <FaChartBar style={{ display: "inline", marginRight: "8px" }} />
            Track Your Link Performance
          </Heading>
          <Text mt={2} mb={4}>
            Gain insights into how your links are performing. View click
            statistics, geographic data, and more to optimize your marketing
            strategy.
          </Text>
          <Button
            bg="#FF4C24"
            _hover={{
              transition: "0.4s ease-in",
              bg: "#ED5734",
            }}
            onClick={() => router.push("/dashboard/analytics")}
          >
            View Analytics
          </Button>
        </Box>

        <Box>
          <Heading as="h3">
            <FaCogs style={{ display: "inline", marginRight: "8px" }} />
            Manage Your Links
          </Heading>
          <Text mt={2} mb={4}>
            Edit, delete, or customize your short URLs anytime. Keep your link
            portfolio organized and up-to-date with Scissor&apos;s management
            tools.
          </Text>
          <Button
            bg="#FF4C24"
            _hover={{
              transition: "0.4s ease-in",
              bg: "#ED5734",
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