import Header from "./components/header";
import Hero from "./components/hero";
import Features from "./components/features";
import Pricing from "./components/pricing";
import Footer from "./components/footer";
import { Box } from "@chakra-ui/react";

export default function Home() {
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
