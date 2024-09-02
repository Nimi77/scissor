"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSchema } from "@/app/schemas";
import * as z from "zod";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: z.infer<typeof AuthSchema>) => {
    setError("");
    setIsLoading(true);

    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        if (response.error === "Incorrect password") {
          setError("Incorrect password");
        } else {
          setError("Invalid credentials");
        }
        setIsLoading(false);
        return;
      }

      if (response?.ok) {
        setIsLoading(false);
        router.replace("/dashboard");
        router.refresh();
      } else {
        setError("An unexpected error occurred.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  const handleInputChange = () => {
    setError("");
  };

  return (
    <Box
      display="flex"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      bg="white"
    >
      <Box maxW="md" className="login-wrapper">
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          color="black"
          className="container"
        >
          <Box className="login-heading">
            <Box display="flex" alignItems="center" justifyContent="center">
              <Text
                as="span"
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight={600}
                aria-label="linktrim"
              >
                linktrim
              </Text>
              <Box
                bgGradient="linear-gradient(0deg, #C5100E, #ED5734)"
                borderRadius="full"
                ml={1}
                w={2}
                h={2}
                aria-hidden="true"
              ></Box>
            </Box>
            <Text mt="-14px" fontSize="xl">
              Login to your account
            </Text>
          </Box>
          <Box
            mt={8}
            mb={4}
            width={{ base: "18rem", md: "20rem", lg: "26rem" }}
          >
            <form onSubmit={handleSubmit(handleLogin)} method="POST">
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email" fontSize="lg" color="gray.900">
                  Email address
                </FormLabel>
                <Input
                  id="email"
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  focusBorderColor="#ED5734"
                  placeholder="Email address"
                  onChange={handleInputChange}
                  isDisabled={isLoading}
                  w="100%"
                />
                {errors.email && (
                  <Text color="red.500" mt={1}>
                    {errors.email.message}
                  </Text>
                )}
              </FormControl>

              <FormControl mt={6} mb={2} isInvalid={!!errors.password}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FormLabel
                    htmlFor="password"
                    fontSize="lg"
                    color="gray.900"
                    m={0}
                  >
                    Password
                  </FormLabel>
                  <Link
                    href="/forgot-password"
                    color="#ED5734"
                    className="forget-passkey"
                  >
                    Forgot password?
                  </Link>
                </Box>
                <InputGroup display="flex" alignItems="center" mt={2}>
                  <Input
                    id="password"
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    focusBorderColor="#ED5734"
                    placeholder="Password"
                    onChange={handleInputChange}
                    isDisabled={isLoading}
                    w="100%"
                  />
                  <InputRightElement h="full">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      variant="ghost"
                      onClick={() => setShowPassword((show) => !show)}
                      icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      size="sm"
                      _hover={{
                        bg: "transparent",
                      }}
                    />
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <Text color="red.500" mt={1}>
                    {errors.password.message}
                  </Text>
                )}
              </FormControl>

              {error && <Text className="text-red-500">{error}</Text>}

              <Button
                type="submit"
                w="100%"
                h="2.5rem"
                mt={6}
                fontWeight={600}
                fontSize="lg"
                color="white"
                bg="#FF4C24"
                borderRadius="lg"
                boxShadow="md"
                _hover={{
                  bg: "#ED5734",
                  transition: "0.3s ease-in",
                }}
                isLoading={isLoading}
              >
                {isLoading ? <Spinner /> : "Login"}
              </Button>
            </form>
          </Box>

          <Box textAlign="center">
            <Text fontSize="lg">
              Don&apos;t have an account?{" "}
              <Link href="/signup" color="#ED5734" className="register-link">
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