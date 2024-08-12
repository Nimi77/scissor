"use client";

import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Logout = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bgColor="#e8e8e8">
      <Box
        px={6}
        py={14}
        w={{ base: "auto", md: "xl" }}
        bgGradient="linear(to-l, #fafafa, #ebebeb)"
        borderRadius="lg"
        boxShadow="md"
        textAlign="center"
        _hover={{ boxShadow: "base" }}
      >
        <Heading as="h2" size="lg" mb={4}>
          Log Out
        </Heading>
        <Text color="gray.500" mb={8} size="lg">
          Are you sure you want to log out?
        </Text>

        <Box display="flex" gap="4" alignItems="center" justifyContent="center">
          <Button
            size="lg"
            borderRadius="lg"
            onClick={handleLogout}
            bg="#FF4C24"
            color="white"
            _hover={{
              transition: ".3s ease-in-out",
              boxShadow: "0 4px 12px rgba(237, 87, 52, 0.3)",
              textDecoration: "none",
            }}
          >
            Confirm Log Out
          </Button>
          <Link href="/dashboard">
            <Button
              colorScheme="teal"
              size="lg"
              borderRadius="lg"
              transition=".4s ease-in-out"
            >
              Cancel
            </Button>
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default Logout;
