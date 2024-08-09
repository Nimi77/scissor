"use client";

import React, { useState, useEffect } from "react";
import Header from "./header";
import Hero from "./hero";
import Features from "./features";
import Pricing from "./pricing";
import Footer from "./footer";
import LoadingSkeleton from "./loading";
import { Box } from "@chakra-ui/react";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box bg="gray.900" color="white">
      <Header />
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <Box as="main">
          <Hero />
          <Features />
          <Pricing />
        </Box>
      )}
      <Footer />
    </Box>
  );
}
