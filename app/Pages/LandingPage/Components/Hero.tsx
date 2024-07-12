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
import { Link as ChakraLink } from "@chakra-ui/react";
import { useState } from "react";

interface NavItemProps {
  name: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ name, href, isActive, onClick }: NavItemProps) => {
  return (
    <ChakraLink
      href={href}
      onClick={onClick}
      px={4}
      py={2}
      rounded={"lg"}
      fontSize=".9rem"
      color={isActive ? "white" : "#eeee"}
      position="relative"
      sx={{
        _after: {
          content: '""',
          position: "absolute",
          width: "0",
          height: "2px",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          bgGradient: "linear(0deg, #ED5734, #C5100E)",
          transition: "width 0.3s ease",
        },
        _hover: {
          color: "white",
          _after: {
            width: "100%",
          },
        },
      }}
      aria-current={isActive ? "page" : undefined}
    >
      {name}
    </ChakraLink>
  );
};

const NavItems: Array<{ name: string; href: string }> = [
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

const NavButtons = () => (
  <>
    <Button
      fontSize=".9rem"
      fontWeight={400}
      color="white"
      bg="transparent"
      borderRadius="lg"
      borderWidth="2px"
      borderColor="#C5100E"
      _hover={{
        bgGradient: "linear(0deg, #ED5734, #C5100E)",
        transition: "background 0.3s ease",
      }}
      aria-label="Login"
    >
      <Link href="/SignIn" passHref>
        Login
      </Link>
    </Button>
    <Button
      fontSize=".9rem"
      fontWeight={600}
      color="white"
      borderRadius="lg"
      bgGradient="linear(0deg, #C5100E, #ED5734)"
      _hover={{
        bgGradient: "linear(0deg, #A00E0C, #C84B2E)",
        transition: "background 0.3s ease",
      }}
      aria-label="Get Started"
    >
      <Link href="/SignUp" passHref>
        Get Started
      </Link>
    </Button>
  </>
);

export default function Hero() {
  const [activeNav, setActiveNav] = useState("Home");
  const { isOpen, onOpen, onClose } = useDisclosure();
  // state managment for the input
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleNavClick = (name: string) => {
    setActiveNav(name);
    onClose();
  };

  const handleClick = () => {
    if (inputValue.length < 10) {
      setError("Please enter at least 10 character");
    } else {
      setError("");
    }
  };

  return (
    <Box>
      <Box position="sticky" top={0} zIndex={10} backdropFilter="blur(10px)">
        <Flex
          pt={{ base: 6 }}
          px={{ base: 4 }}
          alignItems="center"
          justifyContent={{ base: "space-between", md: "space-around" }}
        >
          <Flex alignItems="center" justify="start">
            <Box mr={2} aria-label="Logo">
              <LinkIcon aria-hidden="true" />
            </Box>
            <Flex align="center" justify="center">
              <Text
                textAlign="left"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight={600}
                aria-label="linktrim"
              >
                linktrim
              </Text>
              <Box
                bgGradient="linear-gradient(0deg, #C5100E, #ED5734)"
                borderRadius="full"
                ml={1}
                w={2}
                h={2}
                mb="-8px"
                aria-hidden="true"
              ></Box>
            </Flex>
          </Flex>

          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {NavItems.map((navItem) => (
              <NavItem
                key={navItem.name}
                name={navItem.name}
                href={navItem.href}
                isActive={activeNav === navItem.name}
                onClick={() => handleNavClick(navItem.name)}
              />
            ))}
          </HStack>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify="flex-end"
            direction="row"
            spacing={4}
            display={{ base: "none", md: "flex" }}
          >
            <NavButtons />
          </Stack>

          {/* toggle button */}
          <Box
            display={{ base: "flex", md: "none" }}
            alignItems="center"
            justifyContent="center"
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
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={isOpen ? onClose : onOpen}
            />
          </Box>
        </Flex>

        {/* show mobile nav  */}
        {isOpen ? (
          <Box
            position="fixed"
            top={0}
            left={0}
            width="100%"
            height="100vh"
            bg="rgba(0, 0, 0, 0.8)"
            color="white"
            display={{ base: "flex", md: "none" }}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            zIndex={20}
            transform={isOpen ? "translateX(0)" : "translateX(100%)"}
            transition="transform 0.3s ease-in-out"
          >
            <Flex
              position="absolute"
              top={4}
              right={4}
              alignItems="center"
              justifyContent="center"
            >
              <IconButton
                icon={<CloseIcon boxSize={4} />}
                variant={"ghost"}
                color={"#848585"}
                aria-label="Close menu"
                onClick={onClose}
              />
            </Flex>
            <Stack as="nav" spacing={4} textAlign="center">
              {NavItems.map((navItem) => (
                <ChakraLink
                  key={navItem.name}
                  href={navItem.href}
                  onClick={() => handleNavClick(navItem.name)}
                  fontSize="md"
                >
                  {navItem.name}
                </ChakraLink>
              ))}
              <NavButtons />
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* hero body */}
      <Box>
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
                bgGradient="linear-gradient(0deg, #C5100E, #ED5734)"
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
                    <LinkIcon aria-hidden="true" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Paste a link to shorten it"
                    border="none"
                    borderColor="transparent"
                    fontSize="sm"
                    onChange={(e) => setInputValue(e.target.value)}
                    bg="#090B0E"
                  />
                </InputGroup>
                <Button
                  fontSize=".9rem"
                  py={{ md: "1.4rem" }}
                  onClick={handleClick}
                >
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
                  bg="#FF7F7F"
                  color="#FFFFFF"
                  fontSize="sm"
                  fontWeight="bold"
                  borderRadius="md"
                  aria-live="assertive"
                  aria-atomic="true"
                >
                  {error}
                </Box>
              )}
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
