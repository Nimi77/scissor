"use client";

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
  Flex,
} from "@chakra-ui/react";
import { ArrowForwardIcon, CheckIcon } from "@chakra-ui/icons";
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
    alignSelf="flex-start"
    flexGrow="1"
    p={8}
    bg="rgb(9,11,14)"
    borderWidth="1px"
    borderColor="rgb(49,49,49)"
    borderRadius="lg"
    shadow="0px 5px 14px 0px rgba(0, 0, 0, 0.1)"
    zIndex="2"
    position="relative"
    height="100%"
    width={{ base: "100%", md: "50%" }}
  >
    {children}
  </Box>
);

const Pricing = () => {
  return (
    <Box id="pricing" pt="6rem" pb="8rem" className="pricing-section">
      <Container maxW="6xl">
        <VStack align="left" spacing={4}>
          <Heading
            as="h2"
            textAlign="left"
            fontSize="xl"
            color="#ED5734"
            textTransform={"uppercase"}
          >
            Pricing
          </Heading>
          <Text color="#eeeeee" maxW="2xl">
            Choose a plan that suits your needs. From comprehensive professional
            package to a free basic access which have various features available to help you
            achieve your goals.
          </Text>
        </VStack>
        <Box mt={8}>
          <Flex
            flexDir={{ base: "column", md: "row" }}
            gap={{ md: 5 }}
          >
            {/* first pricing */}
            <PriceWrapper className="premium-pricing">
              <Box as="header" className="pricing-header-box">
                <Text as="span" fontWeight="600" fontSize="2xl">
                  Pro
                </Text>
                <Text color="#A1A1A1" pt="1">
                  Ideal for professionals who need advanced tools.
                </Text>
              </Box>
              <HStack mt={4} className="plan-price">
                <Text as="span" fontSize="4xl" fontWeight="600">
                  $12
                </Text>
                <Text as="span" fontSize="1rem" color="#A1A1A1">
                  /month
                </Text>
              </HStack>

              <Box
                display="flex"
                justifyContent="flex-start"
                alignContent="center"
                gap={{ md: "5rem" }}
                mt={4}
                mb={7}
              >
                <List spacing={2} alignItems="flex-start" className="pricing-package">
                  <ListItem>
                    <CheckIcon color="orange.500"/>
                    Unlimited custom URLs
                  </ListItem>
                  <ListItem>
                    <CheckIcon color="orange.500"/>
                    Detailed analytics
                  </ListItem>
                  <ListItem>
                    <CheckIcon color="orange.500"/>
                    Custom QR Code
                  </ListItem>
                  <ListItem>
                    <CheckIcon color="orange.500"/>
                    Monitor link clicks
                  </ListItem>
                </List>
                <List
                  spacing={2}
                  alignItems="flex-start"
                  display={{ base: "none", md: "block" }}
                  className="pricing-package"
                >
                  <ListItem>
                    <CheckIcon color="orange.500"/>
                    Ad-free experience
                  </ListItem>
                  <ListItem>
                    <CheckIcon color="orange.500"/>
                    Access to personal dashboard
                  </ListItem>
                  <ListItem>
                    <CheckIcon color="orange.500"/>
                    Unique features
                  </ListItem>
                </List>
              </Box>
              <Box w="100%">
                <Link href="/signup">
                  <Button
                    w="full"
                    variant="solid"
                    color="white"
                    borderRadius="lg"
                    bg="#FF4C24"
                    _hover={{
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(237, 87, 52, 0.3)",
                    }}
                    display="flex"
                    alignItems="center"
                  >
                    Get Started <ArrowForwardIcon boxSize="5" />
                  </Button>
                </Link>
              </Box>
            </PriceWrapper>
            {/* second pricing */}
            <Box
              className="free-pricing"
              display="flex"
              flexDir="column"
              width={{ base: "100%", md: "40%" }}
              ml={{ base: "0", md: "-2rem" }}
              pl={{ base: "2rem", md: "4rem" }}
              my="1rem"
              py="2rem"
              pr="2rem"
              bg="rgb(9,11,14)"
              borderWidth="1px"
              borderColor="rgb(49,49,49)"
              borderRadius="lg"
            >
              <Box as="header" className="pricing-header-box">
                <Text as="span" fontWeight="600" fontSize="2xl">
                  Basic
                </Text>
                <Text color="#A1A1A1" pt="1">
                  A great starting point for individuals and small teams.
                </Text>
              </Box>
              <Box className="pricing-body" mt={4}>
                <Box>
                  <Text
                    as="span"
                    fontSize="4xl"
                    fontWeight="600"
                    className="plan-price"
                  >
                    Free
                  </Text>
                </Box>
                <VStack alignItems="flex-start">
                  <List spacing={2} my={2} className="pricing-package">
                    <ListItem>
                      <CheckIcon  color="orange.500"/>
                      Limited custom URLs
                    </ListItem>
                    <ListItem>
                      <CheckIcon color="orange.500"/>
                      Basic analytics
                    </ListItem>
                    <ListItem>
                      <CheckIcon color="orange.500"/>
                      No credit card required
                    </ListItem>
                  </List>
                  <Box w="100%">
                    <Link href="/signup">
                      <Button
                        w={{ base: "full", md: "auto" }}
                        bg="#090B0E"
                        variant="outline"
                        color="white"
                        borderRadius="lg"
                        _hover={{
                          borderColor: "#ED5731",
                          transition: "all 0.3s ease",
                        }}
                        aria-label="Get Started with Basic Plan"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </Box>
                </VStack>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};
export default Pricing;
