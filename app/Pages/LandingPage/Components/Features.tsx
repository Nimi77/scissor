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
      py="1.4rem"
      px="1.2rem"
      bg="#090B0E"
      boxShadow={"0px 8px 24px 0px rgba(0,0,0,0.42000000000000004)"}
      borderRadius="md"
      maxW={{ md: "lg", lg: "xl" }}
    >
      <Text as="span">{icon}</Text>
      <Text as="h3" fontSize={{base:"md", md:"lg"}}>
        {title}
      </Text>
      <Text fontSize={{ base: "sm", md: ".9rem" }} color="#c8c8c8">
        {desc}
      </Text>
    </Box>
  );
}
const templates = [
  {
    icon: <LinkIcon />,
    title: "Custom URLs",
    desc: "Create customizable URLs that not only mantain your brand consistency but also enhance user trust and recognition, making it easier for your audience to remember and share your links.",
  },
  {
    icon: <LinkIcon />,
    title: "QR Code Generation",
    desc: "Generate QR codes for your shortened URLs which provides a seamless way to share your links offline and enabling easy access for users through quick scans, on printed materials or digital screens.",
  },
  {
    icon: <LinkIcon />,
    title: "Basic Analytics",
    desc: "Track your links performance and engagement comprehensively with linktrim's robust basic analytics tools, giving you valuable insights and overall effectiveness of your links.",
  },
];

export default function Features() {
  return (
    <Box id="features">
      <Container py={8} maxW={"6xl"}>
        <VStack align="left">
          <Heading
            as="h2"
            textAlign={"left"}
            fontSize={{base:"lg", md:"xl"}}
            bgGradient="linear-gradient(0deg, #C5100E, #ED5734)"
            bgClip="text"
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
          pt={4}
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
}
