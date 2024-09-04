"use client";

import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Stack,
  useToast,
  Heading,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

const CustomForm: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [customDomain, setCustomDomain] = useState<string>("");
  const [customPath, setCustomPath] = useState<string>("");
  const [customUrl, setCustomUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

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

        setCustomUrl(data.shortened_url);

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
    } finally {
      setLoading(false);
    }
  };

  const handleCustomUrlClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpen();
  };

  return (
    <>
      <Box bgColor="white" p={{ base: 4, md: 6 }} borderRadius="lg" shadow="sm">
        <Box as="form" onSubmit={handleSave}>
          <Stack spacing={6}>
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
                placeholder="custompath"
              />
            </FormControl>

            {customUrl && (
              <Box mt={2}>
                <Heading as="h4" fontSize="lg" mb={2} fontWeight="600">
                  Custom URL
                </Heading>
                <Link href="" onClick={handleCustomUrlClick}>
                  {customUrl}
                </Link>
              </Box>
            )}

            <Button
              type="submit"
              color="white"
              borderRadius="lg"
              bg="#FF4C24"
              _hover={{
                transition: "0.2s ease-in",
                bg: "#ED5734",
              }}
              mt={7}
              isDisabled={loading}
            >
              {loading ? "Saving.." : "Save"}
            </Button>
          </Stack>
        </Box>
      </Box>
      {/* Modal for custom domain purchase */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", md: "lg" }}
        isCentered
      >
        <ModalOverlay bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(4px)" />
        <ModalContent m="auto">
          <ModalHeader pt={4} pb={0}>
            Buy a Domain
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text maxW-="24rem">
              Purchase your domain with linktrim. Expand your business link
              reach and establish a memorable online identity.
            </Text>
          </ModalBody>
          <ModalFooter pb="1.4rem">
            <Flex flex="1" alignItems="center" justifyContent="space-between">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                color="white"
                bg="#FF4C24"
                _hover={{
                  transition: "0.2s ease-in",
                  bg: "#ED5734"
                }}
                isDisabled
              >
                Buy
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomForm;