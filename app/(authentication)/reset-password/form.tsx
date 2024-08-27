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
  Link,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "@/app/schemas";
import * as z from "zod";
import axios from "axios";

const ResetPasswordForm = () => {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "redirecting" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleResetPassword = async (
    data: z.infer<typeof ResetPasswordSchema>
  ) => {
    setStatus("submitting");
    setServerMessage(null);

    const { confirmPassword, ...formData } = data;

    try {
      const token = new URLSearchParams(window.location.search).get("token");
      const response = await axios.post(
        "/api/auth/reset-password",
        { ...formData, token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setStatus("success");
        setServerMessage(response.data.message);

        setStatus("redirecting");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
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
    setServerMessage(null);
  };

  const statusStyles = {
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
              Reset your password
            </Text>
          </Box>
          <Box mt={8} mb={4} width={{ md: "20rem", lg: "26rem" }}>
            <form onSubmit={handleSubmit(handleResetPassword)} method="POST">
              <FormControl my={4} isInvalid={!!errors.password}>
                <FormLabel htmlFor="password" fontSize="lg" color="gray.900">
                  New Password
                </FormLabel>
                <Input
                  id="password"
                  {...register("password")}
                  type="password"
                  autoComplete="new-password"
                  w="100%"
                  focusBorderColor="#ED5734"
                  placeholder="New Password"
                  onChange={handleInputChange}
                  isDisabled={status === "submitting"}
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
                  Confirm New Password
                </FormLabel>
                <Input
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  type="password"
                  autoComplete="new-password"
                  w="100%"
                  focusBorderColor="#ED5734"
                  placeholder="Confirm New Password"
                  onChange={handleInputChange}
                  isDisabled={status === "submitting"}
                />
                {errors.confirmPassword && (
                  <Text color="red.500" mt={1}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </FormControl>

              {status !== "idle" && (
                <Box className="text-left">
                  {status === "submitting" && (
                    <Box {...statusStyles}>
                      <Spinner size="sm" mr={2} color="green.500" />
                      <Text color="green.500">Submitting...</Text>
                    </Box>
                  )}
                  {status === "success" && (
                    <Box {...statusStyles}>
                      <CheckCircleIcon color="green.500" boxSize={4} mr={2} />
                      <Text color="green.500" fontWeight="bold">
                        {serverMessage}
                      </Text>
                    </Box>
                  )}
                  {status === "redirecting" && (
                    <Box {...statusStyles}>
                      <Text color="green.500">
                        Redirecting to login page...
                      </Text>
                    </Box>
                  )}
                  {status === "error" && (
                    <Box className="text-red-500">
                      <Text>{serverMessage}</Text>
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
                bg="#ED5734"
                isDisabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  <Spinner size="sm" />
                ) : status === "success" ? (
                  <CheckCircleIcon />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </Box>

          <Box display="flex" alignItems="center">
            <Text fontSize="lg">
              Remembered your password?{" "}
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

export default ResetPasswordForm;