"use client";

import { Box, Flex, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="#111316">
      <Box display="grid" placeItems="center" py={6}>
        <Flex alignItems="center" justifyItems="center">
          <Text
            textAlign="left"
            fontSize={{ base: "2xl" }}
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
        <Text textAlign={"center"}>
          © 2024 developed by <Link href="#">Abimbola Oladejo.</Link>
        </Text>
      </Box>
    </Box>
  )
}
export default Footer;