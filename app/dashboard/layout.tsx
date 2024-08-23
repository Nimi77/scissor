"use client";

import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex minH="100vh" bg="white">
      {/* Sidebar for larger screens */}
      <Sidebar
        onClose={onClose}
        activeNav="Links"
        display={{ base: "none", md: "block" }}
      />
      {/* Sidebar for smaller screens as a Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerOverlay bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(4px)" />

        <DrawerContent maxW="22rem">
          <Sidebar activeNav="Links" onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* Main content */}
      <Box
        flex="1"
        ml={{ base: 0, md: 60 }}
        overflow="auto"
        bgColor="#fbfbfb"
      >
        <Header onOpen={onOpen} />
        <Box as="main" px="8" py="6" mt="20">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;