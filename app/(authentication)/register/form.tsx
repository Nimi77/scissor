"use client";

import {
  Box,
  Flex,
  Text,
  Heading,
  Input,
  Button,
  FormLabel,
  FormControl,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { FormEvent } from "react";

const RegisterForm = () => {
  //handles form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    console.log({response})
  };

  return (
    <Box
      display="grid"
      h="100vh"
      placeItems="center"
      alignItems="center"
      bg="white"
    >
      <Box maxW="md" className="login-wrapper">
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          w="100%"
          h="100%"
          color="black"
          className="container"
        >
          <Heading as="h2" fontSize="3xl" textAlign="center">
            Register
          </Heading>
          <Box my={6} width={{ base: "280px", lg: "26rem" }}>
            <form onSubmit={handleSubmit} method="POST">
              <FormControl>
                <FormLabel
                  htmlFor="email"
                  fontSize={{base:"md", md:"lg"}}
                  color={useColorModeValue("gray.900", "gray.100")}
                >
                  Email address
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  focusBorderColor="#ED5734"
                  placeholder="Email address"
                />
              </FormControl>

              <FormControl mt={{ base: 4, md: 6 }} mb={8}>
                <FormLabel
                  htmlFor="password"
                  fontSize={{base:"md", md:"lg"}}
                  color={useColorModeValue("gray.900", "gray.100")}
                  m={0}
                  p={0}
                >
                  Password
                </FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  focusBorderColor="#ED5734"
                  placeholder="Password"
                />
              </FormControl>

              <Button
                type="submit"
                w="100%"
                h="2.4rem"
                fontWeight={600}
                fontSize={{base:"md", md:"lg"}}
                color="white"
                bg="#FF4C24"
                borderRadius="lg"
                boxShadow="md"
                _hover={{
                  bg: "#ED5734",
                  transition: "all 0.3s ease",
                }}
              >
                Register
              </Button>
            </form>
          </Box>

          <Box textAlign="center">
            <Text>
              Already have an account?{" "}
              <Link href="/login" color="#ED5734" className="login-link">
                Sign In
              </Link>
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
export default RegisterForm;