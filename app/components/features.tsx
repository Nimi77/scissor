"use client";

import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { AttachmentIcon} from "@chakra-ui/icons";
import { ReactNode } from "react";
import AnalyticsIcon from "@/public/analytic.svg";
import QRCodeIcon from "@/public/qr_code.svg";

interface TemplateProps {
  icon: ReactNode;
  title: string;
  desc: string;
}

function Template({ icon, title, desc }: TemplateProps) {
  return (
    <Box
      role="article"
      display="flex"
      flexDirection="column"
      alignItems="start"
      py="7"
      px={4}
      bg="#18181B"
      boxShadow={"0px 8px 24px 0px rgba(0,0,0,0.42)"}
      borderRadius="lg"
      maxW={{ md: "lg", lg: "xl" }}
      aria-labelledby={`${title}-heading`}
    >
      <Icon as="span" aria-hidden="true">
        {icon}
      </Icon>
      <Text
        as="h3"
        id={`${title}-heading`}
        pt={4}
        pb={2}
      >
        {title}
      </Text>
      <Text fontSize="1rem" color="#C8C8C8">
        {desc}
      </Text>
    </Box>
  );
}

const templates = [
  {
    icon: <AttachmentIcon aria-label="Attachment icon" />,
    title: "Custom URLs",
    desc: "Create customizable URLs that not only maintain your brand consistency but also enhance user trust and recognition.",
  },
  {
    icon: <QRCodeIcon aria-label="QRCode icon" />,
    title: "QR Code Generation",
    desc: "Generate QR codes for your shortened URLs which provides a seamless way to share your links offline on different platforms.",
  },
  {
    icon: <AnalyticsIcon aria-label="Analytics icon" />,
    title: "Basic Analytics",
    desc: "Track your links performance and engagement comprehensively with linktrim's robust basic analytics tools.",
  },
];

const Features = () => {
  return (
    <Box id="features" role="region" aria-labelledby="features-heading">
      <Container maxW={"6xl"}>
        <VStack align="left">
          <Heading
            as="h2"
            id="features-heading"
            textAlign={"left"}
            fontSize="xl"
            color="#ED5734"
            textTransform={"uppercase"}
          >
            Features
          </Heading>
          <Text
            py={2}
            maxW={{ base: "2xl", lg: "3xl" }}
           
          >
            A short link is a powerful tool when you use it carefully and it
            unlocks infinite possibilities. It is not just a link but a medium
            between your customer and their destination.
          </Text>
        </VStack>
        <SimpleGrid
          alignItems="center"
          columns={{ base: 1, md: 2, lg: 3 }}
          pt={8}
          spacing={8}
        >
          {templates.map((template, index) => (
            <Template
              key={index}
              icon={template.icon}
              title={template.title}
              desc={template.desc}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
export default Features;
