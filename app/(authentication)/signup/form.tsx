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

      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setServerMessage(result.message);
        reset();

        setTimeout(() => {
          setStatus("redirecting");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        }, 2000);
      } else {
        setStatus("error");
        setServerMessage(result.error);
      }
    } catch (error) {
      setStatus("error");
      setServerMessage("An error occurred. Please try again.");
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
                  isDisabled={status === "registering"}
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
                <Input
                  id="password"
                  {...register("password")}
                  type="password"
                  autoComplete="current-password"
                  w="100%"
                  focusBorderColor="#ED5734"
                  placeholder="Password"
                  isDisabled={status === "registering"}
                />
                {errors.password && (
                  <Text color="red.500" mt={1}>
                    {errors.password.message}
                  </Text>
                )}
              </FormControl>

              <FormControl mt={4} mb={2} isInvalid={!!errors.confirmPassword}>
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
                  isDisabled={status === "registering"}
                />
                {errors.confirmPassword && (
                  <Text color="red.500" mt={1}>
                    {errors.confirmPassword.message}
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
                      <span>{serverMessage}</span>
                    </Box>
                  )}
                  {status === "redirecting" && (
                    <Box className="text-green-500">
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
