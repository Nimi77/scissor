"use client";

import { Box } from "@chakra-ui/react";
import Header from "../components/header";
import Hero from "../components/hero";
import Features from "../components/features";
import Pricing from "../components/pricing";
import Footer from "../components/footer";

export default function LandingPage() {
  return (
    <Box bg="black" color="white">
      <Header />
      <Box as="main">
        <Hero />
        <Features />
        <Pricing />
      </Box>
      <Footer />
    </Box>
  );
}
