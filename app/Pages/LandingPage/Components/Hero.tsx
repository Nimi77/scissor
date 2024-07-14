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

const NavButtons = ({ isMobile }: { isMobile?: boolean }) => (
  <>
    <Button
      width={isMobile ? "100%" : "auto"}
      fontSize=".9rem"
      fontWeight={400}
      color="white"
      bg={isMobile ? "#1a1a1a" : "transparent"}
      borderRadius="lg"
      borderWidth="2px"
      borderColor="#ED5734"
      _hover={{
        bg: "#2a2a2a",
        transition: "all 0.3s ease",
      }}
      aria-label="Login"
    >
      <Link href="/SignIn" passHref>
        Login
      </Link>
    </Button>
    <Button
      width={isMobile ? "100%" : "auto"}
      height={isMobile ? "3rem" : "auto"}
      fontSize=".9rem"
      fontWeight={600}
      color="white"
      borderRadius="lg"
      bg="#ED5734"
      _hover={{
        bg: "#ED5731",
        transition: "all 0.3s ease",
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
      <Box
        position="fixed"
        top={0}
        zIndex={10}
        backdropFilter="blur(10px)"
        width="100%"
        className="nav-bar"
      >
        <Flex
          pt={{ base: 6 }}
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
            position="fixed"
            top={4}
            right={4}
            zIndex={30}
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
            bg="#000000"
            py="8.4rem"
            px={8}
            color="white"
            display={{ base: "flex", md: "none" }}
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            zIndex={20}
            transform={isOpen ? "translateX(0)" : "translateX(100%)"}
            transition="all 0.3s ease-in-out"
          >
            <Stack as="nav" spacing={4} textAlign="center" width="90%">
              {NavItems.map((navItem) => (
                <ChakraLink
                  key={navItem.name}
                  href={navItem.href}
                  onClick={() => handleNavClick(navItem.name)}
                  fontSize="md"
                  pb={4}
                  _hover={{ textDecoration: "none", color: "#eeee" }}
                >
                  {navItem.name}
                </ChakraLink>
              ))}
              <NavButtons isMobile />
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* hero body */}
      <Box py={{ base: 20, md: 28 }}>
        <Container maxW={"6xl"}>
          <Stack
            textAlign={"center"}
            align={"center"}
            justify={"center"}
            spacing={{ base: 4, md: 6 }}
          >
            <Heading as="h2" fontSize={{ base: "5xl", lg: "6xl" }}>
              Shorten and <br />
              <Text
                as="span"
                bgGradient="linear-gradient(180deg, #C5100E, #ED5734)"
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
            <Box width="100%" py={4}>
              <Flex alignItems="center" justifyContent="center">
                <InputGroup
                  size="lg"
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
                  py={{ base: "1.4rem" }}
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
                  bg="#3B2B2B"
                  color="#F86461"
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
