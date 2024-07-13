"use client";

import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

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
      ></Flex>
      <Text pt={6} fontSize={"sm"} textAlign={"center"}>
        © 2022 Chakra Templates. All rights reserved
      </Text>
    </Box>
  );
};
export default Footer;
