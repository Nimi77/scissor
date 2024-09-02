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
  Text,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import CustomLinkForm from "./ModalForm";
import LinkTableSkeleton from "../components/TableSkeleton";
import CustomLinkTable from "./CustomTable";
import CustomForm from "./CustomForm";

interface Link {
  id: number;
  originalUrl: string;
  customDomain?: string;
  customPath?: string;
  customUrl: string;
  createdAt: string;
}

const CustomLink: React.FC = () => {
  const [showTable, setShowTable] = useState<boolean>(false);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [linkToEdit, setLinkToEdit] = useState<Link | null>(null);
  const [linkToDelete, setLinkToDelete] = useState<number | null>(null);

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
          customDomain: link.custom_domain,
          customPath: link.custom_path,
        }));

        setLinks(data);
      } catch (error) {
        console.error("Error fetching links:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleLinkUpdated = (newLink: Link) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === newLink.id ? { ...link, ...newLink } : link
      )
    );

    console.log("Updated Links Array:", links);
    setLinkToEdit(null);
    onClose();
  };

  const handleEditLink = (link: Link) => {
    setLinkToEdit(link);
    onOpen();
  };

  const handleDeleteLink = async (id: number) => {
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

  const confirmDeleteLink = async (id: number): Promise<void> => {
    return new Promise((resolve) => {
      setLinkToDelete(id);
      onDeleteModalOpen();
      resolve();
    });
  };

  return (
    <Box my={4} mx={{ base: "auto", md: 6 }}>
      <CustomForm />

      <Button
        my={6}
        variant="link"
        onClick={() => setShowTable(!showTable)}
      >
        {showTable ? "Hide Custom Links Table" : "Show Custom Links Table"}
      </Button>

      {showTable && (
        <Box>
          {loading ? (
            <LinkTableSkeleton />
          ) : links.length === 0 ? (
            <Text>No link created yet. Start by creating a link!</Text>
          ) : (
            <CustomLinkTable
              links={links}
              onEditLink={handleEditLink}
              onDeleteLink={confirmDeleteLink}
            />
          )}
        </Box>
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", md: "lg" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent m="auto">
          <ModalHeader>Edit Custom Url</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {linkToEdit && (
              <CustomLinkForm
                onLinkUpdated={handleLinkUpdated}
                linkToEdit={linkToEdit}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        isCentered
        size={{ base: "sm", md: "lg" }}
      >
        <ModalOverlay />
        <ModalContent m="auto">
          <ModalHeader p={0} textAlign="center">
            Confirm Delete
          </ModalHeader>
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
                mr={3}
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

export default CustomLink;