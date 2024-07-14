"use client";

import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import { ReactNode } from "react";
import QrCode from "@/app/Assests/QrCode";

interface TemplateProps {
  icon: ReactNode;
  title: string;
  desc: string;
}
function Template({ icon, title, desc }: TemplateProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      alignItems="start"
      justifyItems="center"
      py="9"
      px="1.2rem"
      bg="#18181B"
      boxShadow={"0px 8px 24px 0px rgba(0,0,0,0.42)"}
      borderRadius="md"
      maxW={{ md: "lg", lg: "xl" }}
    >
      <Text as="span">{icon}</Text>
      <Text as="h3" fontSize={{ base: "md", md: "lg" }}>
        {title}
      </Text>
      <Text
        fontSize={{ base: "sm", md: ".9rem" }}
        lineHeight="1.7"
        color="#C8C8C8"
      >
        {desc}
      </Text>
    </Box>
  );
}
const templates = [
  {
    icon: <LinkIcon />,
    title: "Custom URLs",
    desc: "Create customizable URLs that not only mantain your brand consistency but also enhance user trust and recognition.",
  },
  {
    icon: <QrCode />,
    title: "QR Code Generation",
    desc: "Generate QR codes for your shortened URLs which provides a seamless way to share your links offline.",
  },
  {
    icon: <LinkIcon />,
    title: "Basic Analytics",
    desc: "Track your links performance and engagement comprehensively with linktrim's robust basic analytics tools.",
  },
];

const Features = () => {
  return (
    <Box id="features">
      <Container py={8} maxW={"6xl"}>
        <VStack align="left">
          <Heading
            as="h2"
            textAlign={"left"}
            fontSize={{ base: "lg", md: "xl" }}
            color="#ED5734"
            textTransform={"uppercase"}
          >
            Features
          </Heading>
          <Text
            py={2}
            fontSize={{ base: "sm", md: "md" }}
            maxW={{ base: "2xl", lg: "3xl" }}
          >
            A short link is a powerful tool when you use it carefully and it
            unlocks infinite possibilities. It is not just a link but a medium
            between your customer and there destination.
          </Text>
        </VStack>
        <SimpleGrid
          alignItems="center"
          columns={{ base: 1, md: 2, lg: 3 }}
          pt={9}
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
  );
};
export default Features;
