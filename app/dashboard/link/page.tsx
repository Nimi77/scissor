"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import LinkForm from "./LinkForm";
import LinksTable from "./LinkTable";
import LinksTableSkeleton from "../components/TableSkeleton";

interface Link {
  id: number;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  clickCount: number;
}

const UserLinks: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const fetchLinks = async () => {
    try {
      const response = await axios.get("/api/urls", {
        headers: {
          "Cache-Control": "no-store",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch links");
      }

      const data = response.data.map((link: any) => ({
        id: link.id,
        originalUrl: link.original_url,
        shortUrl: link.short_url,
        createdAt: link.created_at,
        clickCount: link.click_count,
      }));

      console.log(data);
      setLinks(data);
    } catch (error) {
      console.error("Error fetching links:", error);
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleLinkCreated = (newLink: {
    originalUrl: string;
    shortUrl: string;
  }) => {
    const linkWithIdAndDate = {
      ...newLink,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      clickCount: 0,
    };

    setLinks((prevLinks) => [linkWithIdAndDate, ...prevLinks]);
    onClose();
  };

  const handleDeleteLink = async (id: number) => {
    try {
      const response = await axios.delete(`/api/urls/${id}`);

      if (response.status !== 200) {
        throw new Error("Failed to delete link");
      }
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
      onDeleteModalClose();
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const confirmDeleteLink = async (id: number): Promise<void> => {
    return new Promise((resolve) => {
      setLinkToDelete(id.toString());
      onDeleteModalOpen();
      resolve();
    });
  };

  return (
    <Box
      my={4}
      mx={{ base: "auto", lg: 6 }}
      p={{ base: 4, md: 6 }}
      aria-live="polite"
    >
      <Box>
        <Heading as="h3" size="lg" mb="2">
          Shorten Your Links
        </Heading>
        <Text color="gray.700">
          Easily shorten URLs and keep track of all shortened links. Click on
          the create link button to get started.
        </Text>
      </Box>

      <Button
        color="white"
        borderRadius="lg"
        bg="#FF4C24"
        _hover={{
          transition: "0.4s ease-in",
          bg: "#ED5734",
        }}
        _focus={{
          outline: "none",
        }}
        onClick={onOpen}
        mt={5}
        mb={8}
        aria-label="Create a new link"
      >
        Create Link
      </Button>

      {loading ? (
        <LinksTableSkeleton />
      ) : links.length === 0 && !loading ? (
        <Text color="gray.700">
          No links created yet. Start by creating a link!
        </Text>
      ) : (
        <LinksTable
          links={links}
          onDeleteLink={confirmDeleteLink}
          refreshLinks={fetchLinks}
        />
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", md: "lg" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent m="auto">
          <ModalHeader>Create New Link</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LinkForm onLinkCreated={handleLinkCreated} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        isCentered
        size={{ base: "sm", md: "lg" }}
      >
        <ModalOverlay />
        <ModalContent m="auto">
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>
            <Text textAlign="center">
              Are you sure you want to delete this link? This action cannot be
              undone.
            </Text>
          </ModalBody>
          <ModalFooter mt={4} justifyContent="center">
            <Flex gap={10} alignItems="center" justifyContent="center">
              <Button
                colorScheme="red"
                onClick={async () => {
                  await handleDeleteLink(Number(linkToDelete));
                  onDeleteModalClose();
                }}
              >
                Delete
              </Button>
              <Button variant="ghost" onClick={onDeleteModalClose}>
                Cancel
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserLinks;