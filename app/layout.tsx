import ChakraWrapper from "./chakra_ui/setup";
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linktrim - URL Shortening tool",
  description: "Shorten, customize, and track your URLs with scissor. The ultimate tool for URL shortening, QR code generation, and link analytics."
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ChakraWrapper>{children}</ChakraWrapper>
      </body>
    </html>
  );
}
