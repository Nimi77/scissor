"use client";

import { Box, Flex, Text, useColorModeValue, Link} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box py={10}>
      <Flex
        align={"center"}
        _before={{
          content: '""',
          borderBottom: "1px solid",
          borderColor: useColorModeValue("gray.200", "gray.700"),
          flexGrow: 1,
          mr: 8,
        }}
        _after={{
          content: '""',
          borderBottom: "1px solid",
          borderColor: useColorModeValue("gray.200", "gray.700"),
          flexGrow: 1,
          ml: 8,
        }}
      ><Text
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
    ></Box></Flex>
      <Text pt={6} fontSize={"sm"} textAlign={"center"}>
        © 2024 designed by <Link href="#">Abimbola Oladejo.</Link>
      </Text>
    </Box>
  );
};
export default Footer;
