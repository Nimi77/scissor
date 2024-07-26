"use client";

import React, { FormEvent, useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface SignInResponse {
  error?: string;
  status?: number;
  ok: boolean;
  url: string;
}

const LoginForm = () => {
  const [error, setError] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("Session status:", status);
    if (status === "authenticated") {
      console.log("User authenticated, redirecting to dashboard...");
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const response = (await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      })) as SignInResponse;

      console.log("login", response);
      if (response && response.ok) {
        router.push(response.url || "/dashboard");
      } else {
        // Handle login error
        console.error("Login failed", response.error);
      }
    } catch (error) {
      setError("Invalid Credentials");
      console.log(error);
    }
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
            Login
          </Heading>
          <Box my={6} width={{ base: "280px", lg: "26rem" }}>
            <form onSubmit={handleLogin} method="POST">
              <FormControl>
                <FormLabel
                  htmlFor="email"
                  fontSize={{ base: "md", md: "lg" }}
                  color="gray.900"
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

              <FormControl mt={{ base: 4, md: 6 }} mb={2}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FormLabel
                    htmlFor="password"
                    fontSize={{ base: "md", md: "lg" }}
                    color="gray.900"
                    m={0}
                  >
                    Password
                  </FormLabel>
                  <Link href="" color="#ED5734" className="forget-passkey">
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

              {error && <span> {error} </span>}

              <Button
                type="submit"
                w="100%"
                h="2.4rem"
                mt={4}
                fontWeight={600}
                fontSize={{ base: "md", md: "lg" }}
                color="white"
                bg="#FF4C24"
                borderRadius="lg"
                boxShadow="md"
                _hover={{
                  bg: "#ED5734",
                  transition: "all 0.3s ease",
                }}
                onClick={(e) => console.log("clicked")}
              >
                Login
              </Button>
            </form>
          </Box>

          <Box textAlign="center">
            <Text fontSize={{ base: "md", md: "lg" }}>
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

export default LoginForm;