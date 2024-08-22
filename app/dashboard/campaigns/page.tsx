"use client";

import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  IconButton,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { FaPlus, FaChartPie } from "react-icons/fa";

interface Campaign {
  id: number;
  name: string;
}

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const toast = useToast();

  const handleCreateCampaign = () => {
    const newCampaign = {
      id: campaigns.length + 1,
      name: `Campaign ${campaigns.length + 1}`,
    };
    setCampaigns([...campaigns, newCampaign]);
    toast({
      title: "Campaign Created",
      description: `Successfully created ${newCampaign.name}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
    toast({
      title: "Campaign Deleted",
      description: `Campaign ${id} has been deleted.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      bgColor="white"
      p={{ base: 4, md: 6 }}
      mx={{ base: "auto", md: 24 }}
      my={4}
      borderRadius="lg"
      shadow="md"
    >
      <Heading as="h3" size="lg" mb={6} textAlign={{base:"left", md:"center"}}>
        Analytics
      </Heading>
      <Text fontSize="md" color="gray.500" mb={6}>
        Track and manage your marketing campaigns.
      </Text>

      <Button
        leftIcon={<FaPlus />}
        bg="#FF4C24"
        color="white"
        _hover={{ bg: "#ED5734" }}
        onClick={handleCreateCampaign}
        mb={6}
      >
        Create New Campaign
      </Button>

      <VStack spacing={4} align="stretch">
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <Box
              key={campaign.id}
              w="full"
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              shadow="sm"
              aria-label={`Campaign ${campaign.name}`}
            >
              <HStack justify="space-between">
                <Text fontWeight="bold">{campaign.name}</Text>
                <HStack spacing={2}>
                  <IconButton
                    icon={<FaChartPie />}
                    aria-label={`View analytics for ${campaign.name}`}
                    bg="#FF4C24"
                    color="white"
                    _hover={{ bg: "#ED5734" }}
                  />
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    aria-label={`Delete ${campaign.name}`}
                    onClick={() => handleDeleteCampaign(campaign.id)}
                  >
                    Delete
                  </Button>
                </HStack>
              </HStack>
            </Box>
          ))
        ) : (
          <Text color="gray.500">No campaigns created yet.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default Campaigns;
