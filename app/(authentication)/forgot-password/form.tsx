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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@/app/schemas";
import * as z from "zod";
import axios from "axios";

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleResetPassword = async (
    data: z.infer<typeof ForgotPasswordSchema>
  ) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/forgot-password", {
        email: data.email,
      });

      if (response.status === 200) {
        setSuccess("A password reset link has been sent to your email.");
        setIsLoading(false);
        reset()
      } else {
        setError("Failed to send reset link. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Reset password failed", error);
      setError("An error occurred. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleInputChange = () => {
    setError("");
    setSuccess("");
  };

  return (
    <Box
      display="flex"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      bg="white"
    >
      <Box maxW="md" className="reset-password-wrapper">
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          color="black"
          className="container"
        >
          <Box className="reset-password-heading">
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
              Reset your password
            </Text>
          </Box>
          <Box
            mt={8}
            mb={4}
            width={{ base: "18rem", md: "20rem", lg: "26rem" }}
          >
            <form onSubmit={handleSubmit(handleResetPassword)} method="POST">
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
                  placeholder="Enter your email"
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

              {error && (
                <Text color="red.500" mt={4}>
                  {error}
                </Text>
              )}
              {success && (
                <Text
                  p="6px"
                  bgColor="rgba(34, 197, 94, 0.2)"
                  color="green.500"
                  mt={4}
                >
                  {success}
                </Text>
              )}

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
                {isLoading ? <Spinner /> : "Send Reset Link"}
              </Button>
            </form>
          </Box>

          <Box textAlign="center">
            <Text fontSize="lg">
              Remembered your password?{" "}
              <Link href="/login" color="#ED5734" className="login-link">
                Log In
              </Link>
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default ForgotPasswordForm;