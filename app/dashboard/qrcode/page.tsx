"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Alert,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { QRCode } from "react-qrcode-logo";
import { FaDownload } from "react-icons/fa";
import { BsShare } from "react-icons/bs";
import { isURL } from "validator";

const QRCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [error, setError] = useState("");

  const handleGenerateQRCode = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate URL
    if (!isURL(url)) {
      setError("Please enter a valid URL.");
      return;
    }

    setError("");
    // Set the QR code URL to the input URL
    setQrCodeUrl(url);
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById(
      "qr-code-canvas"
    ) as HTMLCanvasElement;
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${url.split("/").pop() || "qr-code"}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const shareQRCode = () => {
    if (navigator.share) {
      const canvas = document.getElementById(
        "qr-code-canvas"
      ) as HTMLCanvasElement;
      canvas.toBlob((blob) => {
        const file = new File([blob!], "qrcode.png", { type: "image/png" });

        navigator
          .share({
            title: "QR Code",
            text: "Here is your QR code",
            files: [file],
          })
          .catch((error) => console.log("Error sharing", error));
      });
    } else {
      setError("Sharing not supported on this browser.");
    }
  };

  return (
    <Flex
      maxW="xl"
      mx="auto"
      mt={8}
      p={4}
      bg="white"
      shadow="md"
      borderRadius="lg"
      direction="column"
    >
      <form onSubmit={handleGenerateQRCode}>
        <FormControl id="url" mb={4}>
          <FormLabel fontWeight="bold">Enter your URL</FormLabel>
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            focusBorderColor="#ED5734"
            isRequired
          />
        </FormControl>

        <Button
          type="submit"
          w="full"
          color="white"
          borderRadius="lg"
          bg="#FF4C24"
          _hover={{
            transition: "0.4s ease",
            boxShadow: "0 4px 12px rgba(237, 87, 52, 0.3)",
          }}
          mt={4}
        >
          Generate QR Code
        </Button>
      </form>

      {error && (
        <Alert status="error" mt={2}>
          {error}
        </Alert>
      )}

      {qrCodeUrl && (
        <Box
          mt={6}
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontWeight="600">QR Code:</Text>
          <Box>
            <QRCode id="qr-code-canvas" value={qrCodeUrl} size={200} />
          </Box>

          <HStack mt={4} spacing={4} justify="center">
            <Button
              color="#FF4C24"
              onClick={downloadQRCode}
              leftIcon={<FaDownload />}
            >
              Download
            </Button>
            <Button
              color="#FF4C24"
              onClick={shareQRCode}
              leftIcon={<BsShare />}
            >
              Share
            </Button>
          </HStack>
        </Box>
      )}
    </Flex>
  );
};

export default QRCodeGenerator;
