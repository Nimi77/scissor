"use client";

import {
  Text,
  Stack,
  Box,
  Container,
  Flex,
  IconButton,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as ChakraLink } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

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
      color={isActive ? "white" : "#eeee"}
      position="relative"
      textDecoration="none"
      className="nav-link"
      aria-current={isActive ? "page" : undefined}
    >
      {name}
    </ChakraLink>
  );
};

const NavButtons = ({ isMobile }: { isMobile?: boolean }) => (
  <>
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      bg={isMobile ? "#1a1a1a" : "transparent"}
      py={isMobile ? ".9rem" : ".2rem"}
      px={isMobile ? ".9rem" : "1.2rem"}
      fontWeight={600}
      color="white"
      borderRadius="lg"
      borderWidth="2px"
      borderColor="#ED5734"
      _hover={{
        bg: "#2A2A2A",
        transition: "all 0.2s ease",
      }}
      aria-label="Login"
    >
      <Link href="/login">Login</Link>
    </Box>
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      py={isMobile ? ".9rem" : ".4rem"}
      px={isMobile ? ".9rem" : "1.2rem"}
      fontWeight={600}
      color="white"
      bg="#FF4C24"
      borderRadius="lg"
      minWidth="6rem"
      whiteSpace="nowrap"
      _hover={{
        bg: "#ED5734",
        transition: "all 0.2s ease",
      }}
    >
      <Link href="/signup">Get Started</Link>
    </Box>
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
      <Container maxW="6xl">
        <Flex
          py={{ base: 4 }}
          alignItems="center"
          justifyContent={{ base: "space-between" }}
        >
          <Flex alignItems="center" justify="start">
            <Flex align="center" justify="center">
              <Text
                as="span"
                textAlign="left"
                fontSize={{ base: "3xl", md: "4xl" }}
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
