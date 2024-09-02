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
    <Box borderWidth="1px" borderRadius="lg">
      <Table
        variant="striped"
        size={{ base: "sm", md: "auto" }}
        bgColor="white"
        borderRadius="lg"
        className="links-table"
      >
        <Thead>
          <Tr className="l-thheading">
            <Th display={{ base: "none", lg: "table-cell" }}>Date</Th>
            <Th>Original URL</Th>
            <Th>Shortened URL</Th>
            <Th>Clicks</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {links.map((link) => (
            <Tr key={link.id} className="l-tbbody">
              <Td display={{ base: "none", lg: "table-cell" }}>
                {new Date(link.createdAt).toLocaleDateString()}
              </Td>
              <Td title={link.originalUrl}>
                <Link href={link.originalUrl} isExternal>
                  {link.originalUrl}
                </Link>
              </Td>
              <Td title={link.shortUrl}>
                <Link href={link.shortUrl} isExternal>
                  {link.shortUrl}
                </Link>
              </Td>
              <Td textAlign="center">{link.clickCount}</Td>
              <Td>
                <IconButton
                  aria-label="Delete"
                  icon={<FiTrash />}
                  onClick={() => onDeleteLink(link.id)}
                  colorScheme="red"
                  display={{ md: "flex", lg: "none" }}
                />
                <Button
                  onClick={() => onDeleteLink(link.id)}
                  colorScheme="red"
                  leftIcon={<FiTrash />}
                  display={{ md: "none", lg: "flex" }}
                  className="ll-btn"
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