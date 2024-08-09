"use client"

import React from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  CloseButton,
  Button,
} from "@chakra-ui/react";
import {
  FiHome,
  FiSettings,
  FiLink,
  FiPieChart,
  FiFileText,
  FiLogOut,
} from "react-icons/fi";
import { LinkItemProps, NavItemProps, SidebarProps } from "../types";
import Link from "next/link";

// Link items to be displayed in the sidebar
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/dashboard"},
  { name: "Links", icon: FiLink, href: "/dashboard/links"},
  { name: "Microsite", icon: FiFileText, href: "/dashboard/microsite"},
  { name: "Campaigns", icon: FiPieChart, href: "/dashboard/campaigns"},
  { name: "Custom Link", icon: FiLink, href: "/dashboard/custom-links"},
  { name: "Settings", icon: FiSettings, href: "/dashboard/settings"}
];

export const NavItem = ({
  icon,
  children,
  href,
  isActive = false,
  ...rest
}: NavItemProps) => {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="3"
        my="1"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? "rgba(255, 255, 255, 0.16)" : "transparent"}
        _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            color={isActive ? "white" : "inherit"}
            _groupHover={{ color: "white" }}
            as={icon}
          />
        )}
        <Text color={isActive ? "white" : "inherit"}>{children}</Text>
      </Flex>
    </Link>
  );
};

const Sidebar = ({ onClose, activeNav, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg="black"
      color="white"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      px="6"
      {...rest}
    >
      <Flex h="20" alignItems="center" justifyContent="space-between">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="logo"
        >
          <Text
            as="span"
            fontSize={{ base: "3xl", md: "4xl" }}
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
          />
        </Box>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {/* new link button */}
      <Box mt={6} mb={4}>
        <Link href="">
          <Button
            w="full"
            variant="solid"
            color="white"
            borderRadius="lg"
            bg="#FF4C24"
            _hover={{
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(237, 87, 52, 0.3)",
              textDecoration: "none",
            }}
            display="flex"
            alignItems="center"
          >
            Create New Link
          </Button>
        </Link>
      </Box>
      {/* nav items */}
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          href={link.href}
          isActive={activeNav === link.name}
          borderTop={link.href === "/dashboard/settings" ? "1px solid" : "none"}
          borderColor={
            link.href === "/dashboard/settings" ? "gray.400" : "transparent"
          }
        >
          {link.name}
        </NavItem>
      ))}

      {/* log out */}
      <Box
        className="fixed bottom-4 flex items-end justify-center"
        w="full"
        p={2}
      >
        <Flex w="full" alignItems="center" gap="4">
          <FiLogOut />
          <Link href="/logout">
            <span>Log Out</span>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default Sidebar;