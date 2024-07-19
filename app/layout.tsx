"use client";

import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import theme from "./theme";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Scissor - URL Shortening tool</title>
        <meta
          name="description"
          content="Shorten, customize, and track your URLs with scissor. The ultimate
          tool for URL shortening, QR code generation, and link analytics."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </body>
    </html>
  );
}
