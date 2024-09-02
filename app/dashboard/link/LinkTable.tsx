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
        bgColor="white"
        borderRadius="lg"
        className="links-table"
      >
        <Thead>
          <Tr className="l-thheading">
            <Th display={{ base: "none", lg: "table-cell" }} width="96px">
              Date
            </Th>
            <Th width={{ base: "160px", lg: "200px" }}>Original URL</Th>
            <Th width="110px">Short URL</Th>
            <Th textAlign="center">Clicks</Th>
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
              <Td display="flex" alignItems="center" justifyContent="center">
                <IconButton
                  aria-label="Delete"
                  icon={<FiTrash />}
                  onClick={() => onDeleteLink(link.id)}
                  colorScheme="red"
                  px=".8rem"
                  display={{ base: "flex", lg: "none" }}
                />
                <Button
                  onClick={() => onDeleteLink(link.id)}
                  colorScheme="red"
                  leftIcon={<FiTrash />}
                  display={{ base: "none", lg: "flex" }}
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