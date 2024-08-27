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
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/app/schemas";
import * as z from "zod";
import { CheckCircleIcon } from "@chakra-ui/icons";
import axios from "axios";

const RegisterForm = () => {
  const [status, setStatus] = useState<
    "idle" | "registering" | "success" | "redirecting" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = async (data: z.infer<typeof RegisterSchema>) => {
    setStatus("idle");
    setServerMessage(null);

    // Exclude confirmPassword from the data being sent to the server
    const { confirmPassword, ...formData } = data;

    try {
      setStatus("registering");

      const response = await axios.post("/api/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setStatus("success");
        setServerMessage(response.data.message);
        reset();

        setStatus("redirecting");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setStatus("error");
        setServerMessage(response.data.error);
      }
    } catch (error) {
      setStatus("error");
      if (axios.isAxiosError(error)) {
        setServerMessage(
          error.response?.data?.error || "An error occurred. Please try again."
        );
      } else {
        setServerMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleInputChange = () => {
    // Clear server message on any input change
    setServerMessage("");
  };

  //styling for registering status message
  const statusStyles = {
    className: "reg-mss",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    bg: "rgba(34, 197, 94, 0.2)",
    borderRadius: "md",
    p: "6px",
    width: "max-content",
    fontSize: "16px",
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
          <Box mt={8} mb={4} width={{ md: "20rem", lg: "26rem" }}>
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
                  onChange={handleInputChange}
                  isDisabled={status === "registering"}
                />
                {errors.email && (
                  <Text color="red.500" mt={1}>
                    {errors.email.message}
                  </Text>
                )}
              </FormControl>

              <FormControl my={4} isInvalid={!!errors.password}>
                <FormLabel htmlFor="password" fontSize="lg" color="gray.900">
                  Password
                </FormLabel>
                <Input
                  id="password"
                  {...register("password")}
                  type="password"
                  autoComplete="current-password"
                  w="100%"
                  focusBorderColor="#ED5734"
                  placeholder="Password"
                  onChange={handleInputChange}
                  isDisabled={status === "registering"}
                />
                {errors.password && (
                  <Text color="red.500" mt={1}>
                    {errors.password.message}
                  </Text>
                )}
              </FormControl>

              <FormControl mb={4} isInvalid={!!errors.confirmPassword}>
                <FormLabel
                  htmlFor="confirmPassword"
                  fontSize="lg"
                  color="gray.900"
                >
                  Confirm Password
                </FormLabel>
                <Input
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  type="password"
                  autoComplete="new-password"
                  w="100%"
                  focusBorderColor="#ED5734"
                  placeholder="Confirm Password"
                  onChange={handleInputChange}
                  isDisabled={status === "registering"}
                />
                {errors.confirmPassword && (
                  <Text color="red.500" mt={1}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </FormControl>

              {status !== "idle" && (
                <Box className="text-left">
                  {status === "registering" && (
                    <Box {...statusStyles}>
                      <Spinner size="sm" mr={2} color="green.500" />
                      <span>Registering...</span>
                    </Box>
                  )}
                  {status === "success" && (
                    <Box {...statusStyles}>
                      <CheckCircleIcon color="green.500" boxSize={4} mr={2} />
                      <Text color="green.500" fontWeight="600">
                        {serverMessage}
                      </Text>
                    </Box>
                  )}
                  {status === "redirecting" && (
                    <Box {...statusStyles}>
                      <span>Redirecting to login page...</span>
                    </Box>
                  )}
                  {status === "error" && (
                    <Box className="text-red-500">
                      <span>{serverMessage}</span>
                    </Box>
                  )}
                </Box>
              )}

              <Button
                type="submit"
                w="100%"
                h="2.4rem"
                mt={6}
                fontWeight="600"
                fontSize="lg"
                color="white"
                bg="#FF4C24"
                borderRadius="lg"
                boxShadow="md"
                _hover={{
                  bg: "#ED5734",
                  transition: "0.3s ease-in",
                }}
                isDisabled={status === "registering"}
              >
                Submit
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
