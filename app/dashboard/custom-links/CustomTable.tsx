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
  Link,
  Box,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FiEdit, FiTrash } from "react-icons/fi";

interface Link {
  id: number;
  originalUrl: string;
  customUrl: string;
  createdAt: string;
}

interface CustomTableProps {
  links: Link[];
  onEditLink: (link: Link) => void;
  onDeleteLink: (id: number) => Promise<void>;
}

const CustomLinkTable: React.FC<CustomTableProps> = ({
  links,
  onEditLink,
  onDeleteLink,
}) => {
  const showIconOnly = useBreakpointValue({ base: true, lg: false });

  const toast = useToast();
  const handleCustomUrl = (e: React.MouseEvent) => {
    e.preventDefault();

    toast({
      title: "Premium Feature",
      description:
        "You have to buy a domain name. This is only available for premium users.",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top"
    });
  };

  return (
    <Box>
      <Table variant="striped" bgColor="white" className="cl-table">
        <Thead>
          <Tr className="l-thheading">
            <Th display={{ base: "none", lg: "table-cell" }}>Date</Th>
            <Th>Original URL</Th>
            <Th width={{ base: "160px", md: "auto" }}>Custom Url</Th>
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
              <Td title={link.customUrl}>
                <Link href="" onClick={handleCustomUrl}>
                  {link.customUrl}
                </Link>
              </Td>
              <Td>
                {showIconOnly ? (
                  <>
                    <Box className="s-buttons cl-btns">
                      <IconButton
                        aria-label="Edit"
                        icon={<FiEdit />}
                        variant="outline"
                        onClick={() => onEditLink(link)}
                      />
                      <IconButton
                        aria-label="Delete"
                        icon={<FiTrash />}
                        onClick={() => onDeleteLink(link.id)}
                        colorScheme="red"
                      />
                    </Box>
                  </>
                ) : (
                  <>
                    <Box className="l-btns cl-btns">
                      <Button
                        variant="outline"
                        onClick={() => onEditLink(link)}
                        leftIcon={<FiEdit />}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => onDeleteLink(link.id)}
                        colorScheme="red"
                        leftIcon={<FiTrash />}
                      >
                        Delete
                      </Button>
                    </Box>
                  </>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CustomLinkTable;