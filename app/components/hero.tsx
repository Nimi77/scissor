"use client";

import { Heading, Container, Text, Box, Stack } from "@chakra-ui/react";
import UrlShortenForm from "./UrlShortenForm";

const Hero = () => {
  return (
    <Box className="hero" pt={{ base: "9rem", md: "11rem" }} pb="8rem">
      <Container maxW="6xl" position="relative">
        <Stack
          textAlign={"center"}
          align={"center"}
          justify={"center"}
          spacing={{ base: 4, md: 6 }}
        >
          <Heading
            as="h2"
            fontSize={{ base: "5xl", lg: "6xl" }}
            lineHeight={0.9}
          >
            Shorten and <br />
            <Text
              as="span"
              bgGradient="linear-gradient(180deg, #C5100E, #ED5734)"
              bgClip="text"
            >
              Customize Your Links
            </Text>
          </Heading>
          <Text color="white" maxW={{ base: "4xl", md: "2xl" }}>
            Simplify your links with our URL shortening tool. Enhance your
            marketing strategy with custom URLs, QR code generation, and
            insightful analytics.{" "}
            <Text as="span" display={{ base: "none", md: "inline" }}>
              Seamlessly manage and track your link performance.
            </Text>
          </Text>
          <Box width="100%" py={4}>
            <UrlShortenForm />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
export default Hero;
