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
} from "@chakra-ui/react";
import axios from "axios";
import LinkForm from "./LinkForm";
import LinksTable from "./LinkTable";
import LinksTableSkeleton from "./LinkTableSkeleton";

interface Link {
  id: string;
  originalUrl: string;
  customDomain?: string;
  customPath?: string;
  customUrl: string;
  createdAt: string;
}

const UserLinks: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [linkToEdit, setLinkToEdit] = useState<Link | null>(null);
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

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
  
        const data = response.data.map((link: any) => ({
          id: link.id,
          originalUrl: link.original_url,
          customUrl: link.shortened_url,
          createdAt: link.created_at,
        }));
  
        console.log(data);
        setLinks(data);
      } catch (error) {
        console.error("Error fetching links:", error);
      } finally {
        setTimeout(() => setLoading(false), 2000);
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
    try {
      const response = await axios.delete(`/api/links/${id}`);

      if (response.status !== 200) {
        throw new Error("Failed to delete link");
      }

      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
      onDeleteModalClose();
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const confirmDeleteLink = async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setLinkToDelete(id);
      onDeleteModalOpen();
      resolve();
    });
  };

  return (
    <Box
      bg="white"
      my={4}
      mx={{ md: "auto", lg: 12 }}
      p={{ base: 4, md: 6 }}
      shadow="base"
      rounded="lg"
      aria-live="polite"
    >
      <Heading as="h3" size="lg">
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
          boxShadow: "md",
        }}
        onClick={onOpen}
        my={6}
        aria-label="Create a new link"
      >
        Create Link
      </Button>

      {loading ? (
        <LinksTableSkeleton />
      ) : (
        <LinksTable
          links={links}
          onEditLink={handleEditLink}
          onDeleteLink={confirmDeleteLink}
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

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        isCentered
        size={{ base: "sm", md: "lg" }}
      >
        <ModalOverlay />
        <ModalContent m="auto">
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete this link? This action cannot be
              undone.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={async () => {
                await handleDeleteLink(linkToDelete!);
                onDeleteModalClose();
              }}
              mr={3}
            >
              Delete
            </Button>
            <Button variant="ghost" onClick={onDeleteModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserLinks;