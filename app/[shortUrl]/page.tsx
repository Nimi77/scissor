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
    const fetchOriginalUrl = async () => {
      try {
        // Fetching the original URL based on the shortUrl
        const response = await axios.get(`/api/shorten/${params.shortUrl}`);
        const data = response.data;

        if (data.originalUrl) {
          console.log("Redirecting to:", data.originalUrl);
          // A delay to show the redirect message
          setTimeout(() => {
            router.push(data.originalUrl);
          }, 1000);
        } else {
          setError("Invalid or expired URL.");
        }
      } catch (error) {
        setError("An error occurred while redirecting...");
      } finally {
        setLoading(false);
      }
    };

    fetchOriginalUrl();
  }, [params.shortUrl, router]);

  if (loading) {
    return (
      <Box textAlign="center" mt="20%">
        <Spinner size="xl" color="gray.900" />
        <Text mt={4} fontSize="lg">
          Redirecting to page...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt="20%">
        <Text color="red.500" fontSize="lg">
          {error}
        </Text>
      </Box>
    );
  }

  // Return null since the user is redirected
  return null;
}