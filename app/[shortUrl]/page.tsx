"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner, Box, Text, Flex } from "@chakra-ui/react";
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
        console.log(
          "Making API request to:",
          `/api/shorten/${params.shortUrl}`
        );

        const response = await axios.get(`/api/shorten/${params.shortUrl}`, {
          maxRedirects: 0,
        });

        // If the API redirects to the home page, the router will handle it.
        if (response.request.responseURL !== window.location.href) {
          window.location.href = response.request.responseURL;
          return;
        }

        // Checking if the content type is JSON
        if (response.headers["content-type"].includes("application/json")) {
          const data = response.data;

          if (data.originalUrl) {
            console.log("Redirecting to:", data.originalUrl);

            setTimeout(() => {
              router.push(data.originalUrl);
            }, 2000);
          } else {
            console.error("No originalUrl in response data.");
            setError("Invalid URL.");
          }
        } else {
          setError("Invalid response from server.");
        }
      } catch (error) {
        setError("Please ensure the link shortened is correct, and try again...");
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
        <Flex alignItems="center" justifyContent="center">
          <Spinner size="sm" color="gray.900" mr="4" />
          <Text fontSize="lg" fontWeight="600">
            Loading, please wait...
          </Text>
        </Flex>
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
