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
      maxW="2xl"
      mx="auto"
      p={4}
      bg="white"
      shadow="md"
      borderRadius="lg"
      direction="column"
      role="main"
      aria-labelledby="qr-form-heading"
    >
      <form onSubmit={handleGenerateQRCode}>
        <FormControl id="url" mb={4} isRequired>
          <FormLabel fontWeight="bold" id="qr-form-heading">
            Enter your URL
          </FormLabel>
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            focusBorderColor="#ED5734"
            aria-describedby="url-description"
            aria-required="true"
          />
          <Text id="url-description" mt={2} fontSize="sm" color="gray.600">
            Please enter a valid URL to generate a QR code.
          </Text>
        </FormControl>

        <Button
          type="submit"
          w="full"
          color="white"
          borderRadius="lg"
          bg="#FF4C24"
          _hover={{
            transition: "0.4s ease-in",
            bg: "#ED5734"
          }}
          _focus={{
            outline: "none",
            boxShadow: "0 0 0 3px rgba(255, 76, 36, 0.6)",
          }}
          mt={4}
          aria-label="Generate QR Code"
        >
          Generate QR Code
        </Button>
      </form>

      {error && (
        <Alert status="error" mt={2} role="alert">
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
          <Text fontWeight="600" id="qr-code-label">
            QR Code
          </Text>
          <Box>
            <QRCode
              id="qr-code-canvas"
              value={qrCodeUrl}
              size={200}
              aria-labelledby="qr-code-label"
            />
          </Box>

          <HStack mt={4} spacing={4} justify="center">
            <Button
              color="#FF4C24"
              onClick={downloadQRCode}
              leftIcon={<FaDownload />}
              aria-label="Download QR Code"
              _focus={{
                outline: "none",
                boxShadow: "0 0 0 3px rgba(255, 76, 36, 0.6)",
              }}
            >
              Download
            </Button>
            <Button
              color="#FF4C24"
              onClick={shareQRCode}
              leftIcon={<BsShare />}
              aria-label="Share QR Code"
              _focus={{
                outline: "none",
                boxShadow: "0 0 0 3px rgba(255, 76, 36, 0.6)",
              }}
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
