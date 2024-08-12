import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
  Text,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useClipboard,
  Stack,
  Link,
} from "@chakra-ui/react";
import { isURL } from "validator";
import { LinkIcon } from "@chakra-ui/icons";
import { BeatLoader } from "react-spinners";
import { PiCopy } from "react-icons/pi";
import { BsShare } from "react-icons/bs";

const UrlShortenForm: React.FC = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const { hasCopied, onCopy } = useClipboard(shortenedUrl);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    //validating Url
    if (!isURL(url)) {
      setError("Please enter a valid URL.");
      return;
    }
    setError("");
    setShortenedUrl("");
    setLoading(true);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortenedUrl(data.shortUrl);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      setError("Error Shortening Url");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    onCopy();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Shortened Url",
        text: "Shortened link",
        url: shortenedUrl,
      });
    } else {
      console.log("Web Share Api is not supported in this browser");
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit}>
      <FormControl isInvalid={!!error}>
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <InputGroup maxW="4xl" size="lg" className="input-glow">
            <InputLeftElement pointerEvents="none">
              <LinkIcon aria-hidden="true" />
            </InputLeftElement>
            <Input
              type="text"
              border="none"
              borderColor="transparent"
              bg="#090B0E"
              placeholder="Paste a link to shorten it"
              aria-label="Paste a link to shorten it"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              _focus={{
                borderColor: "#ED5734",
              }}
            />
            <InputRightElement mr="1.76rem">
              <Button
                type="submit"
                bg="#FF4C24"
                color="white"
                px="3rem"
                fontSize="lg"
                _hover={{
                  bg: "#ED5734",
                  transition: "all 0.3s ease",
                }}
                isLoading={loading}
                spinner={<BeatLoader size={8} color="white" />}
                aria-label="Shorten"
              >
                Shorten
              </Button>
            </InputRightElement>
          </InputGroup>
          {error && (
            <FormErrorMessage mt={4} fontSize="lg">
              {error}
            </FormErrorMessage>
          )}
        </Flex>
      </FormControl>
      {shortenedUrl && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={3}
          mx="auto"
          mt={4}
          py={2}
          px={4}
          bg="#18181B"
          color="gray.200"
          borderRadius="md"
          aria-live="assertive"
          aria-atomic="true"
        >
          <Text fontSize="lg" fontWeight="bold">
            <Link
              href={shortenedUrl}
              textDecoration="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortenedUrl}
            </Link>
          </Text>
          <Stack direction="row" alignItems="center" justify="center">
            <Button
              onClick={handleCopy}
              variant="outline"
              bgColor="transparent"
              color="gray.200"
              w="5rem"
              h="2.4rem"
              _hover={{
                bg: "#2A2A2A",
                transition: "all ease",
              }}
            >
              <Flex alignItems="center" fontSize="lg">
                {hasCopied ? "Copied" : "Copy"}
                {!hasCopied && (
                  <span className="flex justify-center items-center h-8 w-8">
                    <PiCopy />
                  </span>
                )}
              </Flex>
            </Button>
            <Button
              variant="ghost"
              onClick={handleShare}
              _hover={{
                bg: "#2A2A2A",
                transition: "all ease",
              }}
              ml="-8px"
            >
              <span className="flex justify-center items-center">
                <BsShare />
              </span>
            </Button>
          </Stack>
        </Box>
      )}
    </VStack>
  );
};
export default UrlShortenForm;
