"use client";

import React from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  Thead,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

interface Link {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
}

interface LinksTableProps {
  links: Link[];
  onEditLink: (link: Link) => void;
  onDeleteLink: (id: string) => Promise<void>;
}

const LinksTable: React.FC<LinksTableProps> = ({
  links,
  onEditLink,
  onDeleteLink,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Table variant="striped" size={isMobile ? 'sm' : 'md'}>
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>URL</Th>
          <Th>Shortened URL</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {links.map((link) => (
          <Tr key={link.id}>
            <Td>{new Date(link.createdAt).toLocaleString()}</Td>
            <Td>{link.originalUrl}</Td>
            <Td>{link.shortUrl}</Td>
            <Td>
              <Button onClick={() => onEditLink(link)} mr={2}>
                Edit
              </Button>
              <Button onClick={() => onDeleteLink(link.id)} colorScheme="red">
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default LinksTable;