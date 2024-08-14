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
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import LinkForm from "./LinkForm";
import LinksTable from "./LinkTable";

interface Link {
  id: string;
  originalUrl: string;
  customDomain?: string;
  customPath?: string;
  shortUrl: string;
  createdAt: string;
}

const UserLinks: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [linkToEdit, setLinkToEdit] = useState<Link | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch links data from the server
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get("/api/links", {
          headers: {
            "Cache-Control": "no-store",
          },
        });

        if (response.status !== 200) {
          throw new Error("Failed to fetch links");
        }

        const data: Link[] = response.data;
        setLinks(data);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    fetchLinks();
  }, []);

  const handleLinkCreated = (newLink: Link) => {
    setLinks((prevLinks) =>
      linkToEdit
        ? prevLinks.map((link) => (link.id === newLink.id ? newLink : link))
        : [...prevLinks, newLink]
    );
    setLinkToEdit(null);
    onClose();
  };

  const handleEditLink = (link: Link) => {
    setLinkToEdit(link);
    onOpen();
  };

  const handleDeleteLink = async (id: string) => {
    if (confirm("Are you sure you want to delete this link?")) {
      try {
        const response = await axios.delete(`/api/links/${id}`);

        if (response.status !== 200) {
          throw new Error("Failed to delete link");
        }

        setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
      } catch (error) {
        console.error("Error deleting link:", error);
      }
    }
  };

  return (
    <Box
      bg="white"
      shadow="md"
      p={6}
      rounded="lg"
      maxW="xl"
      mx="auto"
      mt={8}
      aria-live="polite"
      role="main"
    >
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Manage Your Links
      </Heading>

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
          boxShadow: "0 0 0 3px rgba(255, 76, 36, 0.6)",
        }}
        onClick={onOpen}
        mb={4}
        aria-label="Create a new link"
      >
        Create New Link
      </Button>

      <LinksTable
        links={links}
        onEditLink={handleEditLink}
        onDeleteLink={handleDeleteLink}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {linkToEdit ? "Edit Link" : "Create New Link"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LinkForm
              onLinkCreated={handleLinkCreated}
              linkToEdit={linkToEdit}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserLinks;
