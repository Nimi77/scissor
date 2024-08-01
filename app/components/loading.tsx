import {
  Box,
  Container,
  Stack,
  Skeleton,
  SkeletonText,
  Flex,
  VStack,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";

const TemplateSkeleton = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="start"
    py="7"
    px={4}
    bg="#18181B"
    borderRadius="lg"
    maxW={{ md: "lg", lg: "xl" }}
    aria-hidden="true"
  >
    <Skeleton
      height="20px"
      width="30px"
      startColor="#2D3748"
      endColor="#4A5568"
    />
    <Skeleton
      height="20px"
      width="40%"
      mt={4}
      startColor="#2D3748"
      endColor="#4A5568"
    />
    <SkeletonText
      mt="4"
      textAlign="left"
      noOfLines={2}
      spacing="2"
      skeletonHeight="15px"
      width="100%"
      startColor="#2D3748"
      endColor="#4A5568"
    />
  </Box>
);

const PriceWrapperSkeleton = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignSelf="flex-start"
    flexGrow="1"
    borderWidth="1px"
    borderRadius="lg"
    zIndex="2"
    position="relative"
    height="100%"
    width={{ base: "100%", md: "50%" }}
  >
    <Skeleton
      height="40px"
      width="60%"
      startColor="#2D3748"
      endColor="#4A5568"
    />
    <SkeletonText
      mt="4"
      skeletonHeight="20px"
      noOfLines={3}
      spacing="2"
      startColor="#2D3748"
      endColor="#4A5568"
    />
    <Skeleton
      height="30px"
      width="40%"
      mt="6"
      startColor="#2D3748"
      endColor="#4A5568"
    />
    <SkeletonText
      mt="4"
      noOfLines={6}
      spacing="3"
      startColor="#2D3748"
      endColor="#4A5568"
    />
    <Skeleton
      height="50px"
      width="100%"
      mt="6"
      startColor="#2D3748"
      endColor="#4A5568"
    />
  </Box>
);

const LoadingSkeleton = () => {
  return (
    <>
      <Box className="hero" pt="10rem" pb="8rem" bg="black">
        <Container maxW={"6xl"}>
          <Stack
            textAlign={"center"}
            align={"center"}
            justify={"center"}
            spacing={{ base: 4, md: 6 }}
          >
            <Skeleton
              height="50px"
              width="60%"
              startColor="#2D3748"
              endColor="#4A5568"
            />
            <SkeletonText
              mt="4"
              textAlign="center"
              noOfLines={2}
              spacing="4"
              skeletonHeight="20px"
              width="80%"
              startColor="#2D3748"
              endColor="#4A5568"
            />
            <Box width="100%" py={4}>
              <Flex alignItems="center" justifyContent="center">
                <Skeleton
                  height="60px"
                  width="95%"
                  startColor="#2D3748"
                  endColor="#4A5568"
                ></Skeleton>
              </Flex>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box id="features" bg="black">
        <Container maxW={"6xl"}>
          <VStack align="left">
            <Skeleton
              height="30px"
              width="150px"
              startColor="#2D3748"
              endColor="#4A5568"
            />
            <SkeletonText
              mt="4"
              noOfLines={2}
              spacing="4"
              skeletonHeight="20px"
              width="60%"
              startColor="#2D3748"
              endColor="#4A5568"
            />
          </VStack>
          <SimpleGrid
            alignItems="center"
            columns={{ base: 1, md: 2, lg: 3 }}
            pt={8}
            spacing={8}
          >
            <TemplateSkeleton />
            <TemplateSkeleton />
            <TemplateSkeleton />
          </SimpleGrid>
        </Container>
      </Box>
      {/* skleton for pricing section */}
      <Box
        id="pricing"
        pt="6rem"
        pb="8rem"
        className="pricing-section"
        bg="black"
      >
        <Container maxW={"6xl"}>
          <VStack align="left" spacing={4}>
            <Skeleton
              height="40px"
              width="150px"
              startColor="#2D3748"
              endColor="#4A5568"
            />
            <SkeletonText
              mt="4"
              noOfLines={2}
              spacing="4"
              skeletonHeight="20px"
              width="60%"
              startColor="#2D3748"
              endColor="#4A5568"
            />
          </VStack>
          <Box mt={8} className="pricing-box">
            <Flex
              flexDir={{ base: "column", md: "row" }}
              gap={{ base: 5, md: 0 }}
            >
              <Box
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
                className="premium-pricing"
              >
                <Box as="header" className="pricing-header-box">
                  <Skeleton
                    height="30px"
                    width="60%"
                    startColor="#2D3748"
                    endColor="#4A5568"
                  />
                  <SkeletonText
                    mt="4"
                    noOfLines={1}
                    spacing="0"
                    skeletonHeight="20px"
                    width="80%"
                    startColor="#2D3748"
                    endColor="#4A5568"
                  />
                </Box>
                <HStack mt={4} className="plan-price">
                  <Skeleton
                    height="40px"
                    width="20%"
                    startColor="#2D3748"
                    endColor="#4A5568"
                  />
                  <Skeleton
                    height="20px"
                    width="8%"
                    startColor="#2D3748"
                    endColor="#4A5568"
                  />
                </HStack>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignContent="center"
                  gap={{ md: "0", lg: "5rem" }}
                  mt={4}
                  mb={7}
                >
                  <SkeletonText
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="20px"
                    width="50%"
                    startColor="#2D3748"
                    endColor="#4A5568"
                  />
                  <SkeletonText
                    noOfLines={3}
                    spacing="4"
                    skeletonHeight="20px"
                    width="50%"
                    startColor="#2D3748"
                    endColor="#4A5568"
                  />
                </Box>
                <Box w="100%">
                  <Skeleton
                    height="50px"
                    width="100%"
                    startColor="#2D3748"
                    endColor="#4A5568"
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
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
                className="free-pricing"
              >
                <Box as="header" className="pricing-header-box">
                  <Skeleton
                    height="40px"
                    width="150px"
                    startColor="#2D3748"
                    endColor="#4A5568"
                  />
                  <SkeletonText
                    mt="4"
                    noOfLines={1}
                    spacing="0"
                    skeletonHeight="20px"
                    width="80%"
                    startColor="#2D3748"
                    endColor="#4A5568"
                  />
                </Box>
                <Box className="pricing-body" mt={4}>
                  <Box>
                    <Skeleton
                      height="40px"
                      width="40%"
                      startColor="#2D3748"
                      endColor="#4A5568"
                    />
                  </Box>
                  <VStack alignItems={"flex-start"}>
                    <SkeletonText
                      my="4"
                      noOfLines={3}
                      spacing="3"
                      skeletonHeight="20px"
                      width="60%"
                      startColor="#2D3748"
                      endColor="#4A5568"
                    />
                    <Box w="100%">
                      <Skeleton
                        height="50px"
                        width="100%"
                        startColor="#2D3748"
                        endColor="#4A5568"
                      />
                    </Box>
                  </VStack>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LoadingSkeleton;
