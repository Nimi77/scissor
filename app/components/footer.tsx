"use client";

import { Box, Container, Flex, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-400">
      <Container maxW="6xl" mx="auto" py={4}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" justifyItems="center">
            <Text
              textAlign="left"
              fontSize="3xl"
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
          <Flex alignItems="center" justifyItems="center">
            <Text>
              built by{" "}
              <Link
                href="https://www.linkedin.com/in/abimbola-oladejo-58372a285/"
                textDecoration="underline"
              >
                Abimbola Oladejo
              </Link>
            </Text>
          </Flex>
          <Box>
            <Text textAlign="center">© 2024 linktrim.</Text>
          </Box>
        </Box>
      </Container>
    </footer>
  );
};
export default Footer;