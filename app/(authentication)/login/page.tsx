"use client";

import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";

const Login = () => {
  return (
    <Box
      display="grid"
      h="100vh"
      placeItems="center"
      alignItems="center"
      bg="white"
    >
      <Box maxW="3xl" w="450px" h="450px" className="login-wrapper">
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
            Login
          </Heading>
          <Box my={4}>
            <form action="" method="POST">
              <FormControl>
                <FormLabel
                  htmlFor="email"
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
                  w="100%"
                  focusBorderColor="#ED5734"
                  placeholder="Email address"
                />
              </FormControl>

              <FormControl>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FormLabel
                    htmlFor="password"
                    color={useColorModeValue("gray.900", "gray.100")}
                  >
                    Password
                  </FormLabel>
                  <Link href="" color="#ED5734" className="text-semibold text-md" >
                    Forgot password?
                  </Link>
                </Box>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  focusBorderColor="#ED5734"
                  placeholder="Password"
                  mt={2}
                />
              </FormControl>
              
              <Button
                type="submit"
                w="100%"
                h="2.4rem"
                my="4"
                fontWeight={600}
                color="white"
                bg="#FF4C24"
                borderRadius="lg"
                boxShadow="md"
                _hover={{
                  bg: "#ED5734",
                  transition: "all 0.3s ease",
                }}
              >
                Login
              </Button>
            </form>
          </Box>

          <Box textAlign="center">
            <Text>
              Don&apos;t have an account?{" "}
              <Link href="/register" color="#ED5734" className="register-link">
                Sign Up
              </Link>
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Login;
