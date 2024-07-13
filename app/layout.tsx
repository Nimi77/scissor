"use client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./Theme";
import "./globals.css";
import Head from "next/head";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Scissor - URL Shortening Made Simple</title>
        <meta name="description" content="Scissor is a powerful URL shortening tool that allows you to create custom short links, generate QR codes, and track analytics with ease." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
