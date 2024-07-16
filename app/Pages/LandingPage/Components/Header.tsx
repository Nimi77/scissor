"use client";

import {
  Text,
  Button,
  Stack,
  Box,
  Container,
  Flex,
  IconButton,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, LinkIcon } from "@chakra-ui/icons";
import { Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const NavItems = [
  { name: "Home", href: "#" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
];

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
      fontSize=".95rem"
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

const NavButtons = ({ isMobile }: { isMobile?: boolean }) => (
  <>
    <Link href="/Login" passHref>
      <Button
        width={isMobile ? "100%" : "auto"}
        height={isMobile ? "3rem" : "2.5rem"}
        fontSize=".95rem"
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
        tabIndex={-1}
        aria-label="Login"
      >
        Login
      </Button>
    </Link>
    <Link href="/SignUp" passHref>
      <Button
        width={isMobile ? "100%" : "auto"}
        height={isMobile ? "3rem" : "2.5rem"}
        fontSize=".95rem"
        fontWeight={600}
        color="white"
        borderRadius="lg"
        bg="#ED5734"
        _hover={{
          bg: "#ED5731",
          transition: "all 0.3s ease",
        }}
        tabIndex={-1}
        aria-label="Get Started"
      >
        Get Started
      </Button>
    </Link>
  </>
);

export default function Header() {
  const [activeNav, setActiveNav] = useState("Home");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleNavClick = (name: string) => {
    setActiveNav(name);
    onClose();
  };

  // framer motion styling of mobile nav container
  const MotionBox = motion(Box);

  return (
    <Box
      role="header"
      position="fixed"
      top={0}
      zIndex={10}
      backdropFilter="blur(22px)"
      width="100%"
      className="nav-bar"
    >
      <Container maxW={"6xl"}>
        <Flex
          py={{ base: 4 }}
          alignItems="center"
          justifyContent={{ base: "space-between" }}
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
        <AnimatePresence>
          {isOpen ? (
            <MotionBox
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <Stack as="nav" spacing={4} textAlign="center" width="90%">
                {NavItems.map((navItem) => (
                  <ChakraLink
                    key={navItem.name}
                    href={navItem.href}
                    onClick={() => handleNavClick(navItem.name)}
                    fontSize=".95rem"
                    pb={4}
                    _hover={{ textDecoration: "none", color: "#eeee" }}
                  >
                    {navItem.name}
                  </ChakraLink>
                ))}
                <NavButtons isMobile />
              </Stack>
            </MotionBox>
          ) : null}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
