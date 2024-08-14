"use client";

import React, { useState } from "react";
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

interface LinkFormProps {
  onLinkCreated: (link: any) => void;
  linkToEdit?: {
    id: string;
    originalUrl: string;
    customDomain?: string;
    customPath?: string;
    shortUrl: string;
  } | null;
}

const LinkForm: React.FC<LinkFormProps> = ({ onLinkCreated, linkToEdit }) => {
  const [originalUrl, setOriginalUrl] = useState<string>(
    linkToEdit?.originalUrl || ""
  );
  const [customDomain, setCustomDomain] = useState<string>(
    linkToEdit?.customDomain || ""
  );
  const [customPath, setCustomPath] = useState<string>(
    linkToEdit?.customPath || ""
  );
  const [shortenedUrl, setShortenedUrl] = useState<string>(
    linkToEdit?.shortUrl || ""
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate the original URL
    if (!isURL(originalUrl)) {
      setError("Please enter a valid URL.");
      return;
    }

    setError("");
    setShortenedUrl("");
    setLoading(true);

    try {
      const response = await axios({
        method: linkToEdit ? "PATCH" : "POST",
        url: linkToEdit ? `/api/links/${linkToEdit.id}` : "/api/shorten",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          url: originalUrl,
          customDomain,
          customPath,
        },
      });

      if (response.status === 200) {
        if (!linkToEdit) {
          setShortenedUrl(response.data.shortUrl);
        }
        onLinkCreated(response.data);
        toast({
          title: "Success!",
          description: "Link saved successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error saving link:", error);
      setError("Error shortening URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
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
          <FormLabel>Custom Domain (Optional)</FormLabel>
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
            placeholder="/custompath"
          />
        </FormControl>

        {error && <Box color="red.500">{error}</Box>}

        {shortenedUrl && (
          <Box>
            <FormLabel>Shortened URL</FormLabel>
            <Input value={shortenedUrl} isReadOnly />
          </Box>
        )}

        <Button
          type="submit"
          color="white"
          borderRadius="lg"
          bg="#FF4C24"
          _hover={{
            transition: "0.3s ease-in-out",
            bg: "#ED5734",
          }}
          isLoading={loading}
        >
          {linkToEdit ? "Save" : "Create Link"}
        </Button>
      </Stack>
    </Box>
  );
};

export default LinkForm;
