"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner, Box, Text } from "@chakra-ui/react";
import axios from "axios";

export default function RedirectPage({
  params,
}: {
  params: { shortUrl: string };
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log("params.shortUrl:", params.shortUrl);

    const fetchOriginalUrl = async () => {
      console.log("Starting fetchOriginalUrl with shortUrl:", params.shortUrl);

      try {
        console.log(
          "Making API request to:",
          `/api/shorten/${params.shortUrl}`
        );
        const response = await axios.get(`/api/shorten/${params.shortUrl}`);
        console.log("Received API response:", response);

        const data = response.data;
        console.log("Data from API response:", data);

        if (data.originalUrl) {
          console.log("Redirecting to:", data.originalUrl);

          // A delay to show the redirect message
          setTimeout(() => {
            router.push(data.originalUrl);
          }, 1000);
        } else {
          console.error("No originalUrl in response data.");
          setError("Invalid or expired URL.");
        }
      } catch (error) {
        console.error("Error occurred while fetching original URL:", error);
        setError("An error occurred while redirecting...");
      } finally {
        setLoading(false);
      }
    };

    if (params.shortUrl) {
      fetchOriginalUrl();
    }
  }, [params.shortUrl, router]);

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="100vh"
      >
        <Spinner size="xl" color="gray.900" />
        <Text mt={4} fontSize="lg">
          Redirecting to page...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="100vh"
      >
        <Text color="red.500" fontSize="lg">
          {error}
        </Text>
      </Box>
    );
  }

  // Return null since the user is redirected
  return null;
}