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
  Link,
  Box,
} from "@chakra-ui/react";
import { FiEdit, FiTrash } from "react-icons/fi";

interface Link {
  id: string;
  originalUrl: string;
  customUrl: string;
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
    <Box>
      <Table
        variant="striped"
        size={isMobile ? "sm" : "md"}
        bgColor="transparent"
      >
        <Thead>
          <Tr>
            <Th display={{ base: "none", md: "table-cell" }}>Date</Th>
            <Th>URL</Th>
            <Th>Custom Url</Th>
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
                maxW={{ base: "150px", md: "300px" }}
              >
                {link.originalUrl}
              </Td>
              <Td title={link.customUrl} maxW={{ base: "150px", md: "300px" }}>
                <Link href={link.customUrl} isExternal>
                  {link.customUrl}
                </Link>
              </Td>
              <Td>
                <Button
                  variant="outline"
                  onClick={() => onEditLink(link)}
                  leftIcon={<FiEdit />}
                  mr={2}
                  mb={{ base: 0, md: 4 }}
                >
                  {!isMobile && "Edit"}
                </Button>
                <Button
                  onClick={() => onDeleteLink(link.id)}
                  colorScheme="red"
                  leftIcon={<FiTrash />}
                >
                  {!isMobile && "Delete"}
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