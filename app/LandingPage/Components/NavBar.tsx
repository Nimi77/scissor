"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}
const NavItems = ["Features", "Pricing", "Login"];

// navlink
const NavLink = (props: Props) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={4}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      {/* header */}
      <Box>
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          <Flex alignItems={"center"} justify={"start"}>
            {/* app-icon */}
            <Box></Box>
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
            >
              Scissor
            </Text>
          </Flex>

          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {NavItems.map((navItem) => (
              <NavLink key={navItem}>{navItem}</NavLink>
            ))}
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              borderRadius={"lg"}
              _hover={{ bg: "pink.300" }}
            >
              <Link href="/SignIn"> Get Started</Link>
            </Button>
          </HStack>

          {/* toggle button */}
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              variant={"ghost"}
              aria-label={"Open Menu"}
              onClick={isOpen ? onClose : onOpen}
            />
          </Flex>
        </Flex>

        {/* show mobile nav  */}
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {NavItems.map((navItem) => (
                <NavLink key={navItem}>{navItem}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
