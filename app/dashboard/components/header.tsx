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
  useColorModeValue,
  FlexProps,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown, FiX } from "react-icons/fi";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const Header = ({ onOpen, ...rest }: MobileProps) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
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

      <HStack spacing={{ base: "0", md: "6" }}>
        {/* Bell Notification Icon */}
        <IconButton
          size="lg"
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
            bg={useColorModeValue("white", "gray.800")}
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
                <Avatar name="Beckam" size="sm" />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    User
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Header;