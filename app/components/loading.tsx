import {
  Box,
  Container,
  Stack,
  Skeleton,
  SkeletonText,
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";

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
      height="40px"
      width="40px"
      startColor="#2D3748"
      endColor="#4A5568"
    />
    <Skeleton
      height="30px"
      width="70%"
      mt={4}
      startColor="#2D3748"
      endColor="#4A5568"
    />
    <SkeletonText
      mt="4"
      noOfLines={4}
      spacing="4"
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
    <Skeleton
      height="40px"
      width="60%"
      startColor="#2D3748"
      endColor="#4A5568"
    />
    <SkeletonText
      mt="4"
      noOfLines={4}
      spacing="4"
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
      spacing="4"
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
      {/* hero skeleton */}
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
              width="70%"
              startColor="#2D3748"
              endColor="#4A5568"
            >
              <Box>Placeholder for Heading</Box>
            </Skeleton>
            <SkeletonText
              mt="4"
              noOfLines={3}
              spacing="4"
              skeletonHeight="2"
              width="80%"
              startColor="#2D3748"
              endColor="#4A5568"
            >
              <Box>Placeholder for Text</Box>
            </SkeletonText>
            <Box width="100%" py={4}>
              <Flex alignItems="center" justifyContent="center">
                <Skeleton
                  height="60px"
                  width="100%"
                  startColor="#2D3748"
                  endColor="#4A5568"
                >
                  <InputGroup size="lg" maxW="4xl" className="input-glow">
                    <Input
                      border="none"
                      borderColor="transparent"
                      bg="#090B0E"
                    />
                    <InputRightElement mr="1.8rem">
                      <Button bg="#FF4C24" color="white" px="3rem">
                        <span>Shorten</span>
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Skeleton>
              </Flex>
            </Box>
          </Stack>
        </Container>
      </Box>
      {/* features */}
      <Box
        id="features"
        role="region"
        aria-labelledby="features-heading"
        bg="black"
      >
        <Container maxW={"6xl"}>
          <VStack align="left">
            <Skeleton
              height="30px"
              width="200px"
              startColor="#2D3748"
              endColor="#4A5568"
            />
            <SkeletonText
              mt="4"
              noOfLines={3}
              spacing="4"
              width="80%"
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
      {/* pricing */}
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
              width="200px"
              startColor="#2D3748"
              endColor="#4A5568"
            />
            <SkeletonText
              mt="4"
              noOfLines={3}
              spacing="4"
              skeletonHeight="2"
              width="80%"
              startColor="#2D3748"
              endColor="#4A5568"
            />
          </VStack>
          <Box mt={8}>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              gap={{ base: 5, md: 0 }}
            >
              <PriceWrapperSkeleton />
              <PriceWrapperSkeleton />
            </Flex>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default LoadingSkeleton;
