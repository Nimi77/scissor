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
  VStack,
} from "@chakra-ui/react";

const Settings = () => {
  const [name, setName] = useState("");
  const [usageType, setUsageType] = useState("personal");
  const [businessName, setBusinessName] = useState("");
  const { isOpen, onToggle } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

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
    <Box
      bgColor="white"
      p={{ base: 4, md: 6 }}
      mx={{ base: "auto", md: 24 }}
      my={4}
      borderRadius="lg"
      shadow="md"
    >
      <Heading as="h3" size="lg">
        Settings
      </Heading>
      <Text color="gray.500" mt={2} mb={4}>
        Adjust your account settings, preferences, and more.
      </Text>

      {/* Account Details Section */}
      <VStack align="left" spacing="6" className="settings-config">
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="usageType">
            Are you using this website for?
          </FormLabel>
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
          <FormControl>
            <FormLabel htmlFor="businessName">
              Business Name (Optional)
            </FormLabel>
            <Input
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Enter your business name"
            />
          </FormControl>
        )}
      </VStack>
      <Box display="flex" flexDir="column" alignItems="left" gap="4" my="4">
        {/* Dark Mode Setting */}
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark-mode">
            Dark Mode
          </FormLabel>
          <Switch id="dark-mode" colorScheme="orange" />
        </FormControl>

        {/* Notifications Setting */}
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="notifications">
            Enable Notifications
          </FormLabel>
          <Switch id="notifications" colorScheme="orange" />
        </FormControl>
      </Box>

      {/* Expandable Section for Advanced Settings */}
      <Box mb={5}>
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
          transition: "0.2s ease-in",
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