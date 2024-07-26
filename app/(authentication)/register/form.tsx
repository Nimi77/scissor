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
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [status, setStatus] = useState<
    "idle" | "registering" | "success" | "redirecting" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  // Handle form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");
    setErrorMessage("");

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      // Try to register user
      setStatus("registering");

      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const registerData = await response.json();

      if (response.ok) {
        setStatus("success");

        setTimeout(() => {
          setStatus("redirecting");
          setTimeout(() => {
            router.push("/login");
          }, 2000); // 2 seconds to read the redirect message
        }, 2000);
      } else {
        setErrorMessage(
          registerData.error || "An error occurred during registration"
        );
        setStatus("error");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred");
      setStatus("error");
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
            Register
          </Heading>
          <Box my={6} width={{ base: "280px", lg: "26rem" }}>
            <form onSubmit={handleSubmit} method="POST">
              <FormControl>
                <FormLabel
                  htmlFor="email"
                  fontSize={{ base: "md", md: "lg" }}
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

              <FormControl mt={{ base: 4 }} mb={2}>
                <FormLabel
                  htmlFor="password"
                  fontSize={{ base: "md", md: "lg" }}
                  color={useColorModeValue("gray.900", "gray.100")}
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

              {status !== "idle" && (
                <Box className="text-left italic">
                  {status === "registering" && (
                    <Box
                      display="flex"
                      alignItems="left"
                      className="text-green-400"
                    >
                      <Spinner size="sm" mr={2} />{" "}
                      <span>Registering user...</span>
                    </Box>
                  )}
                  {status === "success" && (
                    <Box className="text-green-500">
                      <span>User registration successful</span>
                    </Box>
                  )}
                  {status === "redirecting" && (
                    <Box className="text-green-500">
                      <span>Redirecting to login page...</span>
                    </Box>
                  )}
                  {status === "error" && (
                    <Box className="text-red-500">
                      <span>{errorMessage}</span>
                    </Box>
                  )}
                </Box>
              )}

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
              >
                Register
              </Button>
            </form>
          </Box>

          <Box textAlign="center">
            <Text>
              Already have an account?{" "}
              <Link href="/login" color="#ED5734" className="login-link">
                Login
              </Link>
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default RegisterForm;
