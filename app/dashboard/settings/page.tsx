"use client";

import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Switch,
  FormControl,
  FormLabel,
  Input,
  Select,
  Collapse,
  useDisclosure,
  useToast,
  Spinner,
} from "@chakra-ui/react";

const Settings = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const [name, setName] = useState("");
  const [usageType, setUsageType] = useState("personal");
  const [businessName, setBusinessName] = useState("");

  const handleSaveChanges = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Changes saved.",
        description: "Your settings have been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 2000);
  };

  return (
    <Box p={4} maxW="3xl" borderRadius="lg" shadow="md" bgColor="white">
      <Heading as="h2" size="lg" mb={4}>
        Settings
      </Heading>
      <Text fontSize="md" color="gray.500" mb={8}>
        Adjust your account settings, preferences, and more.
      </Text>

      {/* Account Details Section */}
      <FormControl mb={6}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </FormControl>

      <FormControl mb={6}>
        <FormLabel htmlFor="usageType">Are you using this website for?</FormLabel>
        <Select
          id="usageType"
          value={usageType}
          onChange={(e) => setUsageType(e.target.value)}
        >
          <option value="personal">Personal Use</option>
          <option value="business">Business Use</option>
        </Select>
      </FormControl>

      {usageType === "business" && (
        <FormControl mb={6}>
          <FormLabel htmlFor="businessName">Business Name (Optional)</FormLabel>
          <Input
            id="businessName"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Enter your business name"
          />
        </FormControl>
      )}

      {/* Dark Mode Setting */}
      <FormControl display="flex" alignItems="center" mb={6}>
        <FormLabel htmlFor="dark-mode" mb="0">
          Dark Mode
        </FormLabel>
        <Switch id="dark-mode" colorScheme="orange" />
      </FormControl>

      {/* Notifications Setting */}
      <FormControl display="flex" alignItems="center" mb={6}>
        <FormLabel htmlFor="notifications" mb="0">
          Enable Notifications
        </FormLabel>
        <Switch id="notifications" colorScheme="orange" />
      </FormControl>

      {/* Expandable Section for Advanced Settings */}
      <Box mb={6}>
        <Button variant="link" color="#FF4C24" onClick={onToggle} mb={2}>
          Advanced Settings
        </Button>
        <Collapse in={isOpen} animateOpacity>
          <Box p={4} borderWidth="1px" borderRadius="lg">
            <FormControl display="flex" alignItems="center" mb={4}>
              <FormLabel htmlFor="privacy-mode" mb="0">
                Privacy Mode
              </FormLabel>
              <Switch id="privacy-mode" colorScheme="orange" />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="auto-updates" mb="0">
                Auto Updates
              </FormLabel>
              <Switch id="auto-updates" colorScheme="orange" />
            </FormControl>
          </Box>
        </Collapse>
      </Box>

      <Button
        color="white"
        borderRadius="lg"
        bg="#FF4C24"
        _hover={{
          transition: "0.3s ease-in",
          bg: "#ED5734",
        }}
        onClick={handleSaveChanges}
        isDisabled={isLoading}
      >
        {isLoading ? <Spinner size="sm" /> : "Save Changes"}
      </Button>
    </Box>
  );
};

export default Settings;