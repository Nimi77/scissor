"use client";
import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  List,
  ListItem,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

const PriceWrapper = ({
  children,
  className,
}: Props & { className?: string }) => (
  <Box
    className={className}
    display="flex"
    flexDirection="column"
    gap={4}
    p={8}
    mb={{ base: 4, md: "0" }}
    bg="rgb(9,11,14)"
    borderWidth="1px"
    alignSelf="flex-start"
    borderColor="rgb(49,49,49)"
    borderRadius="lg"
    shadow="0px 5px 14px 0px rgba(0, 0, 0, 0.1)"
    width="100%"
    height="100%"
  >
    {children}
  </Box>
);

const Pricing = () => {
  return (
    <Box id="pricing" className="pricing-section">
      <Container py={8} maxW={"6xl"} className="pricing-container">
        <VStack align="left" className="pricing-header" spacing={4}>
          <Heading
            as="h2"
            textAlign={"left"}
            fontSize={{ base: "lg", md: "xl" }}
            color="#ED5734"
            textTransform={"uppercase"}
          >
            Pricing
          </Heading>
          <Text
            color={"#EEEEEE"}
            fontSize="md"
            maxW={{ base: "2xl", lg: "3xl" }}
          >
            Choose a plan that suits your needs. From free basic access to a
            comprehensive professional package, we have everything to help you
            achieve your goals.
          </Text>
        </VStack>
        <SimpleGrid
          alignItems="center"
          columns={{ base: 1, md: 2, lg: 3 }}
          pt={9}
          spacing={8}
          className="pricing-grid"
        >
          {/* Efficient Plan */}
          <PriceWrapper className="pricing-box">
            <Box role="header" className="pricing-header-box">
              <Text as="span" fontWeight="600" fontSize="2xl">
                Efficient
              </Text>
              <Text color="#A1A1A1" fontSize=".95rem" pt="1">
                Ideal for professionals who need advanced tools.
              </Text>
            </Box>
            <Box className="pricing-body">
              <HStack>
                <Text as="span" fontSize="4xl" fontWeight="600">
                  $79
                </Text>
                <Text as="span" fontSize=".8rem" color="#A1A1A1">
                  /month
                </Text>
              </HStack>
              <VStack alignItems={"flex-start"}>
                <List spacing={3} pt={3} pb={5} fontSize=".95rem">
                  <ListItem color="#A1A1A1">
                    <CheckIcon color="green.500" mr="6px" />
                    Unlimited custom URLs
                  </ListItem>
                  <ListItem color="#A1A1A1">
                    <CheckIcon color="green.500" mr="6px" />
                    Detailed analytics
                  </ListItem>
                  <ListItem color="#A1A1A1">
                    <CheckIcon color="green.500" mr="6px" />
                    5TB data transfer
                  </ListItem>
                </List>
                <Box w="100%">
                  <Button
                    w="full"
                    fontSize=".9rem"
                    variant="solid"
                    color="white"
                    borderRadius="lg"
                    bg="#ED5734"
                    _hover={{
                      bg: "#FF4C24",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(237, 87, 52, 0.3)",
                    }}
                    aria-label="Get Started with Efficient Plan"
                  >
                    <Link href="/SignUp" passHref>
                      Get Started
                    </Link>
                  </Button>
                </Box>
              </VStack>
            </Box>
          </PriceWrapper>

          {/* Team Plan */}
          <PriceWrapper className="pricing-box popular-plan">
            <Box position="relative">
              <Box
                position="absolute"
                top="-12"
                left="50%"
                style={{ transform: "translate(-50%)" }}
              >
                <Text
                  as="span"
                  textTransform="uppercase"
                  bg="#ED5734"
                  color="white"
                  px={3}
                  py={1}
                  fontSize="sm"
                  fontWeight="600"
                  rounded="xl"
                >
                  Most Popular
                </Text>
              </Box>
              <Box role="header" className="pricing-header-box">
                <Text as="span" fontWeight="600" fontSize="2xl">
                  Team
                </Text>
                <Text color="#A1A1A1" fontSize=".95rem" pt="1">
                  Best for growing teams needing more features and support.
                </Text>
              </Box>
              <Box className="pricing-body" mt={4}>
                <HStack>
                  <Text as="span" fontSize="4xl" fontWeight="600">
                    $49
                  </Text>
                  <Text as="span" fontSize=".8rem" color="#A1A1A1">
                    /month
                  </Text>
                </HStack>
                <VStack alignItems={"flex-start"}>
                  <List spacing={3} pt={3} pb={5} fontSize=".95rem">
                    <ListItem color="#A1A1A1">
                      <CheckIcon color="green.500" mr="6px" />
                      Unlimited short URLs
                    </ListItem>
                    <ListItem color="#A1A1A1">
                      <CheckIcon color="green.500" mr="6px" />
                      Basic analytics
                    </ListItem>
                    <ListItem color="#A1A1A1">
                      <CheckIcon color="green.500" mr="6px" />
                      1TB data transfer
                    </ListItem>
                  </List>
                  <Box w="100%">
                    <Button
                      w="full"
                      fontSize=".9rem"
                      bg="#090B0E"
                      variant="outline"
                      color="white"
                      _hover={{
                        borderColor: "#ED5731",
                        transition: "all 0.3s ease",
                      }}
                      aria-label="Get Started with Team Plan"
                    >
                      <Link href="/SignUp">Get Started</Link>
                    </Button>
                  </Box>
                </VStack>
              </Box>
            </Box>
          </PriceWrapper>

          {/* Simple Plan */}
          <PriceWrapper className="pricing-box">
            <Box role="header" className="pricing-header-box">
              <Text as="span" fontWeight="600" fontSize="2xl">
                Simple
              </Text>
              <Text color="#A1A1A1" fontSize=".95rem" pt="1">
                A great starting point for individuals and small teams.
              </Text>
            </Box>
            <Box className="pricing-body">
              <Box>
                <Text as="span" fontSize="4xl" fontWeight="600">
                  Free
                </Text>
              </Box>
              <VStack alignItems={"flex-start"}>
                <List spacing={3} pt={3} pb={5} fontSize=".95rem">
                  <ListItem color="#A1A1A1">
                    <CheckIcon color="green.500" mr="6px" />
                    Limited custom URLs
                  </ListItem>
                  <ListItem color="#A1A1A1">
                    <CheckIcon color="green.500" mr="6px" />
                    Basic analytics
                  </ListItem>
                  <ListItem color="#A1A1A1">
                    <CheckIcon color="green.500" mr="6px" />
                    No credit card required
                  </ListItem>
                </List>
                <Box w="100%">
                  <Button
                    w="full"
                    fontSize=".9rem"
                    variant="solid"
                    color="white"
                    borderRadius="lg"
                    bg="#ED5734"
                    _hover={{
                      bg: "#FF4C24",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(237, 87, 52, 0.3)",
                    }}
                    aria-label="Get Started with Simple Plan"
                  >
                    <Link href="/SignUp" passHref>
                      Get Started
                    </Link>
                  </Button>
                </Box>
              </VStack>
            </Box>
          </PriceWrapper>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Pricing;
