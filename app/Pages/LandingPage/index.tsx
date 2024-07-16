"use client"

import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Features from "./Components/Features";
import Pricing from "./Components/Pricing";
import Footer from "./Components/Footer";
import { Box } from "@chakra-ui/react";

export default function LandingPage() {
  return (
    <>
      <Header />
      <Box as="main">
        <Hero />
        <Features />
        <Pricing />
      </Box>
      <Footer />
    </>
  );
}
