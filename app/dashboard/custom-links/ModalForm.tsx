"use client"

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { isURL } from "validator";
import axios from "axios";

interface ModalFormProps {
  onLinkUpdated: (link: any) => void;
  linkToEdit: {
    id: number;
    originalUrl: string;
    customDomain?: string;
    customPath?: string;
    customUrl: string;
  };
}

const CustomLinkForm: React.FC<ModalFormProps> = ({
  onLinkUpdated,
  linkToEdit,
}) => {
  const [originalUrl, setOriginalUrl] = useState<string>(
    linkToEdit.originalUrl
  );
  const [customDomain, setCustomDomain] = useState<string>(
    linkToEdit.customDomain || ""
  );
  const [customPath, setCustomPath] = useState<string>(
    linkToEdit.customPath || ""
  );
  const [customUrl, setCustomUrl] = useState<string>(
    linkToEdit.customUrl || ""
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const toast = useToast();

  useEffect(() => {
    setOriginalUrl(linkToEdit.originalUrl);
    setCustomDomain(linkToEdit.customDomain || "");
    setCustomPath(linkToEdit.customPath || "");
    setCustomUrl(linkToEdit.customUrl || "");
  }, [linkToEdit]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log("Form submitted:", {
      originalUrl,
      customDomain,
      customPath,
      customUrl,
    });

    if (!isURL(originalUrl)) {
      setError("Please enter a valid URL.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      let fullCustomUrl = customDomain;
      if (customDomain) {
        fullCustomUrl = customPath
          ? `https://${customDomain}/${customPath}`
          : `https://${customDomain}`;
      }

      if (customDomain && !isURL(fullCustomUrl)) {
        setError("The custom domain or path is not valid.");
        return;
      }

      const response = await axios.patch(`/api/links/${linkToEdit.id}`, {
        originalUrl,
        customDomain,
        customPath,
      });

      console.log("Server response:", response.data);

      if (response.status === 200) {
        onLinkUpdated(response.data);
        setCustomUrl(fullCustomUrl);
        toast({
          title: "Success!",
          description: "Update successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        setError(response.data.message || "Something went wrong");
        console.log(
          "Error response status:",
          response.status,
          "Message:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error updating link:", error);
      setError("Error updating URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Stack spacing={5} pb={6}>
        <FormControl isRequired>
          <FormLabel>Original URL</FormLabel>
          <Input
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            focusBorderColor="#ED5734"
            placeholder="Enter URL"
            isReadOnly
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
          <FormLabel>Custom Path (Optional)</FormLabel>
          <Input
            value={customPath}
            onChange={(e) => setCustomPath(e.target.value)}
            focusBorderColor="#ED5734"
            placeholder="custompath"
          />
        </FormControl>

        {error && <Box color="red.500">{error}</Box>}

        {customUrl && (
          <Box>
            <FormLabel>Custom URL</FormLabel>
            <Input value={customUrl}  focusBorderColor="#ED5734" isReadOnly />
          </Box>
        )}

        <Button
          type="submit"
          color="white"
          borderRadius="lg"
          bg="#FF4C24"
          mt={4}
          _hover={{
            transition: "0.2s ease-in",
            bg: "#ED5734",
          }}
          isLoading={loading}
        >
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
};

export default CustomLinkForm;