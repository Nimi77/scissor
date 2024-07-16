"use client";

import {
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function Hero() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    if (inputValue.length < 10) {
      setError("Please enter at least 10 characters");
    } else {
      setError("");
    }
  };

  return (
    <Box className="hero" pt="10rem" pb="8rem">
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
            fontSize={{ base: "sm", md: ".95rem" }}
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
                maxW="4xl"
                className="input-glow"
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
                  aria-label="Paste a link to shorten it"
                />
                <InputRightElement mr="1.8rem">
                  <Button
                    fontSize=".9rem"
                    onClick={handleClick}
                    bg="#ED5734"
                    color="white"
                    px="3rem"
                    _hover={{
                      bg: "#FF4C24",
                      transition: "all 0.3s ease",
                    }}
                    aria-label="Shorten Link"
                  >
                    <span>Shorten</span>
                  </Button>
                </InputRightElement>
              </InputGroup>
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
  );
}
