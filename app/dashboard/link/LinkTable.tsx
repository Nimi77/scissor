"use client";

import React, { useEffect } from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  Thead,
  Link,
  Box,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";

interface Link {
  id: number;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  clickCount: number;
}

interface LinksTableProps {
  links: Link[];
  onDeleteLink: (id: number) => Promise<void>;
  refreshLinks: () => void;
}

const LinksTable: React.FC<LinksTableProps> = ({
  links,
  onDeleteLink,
  refreshLinks,
}) => {
  // Fetching the latest data when the page regains focus
  useEffect(() => {
    const handleFocus = () => {
      refreshLinks();
    };

    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refreshLinks]);

  return (
    <Box>
      <Table
        variant="striped"
        size={{ base: "sm", md: "auto" }}
        bgColor="transparent"
      >
        <Thead>
          <Tr>
            <Th display={{ base: "none", md: "table-cell" }}>Date</Th>
            <Th>Original URL</Th>
            <Th>Shortened Url</Th>
            <Th>Clicks</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {links.map((link) => (
            <Tr key={link.id}>
              <Td display={{ base: "none", md: "table-cell" }}>
                {new Date(link.createdAt).toLocaleDateString()}
              </Td>
              <Td
                title={link.originalUrl}
                maxW={{ base: "150px", md: "300px", lg: "auto" }}
              >
                {link.originalUrl}
              </Td>
              <Td
                title={link.shortUrl}
                maxW={{ base: "150px", md: "300px", lg: "auto" }}
              >
                <Link href={link.shortUrl} fontSize="md" isExternal>
                  {link.shortUrl}
                </Link>
              </Td>
              <Td>{link.clickCount}</Td>
              <Td>
                <IconButton
                  aria-label="Delete"
                  icon={<FiTrash />}
                  onClick={() => onDeleteLink(link.id)}
                  colorScheme="red"
                  display={{ base: "block", md: "none" }}
                />
                <Button
                  onClick={() => onDeleteLink(link.id)}
                  colorScheme="red"
                  leftIcon={<FiTrash />}
                  display={{ base: "none", md: "block" }}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default LinksTable;