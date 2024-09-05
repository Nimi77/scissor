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
  Link as ChakraLink,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState, memo } from "react";
import styled from "styled-components";
import Link from "next/link";

export const NavItems = [
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

const NavItem = ({ name, href, isActive, onClick }: NavItemProps) => (
  <ChakraLink
    href={href}
    onClick={onClick}
    px="1.5rem"
    py="0.75rem"
    rounded="lg"
    color={isActive ? "white" : "#eeee"}
    position="relative"
    textDecoration="none"
    className="nav-link"
    aria-current={isActive ? "page" : undefined}
  >
    {name}
  </ChakraLink>
);

const NavButtons = ({ isMobile = false }: { isMobile?: boolean }) => (
  <>
    <ChakraLink
      as={Link}
      href="/login"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      bg={isMobile ? "#1a1a1a" : "transparent"}
      py={isMobile ? "0.75rem" : "0.4rem"}
      px={isMobile ? "0.75rem" : "1.2rem"}
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
      Login
    </ChakraLink>

    <ChakraLink
      as={Link}
      href="/signup"
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
      Get Started
    </ChakraLink>
  </>
);

const MotionDiv = motion(styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #000000;
  padding: 8.4rem 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  z-index: 20;

  @media (min-width: 768px) {
    display: none;
  }
`);

const MemoizedNavButtons = memo(NavButtons);

export default function Header() {
  const [activeNav, setActiveNav] = useState("Home");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleNavClick = (name: string) => {
    setActiveNav(name);
    onClose();
  };

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
            <MemoizedNavButtons />
          </Stack>

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
              variant="ghost"
              color="#848585"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={isOpen ? onClose : onOpen}
            />
          </Box>
        </Flex>

        <AnimatePresence>
          {isOpen ? (
            <MotionDiv
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 } as any}
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
                <MemoizedNavButtons isMobile />
              </Stack>
            </MotionDiv>
          ) : null}
        </AnimatePresence>
      </Container>
    </Box>
  );
}