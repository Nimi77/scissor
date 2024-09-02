import ChakraWrapper from "./chakra_ui/setup";
import AuthProvider from "@/app/lib/provider";
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linktrim - URL Shortening tool",
  description:
    "Shorten, customize, and track your URLs with linktrim. The ultimate tool for URL shortening, QR code generation, and link analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ChakraWrapper>{children}</ChakraWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
