"use client";

import {
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Box,
  Flex,
  IconButton,
  useDisclosure,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, LinkIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useState } from "react";

interface NavItem {
  name: string;
  href?: string;
}
const NavItems: Array<NavItem> = [
  {
    name: "Home",
    href: "#",
  },
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
];

export default function Hero() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // state managment for the input
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    if (inputValue.length < 10) {
      setError("Please enter at least 10 character");
    } else {
      setError("");
    }
  };
  return (
    <Box>
      <Box position="sticky">
        <Flex
          pt={{ base: 6 }}
          px={{ base: 4 }}
          alignItems="center"
          justifyContent="space-around"
        >
          <Flex alignItems="center" justify="start">
            <Box mr={2}>
              <LinkIcon />
            </Box>
            <Flex align="center" justify="center">
              <Text
                textAlign="left"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight={600}
              >
                linktrim
              </Text>
              <Box
                bgGradient="linear(45deg, #AD67DB, #5B13D6)"
                borderRadius="full"
                ml={1}
                w={2}
                h={2}
                mb="-8px"
              ></Box>
            </Flex>
          </Flex>

          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {NavItems.map((navItem) => (
              <Box
                as="a"
                px={4}
                py={2}
                rounded={"lg"}
                fontSize=".9rem"
                color="#eeee"
                _hover={{
                  textDecoration: "none",
                  bg: "#0a3180",
                  cursor: "pointer",
                }}
                key={navItem.name}
              >
                {navItem.name}
              </Box>
            ))}
          </HStack>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify="flex-end"
            direction="row"
            spacing={4}
          >
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize=".9rem"
              fontWeight={400}
              color="white"
              bg="transparent"
              borderRadius="lg"
              borderWidth="2px"
              borderColor="#0a3180"
              _hover={{ bg: "#0a3180" }}
            >
              <Link href="/SignIn" passHref>Login</Link>
            </Button>
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize=".9rem"
              fontWeight={600}
              color="white"
              bg="#0a3180"
              borderRadius="lg"
              _hover={{ bg: "#0a3180" }}
            >
              <Link href="/SignUp" passHref> Get Started</Link>
            </Button>
          </Stack>

          {/* toggle button */}
          <Flex
            display={{ base: "flex", md: "none" }}
            alignItems="right"
            justify="center"
          >
            <IconButton
              icon={
                isOpen ? (
                  <CloseIcon boxSize={4} />
                ) : (
                  <HamburgerIcon boxSize={6} />
                )
              }
              variant={"ghost"}
              color={"#848585"}
              aria-label={"Toggle Menu"}
              onClick={isOpen ? onClose : onOpen}
            />
          </Flex>
        </Flex>

        {/* show mobile nav  */}
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={4}>
              {NavItems.map((navItem) => (
                <Box
                  as="a"
                  rounded={"lg"}
                  fontSize=".9rem"
                  color="#eeee"
                  key={navItem.name}
                >
                  {navItem.name}
                </Box>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* hero body */}
      <Container maxW={"6xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          justify={"center"}
          spacing={{ base: 4, md: 6 }}
          py={{ base: 20, md: 32 }}
        >
          <Heading as="h2" fontSize={{ base: "4xl", md: "6xl" }}>
            Shorten and <br />
            <Text
              as="span"
              bgGradient="linear(45deg, #AD67DB, #5B13D6)"
              bgClip="text"
            >
              Customize Your Links
            </Text>
          </Heading>
          <Text
            color="#eeee"
            maxW={{ base: "3xl" }}
            fontSize={{ base: "sm", md: "medium" }}
          >
            Simplify your links with our URL shortening tool. Enhance your
            marketing strategy with custom URLs, QR code generation, and
            insightful analytics.{" "}
            <Text as="span" display={{ base: "none", md: "inline" }}>
              Seamlessly manage and track your link performance.
            </Text>
          </Text>
          <Box width="100%">
            <Flex alignItems="center" justifyContent="center">
              <InputGroup
                size={{ base: "md", md: "lg" }}
                maxW={{ base: "auto", md: "3xl" }}
                mr={3}
                flex="1"
              >
                <InputLeftElement pointerEvents="none">
                  <LinkIcon />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Paste a link to shorten it"
                  border="2px"
                  fontSize="sm"
                  onChange={(e) => setInputValue(e.target.value)}
                  bg="#090b0e"
                />
              </InputGroup>
              <Button size={{ base: "md", md: "lg" }} onClick={handleClick}>
                Shorten
              </Button>
            </Flex>
            {error && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mx="auto"
                width="18rem"
                mt={4}
                py={2}
                bg="red.100"
                fontSize="sm"
                color="red.700"
                borderRadius="md"
              >
                {error}
              </Box>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
