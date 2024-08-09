"use client";

import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex minH="100vh" bg="gray.100">
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
        size="full"
      >
        <DrawerContent>
          <Sidebar activeNav="Links" onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* Main content area */}
      <Box flex="1" overflow="auto">
        <Header onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4" as="main">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
