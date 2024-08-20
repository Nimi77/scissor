"use client";

import React from "react";
import { Box, Flex, Text, Icon, CloseButton, Button } from "@chakra-ui/react";
import {
  FiHome,
  FiSettings,
  FiLink,
  FiPieChart,
  FiLogOut,
} from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";
import { MdOutlineAddLink } from "react-icons/md";
import Link from "next/link";
import { LinkItemProps, NavItemProps, SidebarProps } from "../types";
import { usePathname } from "next/navigation";

// Link items to be displayed in the sidebar
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/dashboard/home" },
  { name: "Links", icon: FiLink, href: "/dashboard" },
  { name: "QR Codes", icon: BsQrCode, href: "/dashboard/qrcode" },
  { name: "Campaigns", icon: FiPieChart, href: "/dashboard/campaigns" },
  {
    name: "Custom links",
    icon: MdOutlineAddLink,
    href: "/dashboard/custom-links",
  },
  { name: "Settings", icon: FiSettings, href: "/dashboard/settings" },
];

export const NavItem = ({
  icon,
  children,
  href,
  isActive = false,
  onClose,
  ...rest
<<<<<<< HEAD
}: NavItemProps) => (
  <Link href={href} style={{ textDecoration: "none" }}>
    <Flex
      align="center"
      p="3"
      my="1"
      role="group"
      cursor="pointer"
      borderRadius={isActive ? "lg" : "none"}
      bg={isActive ? "#ededed" : "transparent"}
      _hover={{ bg: "#ededed", borderRadius: "lg" }}
      transition=".3s ease"
      onClick={onClose}
      {...rest}
    >
      {icon && (
        <Icon
          as={icon}
          mr="4"
          fontSize={href === "/dashboard/custom-links" ? "20" : "16"}
          color="#2A2A2A"
          _groupHover={{ color: "gray.600" }}
        />
      )}
      <Text>{children}</Text>
    </Flex>
  </Link>
);
=======
}: NavItemProps) => {
  const isCustomLink = href === "/dashboard/custom-links";

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="3"
        my="1"
        role="group"
        cursor="pointer"
        borderRadius={isActive ? "lg" : "none"}
        bg={isActive ? "#ededed" : "transparent"}
        _hover={{ bg: "#ededed", borderRadius: "lg" }}
        transition=".3s ease"
        onClick={onClose}
        {...rest}
      >
        {icon && (
          <Icon
            as={icon}
            mr="4"
            fontSize={isCustomLink ? "20" : "16"}
            color="#2A2A2A"
            _groupHover={{ color: "gray.600" }}
          />
        )}
        <Text>{children}</Text>
      </Flex>
    </Link>
  );
};
>>>>>>> d3d538c7d0f72827f8e88f61303532d1344b6de3

const Sidebar = ({ onClose, activeNav, ...rest }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <Box
<<<<<<< HEAD
      transition="all .4s ease"
      bgColor={{ base: "#f5f5f5", md: "#fbfbfb" }}
      borderRightWidth={{ base: "none", md: "1px" }}
=======
      transition=".4s ease"
      bgColor="#fbfbfb"
      borderRightWidth="1px"
>>>>>>> d3d538c7d0f72827f8e88f61303532d1344b6de3
      borderRightColor="gray.200"
      color="gray.900"
      w={{ base: "22rem", md: 60 }}
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
        <Link href="/dashboard/custom-links">
          <Button
            w="full"
            color="white"
            borderRadius="lg"
            bg="#FF4C24"
            _hover={{
              transition: "0.4s ease-in",
<<<<<<< HEAD
              bg: "#ED5734",
=======
              bg: "#ED5734"
>>>>>>> d3d538c7d0f72827f8e88f61303532d1344b6de3
            }}
            display="flex"
            alignItems="center"
            onClick={onClose}
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
          isActive={pathname === link.href}
          onClose={onClose}
          borderTop={link.name === "Settings" ? "1px solid" : "none"}
          borderColor={link.name === "Settings" ? "gray.400" : "transparent"}
          onClose={onClose}
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