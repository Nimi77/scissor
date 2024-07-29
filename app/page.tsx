"use client"

import React, { useState, useEffect } from "react";
import Header from "./components/header";
import Hero from "./components/hero";
import Features from "./components/features";
import Pricing from "./components/pricing";
import Footer from "./components/footer";
import LoadingSkeleton from "./components/loading";
import { Box } from "@chakra-ui/react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box bg="black" color="white">
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