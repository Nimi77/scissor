"use client";

import { Box, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Custom404() {
  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
    >
      <Heading as="h1" size="xl">
        404 - Page Not Found
      </Heading>
      <Text fontSize="lg" mt="2" mb="6">
        Oops! The page you are looking for does not exist.
      </Text>
      <Link href="/">
        <Button
          color="white"
          bgColor="#FF4C24"
          py="0.4rem"
          px="1.2rem"
          borderRadius="lg"
          minWidth="6rem"
          _hover={{
            transition: "0.2s ease-in",
            bgColor: "#ED5734"
          }}
        >
          Go back home
        </Button>
      </Link>
    </Box>
  );
}