import Head from "next/head";
import Features from "./Components/Features";
import Hero from "./Components/Hero";
import Pricing from "./Components/Pricing";
import Footer from "./Components/Footer";

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Scissor - Welcome to the Best URL Shortener</title>
        <meta
          name="description"
          content="Welcome to Scissor, the ultimate URL shortener. Create short links, customize your URLs, and access detailed analytics all in one place."
        />
      </Head>
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </>
  );
}
