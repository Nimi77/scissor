"use client";

import React from "react";
import { Table, Tbody, Tr, Td, Th, Thead, Skeleton } from "@chakra-ui/react";

const LinkTableSkeleton: React.FC = () => {
  return (
    <Table variant="striped" size="md" bgColor="transparent">
      <Thead>
        <Tr>
          <Th>
            <Skeleton height="20px" />
          </Th>
          <Th>
            <Skeleton height="20px" />
          </Th>
          <Th>
            <Skeleton height="20px" />
          </Th>
          <Th>
            <Skeleton height="20px" />
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {Array.from({ length: 5 }).map((_, index) => (
          <Tr key={index}>
            <Td>
              <Skeleton height="20px" />
            </Td>
            <Td>
              <Skeleton height="20px" />
            </Td>
            <Td>
              <Skeleton height="20px" />
            </Td>
            <Td>
              <Skeleton height="20px" />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default LinkTableSkeleton;