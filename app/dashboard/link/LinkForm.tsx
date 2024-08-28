"use client";

import React, { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { isURL } from "validator";
import axios from "axios";

interface LinkFormProps {
  onLinkCreated: (link: { originalUrl: string; shortUrl: string }) => void;
}

const LinkForm: React.FC<LinkFormProps> = ({ onLinkCreated }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
   
    if (!isURL(url)) {
      setError("Please enter a valid URL.");
      return;
    }
    setError("");
    setShortenedUrl("");
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/shorten",
        { url },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const newLink = { originalUrl: url, shortUrl: response.data.shortUrl };
        setShortenedUrl(response.data.shortUrl);
        onLinkCreated(newLink);
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (error) {
      setError("Error shortening URL, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Stack pb={6}>
        <FormControl isRequired>
          <FormLabel>Original URL</FormLabel>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            focusBorderColor="#ED5734"
            placeholder="Enter URL"
          />
        </FormControl>

        {error && <Box color="red.500" mt="2">{error}</Box>}

        {shortenedUrl && (
          <Box>
            <FormLabel>Shortened Url</FormLabel>
            <Input value={shortenedUrl}  focusBorderColor="#ED5734" isReadOnly />
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
            bg: "#ED5734"
          }}
        >
          {loading ? "Shortening" : "Shorten"}
        </Button>
      </Stack>
    </Box>
  );
};

export default LinkForm;