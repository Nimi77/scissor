"use client";
import { LinkIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  VStack,
  Text,
  Flex,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const SideNav = () => {
  return (
    <Flex
      direction="column"
      h="100vh"
      bg="gray.900"
      color="white"
      w="250px"
      px={6}
      py={4}
      className="side-nav"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        className="logo"
      >
        <Text
          as="span"
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
      </Box>
      {/* new link button */}
      <Box mt={6} mb={4}>
        <Link href="">
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
            Create New Link
          </Button>
        </Link>
      </Box>
      {/* nav buttons */}
      <VStack align="start" spacing={4}>
        <Link href="/">
          <Button as="a" variant="ghost" leftIcon={<LinkIcon />}>
            Dashboard
          </Button>
        </Link>
        <Link href="/links">
          <Button as="a" variant="ghost" leftIcon={<LinkIcon />}>
            Links
          </Button>
        </Link>
        <Link href="/microsite">
          <Button as="a" variant="ghost" leftIcon={<LinkIcon />}>
            Microsite
          </Button>
        </Link>
        <Link href="/campaigns">
          <Button as="a" variant="ghost" leftIcon={<LinkIcon />}>
            Campaigns
          </Button>
        </Link>
        <Link href="/custom-links">
          <Button as="a" variant="ghost" leftIcon={<LinkIcon />}>
            Custom Link
          </Button>
        </Link>
        <Link href="/settings">
          <Button as="a" variant="ghost" leftIcon={<LinkIcon />}>
            Settings
          </Button>
        </Link>
        <Spacer />
        <Link href="/log-out">
          <Button as="a" variant="ghost" leftIcon={<LinkIcon />}>
            Log Out
          </Button>
        </Link>
      </VStack>
    </Flex>
  );
};

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex as="header" align="center" justify="space-between" bg="white">
      <Text fontSize="3xl" fontWeight="bold">
        Link Shortener
      </Text>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Flex>
  );
};
export default function Layout({ children }: LayoutProps) {
  return (
    <Flex h="100vh">
      <SideNav />
      <Box flex="1" overflow="auto">
        <Header />
        <Box as="main" p="6">
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
