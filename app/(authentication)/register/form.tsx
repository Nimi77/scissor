"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Spinner,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/app/schemas";
import * as z from "zod";

const RegisterForm = () => {
  const [status, setStatus] = useState<
    "idle" | "registering" | "success" | "redirecting" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleRegister = async (data: z.infer<typeof RegisterSchema>) => {
    setStatus("idle");
    setErrorMessage("");

    try {
      setStatus("registering");

      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const registerData = await response.json();

      if (response.ok) {
        setStatus("success");

        setTimeout(() => {
          setStatus("redirecting");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
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
      <Box maxW="md" className="register-wrapper">
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          w="100%"
          h="100%"
          color="black"
          className="container"
        >
          <Box className="register-heading">
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
              Create an account and get started!
            </Text>
          </Box>
          <Box
            mt={8}
            mb={4}
            width={{ base: "18rem", md: "20rem", lg: "26rem" }}
          >
            <form onSubmit={handleSubmit(handleRegister)} method="POST">
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email" fontSize="lg" color="gray.900">
                  Email address
                </FormLabel>
                <Input
                  id="email"
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  w="100%"
                  focusBorderColor="#ED5734"
                  placeholder="Email address"
                />
                {errors.email && (
                  <Text color="red.500" mt={1}>
                    {errors.email.message}
                  </Text>
                )}
              </FormControl>

              <FormControl mt={4} mb={2} isInvalid={!!errors.password}>
                <FormLabel htmlFor="password" fontSize="lg" color="gray.900">
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    w="100%"
                    focusBorderColor="#ED5734"
                    placeholder="Password"
                  />
                  <InputRightElement h="full">
                    <IconButton
                      aria-label="Toggle password visibility"
                      variant="ghost"
                      onClick={() => setShowPassword((show) => !show)}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    />
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <Text color="red.500" mt={1}>
                    {errors.password.message}
                  </Text>
                )}
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
                mt={5}
                fontWeight={600}
                fontSize="lg"
                color="white"
                bg="#FF4C24"
                borderRadius="lg"
                boxShadow="md"
                _hover={{
                  bg: "#ED5734",
                  transition: "all 0.3s ease",
                }}
              >
                Sign Up
              </Button>
            </form>
          </Box>

          <Box textAlign="center">
            <Text fontSize="lg">
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
