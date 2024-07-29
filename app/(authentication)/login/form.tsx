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
import { ViewIcon, ViewOffIcon, CheckIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSchema } from "@/app/schemas";
import * as z from "zod";

const LoginForm = () => {
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
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
        setError("Invalid Credentials");
        setIsLoading(false);
        return;
      }
      
      // Reset isLoading to false after successful login
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        router.replace("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Login failed", error);
      setError("An unexpected error occurred.");
      setIsLoading(false);
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
                  w="100%"
                  focusBorderColor="#ED5734"
                  placeholder="Email address"
                  isDisabled={isLoading} // Disable input when loading
                />
                {errors.email && (
                  <Text color="red.500" mt={1}>
                    {errors.email.message}
                  </Text>
                )}
              </FormControl>

              <FormControl mt={4} mb={2} isInvalid={!!errors.password}>
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
                  <Link href="" color="#ED5734" className="forget-passkey">
                    Forgot password?
                  </Link>
                </Box>
                <InputGroup display="flex" alignItems="center" mt={2}>
                  <Input
                    id="password"
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    w="100%"
                    focusBorderColor="#ED5734"
                    placeholder="Password"
                    isDisabled={isLoading}
                  />
                  <InputRightElement h="full">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      variant="ghost"
                      onClick={() => setShowPassword((show) => !show)}
                      icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      size={"sm"}
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
                isLoading={isLoading}
              >
                {isSuccess ? <CheckIcon /> : "Login"}
              </Button>
            </form>
          </Box>

          <Box textAlign="center">
            <Text fontSize="lg">
              Don&apos;t have an account?{" "}
              <Link href="/register" color="#ED5734" className="register-link">
                Create an account
              </Link>
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default LoginForm;
