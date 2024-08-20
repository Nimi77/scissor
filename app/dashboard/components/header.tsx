"use client";

import React, { useState } from "react";
import {
  Flex,
  IconButton,
  Text,
  HStack,
  Box,
  Menu,
  MenuButton,
  Avatar,
  VStack,
  MenuList,
  MenuItem,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  FlexProps,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown, FiX } from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const Header = ({ onOpen, ...rest }: MobileProps) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { data: session, status } = useSession();
  const { isOpen, onOpen: openModal, onClose } = useDisclosure();
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  const userInitial = session?.user?.email?.charAt(0).toUpperCase() || "";
  const userEmail = session?.user?.email || "User";

  const handleLogOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
    onClose();
  };

  return (
    <Box
      pos="fixed"
      top="0"
      px={{ base: 4, md: 4 }}
      w={{ base: "full", md: "calc(100% - 240px)" }}
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      {...rest}
    >
      <Box className="container">
        <Flex
          alignItems="center"
          justifyContent={{ base: "space-between", md: "flex-end" }}
          height="20"
        >
          <IconButton
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
            variant="outline"
            aria-label="Open Menu"
            icon={<FiMenu />}
          />

          <Text
            display={{ base: "flex", md: "none" }}
            fontSize="2xl"
            fontWeight="bold"
          >
            linktrim
          </Text>

          <HStack spacing={{ base: "0", md: "2" }}>
            {/* Bell Notification Icon */}
            <IconButton
              size="lg"
              p={0}
              variant="ghost"
              aria-label="Open Notifications"
              aria-expanded={isNotificationOpen}
              aria-controls="notification-box"
              icon={<FiBell />}
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            />

            {/* Notification Box */}
            {isNotificationOpen && (
              <Box
                id="notification-box"
                position="absolute"
                top="70px"
                right="20px"
                p={4}
                bg="white"
                borderRadius="md"
                boxShadow="md"
                w="300px"
                zIndex="dropdown"
                aria-live="polite"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text fontWeight="bold">Alert</Text>
                  <IconButton
                    icon={<FiX />}
                    aria-label="Close Notification Info"
                    onClick={() => setIsNotificationOpen(false)}
                    variant="outline"
                    colorScheme="red"
                  />
                </Box>
                <Text mt={2}>Alert about your account will show here.</Text>
              </Box>
            )}

            {/* User Profile */}
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                  aria-expanded={isNotificationOpen ? "true" : "false"}
                  aria-label="User Menu"
                >
                  <HStack>
                    <Avatar name={userEmail} size="sm">
                      {userInitial}
                    </Avatar>
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="md">{userEmail}</Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList bg="white" borderColor="gray.200">
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Billing</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={openModal}> Log out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
        </Flex>
      </Box>

      {/* Logout Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(4px)" />
        <ModalContent
          p="1.5rem"
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ModalHeader textAlign="center" fontWeight="500" fontSize="1.2rem">
            Confirm Logout
          </ModalHeader>
          <ModalFooter mt="2rem">
            <Flex alignItems="center" justifyContent="space-between">
              <Button
                variant="outline"
                size="lg"
                borderRadius="lg"
                transition="all .4s ease-in"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                size="lg"
                borderRadius="lg"
                transition="all .4s ease-in"
                onClick={handleLogOut}
              >
                Yes, Log out
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Header;