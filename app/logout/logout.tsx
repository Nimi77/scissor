"use client";

import React from "react";
import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Logout = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bgColor="#fbfbfb">
      <Box
        px={6}
        py={14}
        w={{ base: "auto", md: "xl" }}
        textAlign="center"
        bgColor="white"
        borderWidth="1px"
        borderRadius="lg"
        shadow="sm"
        _hover={{ shadow: "base" }}
      >
        <Heading as="h3" size="lg">
          Log Out
        </Heading>
        <Text mt={4} mb={6} size="lg">
          Are you sure you want to log out?
        </Text>

        <Box display="flex" gap="6" alignItems="center" justifyContent="center">
          <Link href="/dashboard">
            <Button
              p={{base: "1rem", md: "1.4rem"}}
              variant="outline"
              borderRadius="lg"
              _hover={{
                transition: ".3s ease-in",
                textDecoration: "none"
              }}
            >
              Cancel
            </Button>
          </Link>
          <Button
            p={{base: "1rem", md: "1.4rem"}}
            borderRadius="lg"
            onClick={handleLogout}
            colorScheme="red"
            _hover={{
              transition: ".3s ease-in"
            }}
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Logout;
