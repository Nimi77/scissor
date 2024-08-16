"use client";

import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  useToast,
  Container,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";

const CustomURL: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [customDomain, setCustomDomain] = useState<string>("");
  const [customPath, setCustomPath] = useState<string>("");
  const [customUrl, setCustomUrl] = useState<string>("");
  const toast = useToast();

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/links/create", {
        originalUrl,
        customDomain,
        customPath,
      });

      if (response.status === 200) {
        const data = response.data;

        toast({
          title: "Success!",
          description: "Link saved successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        // Display the custom URL to the user
        setCustomUrl(data.shortened_url);

        // Reset the form
        setOriginalUrl("");
        setCustomDomain("");
        setCustomPath("");
      } else {
        throw new Error(response.data.message || "Failed to save link");
      }
    } catch (error) {
      console.error("Error saving link:", error);
      toast({
        title: "Error!",
        description: "Failed to save link.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Container centerContent maxW="3xl">
      <Box bg="white" shadow="md" p={6} rounded="lg" w="full">
        <Heading as="h3" size="lg" mb={6} textAlign="center">
          Create a Custom Link
        </Heading>
        <Box as="form" onSubmit={handleSave}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>URL</FormLabel>
              <Input
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                focusBorderColor="#ED5734"
                placeholder="Enter URL"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Custom Domain</FormLabel>
              <Input
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                focusBorderColor="#ED5734"
                placeholder="mycustomdomain.com"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Custom Path</FormLabel>
              <Input
                value={customPath}
                onChange={(e) => setCustomPath(e.target.value)}
                focusBorderColor="#ED5734"
                placeholder="custom-path"
              />
            </FormControl>

            {customUrl && (
              <FormControl>
                <FormLabel>Custom URL</FormLabel>
                <Input value={customUrl} isReadOnly />
              </FormControl>
            )}

            <Button
              type="submit"
              w="full"
              color="white"
              borderRadius="lg"
              bg="#FF4C24"
              _hover={{
                transition: "0.2s ease-in-out",
                bg: "#ED5734",
              }}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default CustomURL;
