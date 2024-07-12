"use client";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Stack,
  HStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

function PriceWrapper(props: Props) {
  const { children } = props;

  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf="flex-start"
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius="xl"
      width="100%"
    >
      {children}
    </Box>
  );
}

export default function Pricing() {
  return (
    <Box id="pricing">
      <Container py={8} maxW={"6xl"}>
        <VStack align="left">
          <Heading
            as="h2"
            textAlign={"left"}
            fontSize={{ base: "lg", md: "xl" }}
            bgGradient="linear-gradient(0deg, #C5100E, #ED5734)"
            bgClip="text"
            textTransform={"uppercase"}
          >
            Pricing
          </Heading>
          <Text
            color={"#EEEE"}
            py={2}
            fontSize={{ base: "sm", md: "md" }}
            maxW={{ base: "2xl", lg: "3xl" }}
          >
            A short link is a powerful tool when you use it carefully and it
            unlocks infinite possibilities. It is not just a link but a medium
            between your customer and there destination.
          </Text>
        </VStack>
        <Stack
          direction={{ base: "column", md: "row" }}
          textAlign="center"
          justify="left"
          spacing={{ base: 4, lg: 10 }}
          py={10}
        >
          <PriceWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Hobby
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  $
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  79
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /month
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue("gray", "gray.700")}
              py={4}
              borderBottomRadius={"xl"}
            >
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon color="green.500" />
                  unlimited build minutes
                </ListItem>
                <ListItem>
                  <ListIcon color="green.500" />
                  Lorem, ipsum dolor.
                </ListItem>
                <ListItem>
                  <ListIcon color="green.500" />
                  5TB Lorem, ipsum dolor.
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="red" variant="outline">
                  Start trial
                </Button>
              </Box>
            </VStack>
          </PriceWrapper>

          <PriceWrapper>
            <Box position="relative">
              <Box
                position="absolute"
                top="-16px"
                left="50%"
                style={{ transform: "translate(-50%)" }}
              >
                <Text
                  textTransform="uppercase"
                  bg={useColorModeValue("red.300", "red.700")}
                  px={3}
                  py={1}
                  color={useColorModeValue("gray.900", "gray.300")}
                  fontSize="sm"
                  fontWeight="600"
                  rounded="xl"
                >
                  Most Popular
                </Text>
              </Box>
              <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                  Growth
                </Text>
                <HStack justifyContent="center">
                  <Text fontSize="3xl" fontWeight="600">
                    $
                  </Text>
                  <Text fontSize="5xl" fontWeight="900">
                    149
                  </Text>
                  <Text fontSize="3xl" color="gray.500">
                    /month
                  </Text>
                </HStack>
              </Box>
              <VStack py={4} borderBottomRadius={"xl"}>
                <List spacing={3} textAlign="start" px={12}>
                  <ListItem>
                    <ListIcon color="green.500" />
                    unlimited build minutes
                  </ListItem>
                  <ListItem>
                    <ListIcon color="green.500" />
                    Lorem, ipsum dolor.
                  </ListItem>
                  <ListItem>
                    <ListIcon color="green.500" />
                    5TB Lorem, ipsum dolor.
                  </ListItem>
                  <ListItem>
                    <ListIcon color="green.500" />
                    5TB Lorem, ipsum dolor.
                  </ListItem>
                  <ListItem>
                    <ListIcon color="green.500" />
                    5TB Lorem, ipsum dolor.
                  </ListItem>
                </List>
                <Box w="80%" pt={7}>
                  <Button w="full" colorScheme="red">
                    Start trial
                  </Button>
                </Box>
              </VStack>
            </Box>
          </PriceWrapper>
          <PriceWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Scale
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  $
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  349
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /month
                </Text>
              </HStack>
            </Box>
            <VStack py={4} borderBottomRadius={"xl"}>
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon color="green.500" />
                  unlimited build minutes
                </ListItem>
                <ListItem>
                  <ListIcon color="green.500" />
                  Lorem, ipsum dolor.
                </ListItem>
                <ListItem>
                  <ListIcon color="green.500" />
                  5TB Lorem, ipsum dolor.
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="red" variant="outline">
                  Start trial
                </Button>
              </Box>
            </VStack>
          </PriceWrapper>
        </Stack>
      </Container>
    </Box>
  );
}
