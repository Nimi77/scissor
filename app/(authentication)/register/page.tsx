import React from "react";
import {
  Text,
  Flex,
  Heading,
  Input,
  Button,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";

const Register = () => {
  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Box w="400px" h="450px" pos="relative" className="login-wrapper">
        <Flex
          alignItems="center"
          justifyContent="center"
          w="100%"
          h="100%"
          bgColor="#F0F5F9"
          color="black"
          boxShadow="lg"
          className="form-wrapper"
        >
          <form action="">
            <Heading as="h2" fontSize="3xl" textAlign="center">
              Sign Up
            </Heading>
            <Box className="input-group">
              <FormLabel>Username</FormLabel>
              <Input type="text" placeholder="Username" required></Input>
            </Box>
            <Box className="input-group">
              <FormLabel>Email</FormLabel>
              <Input type="text" placeholder="Enter your email" required></Input>
            </Box>
            <Box className="input-group">
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="******" required></Input>
            </Box>
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
              Sign Up
            </Button>
            <Box textAlign="center">
              <Text>
                Already have an account?{" "}
                <Link href="/login" color="#ED5734" className="register-link text-red-800">Sign In</Link>
              </Text>
            </Box>
          </form>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Register;

// <Flex
//     flexDirection="column"
//     bg={formBackground}
//     p={12}
//     borderRadius={8}
//     boxShadow="lg"
//   >
//     <Heading mb={6}>Log In</Heading>
//     <Input
//       placeholder="johndoe@gmail.com"
//       type="email"
//       variant="filled"
//       mb={3}
//     />
//     <Input
//       placeholder="**********"
//       type="password"
//       variant="filled"
//       mb={6}
//     />
//     <Button colorScheme="teal" mb={8}>
//       Log In
//     </Button>
//     <FormControl display="flex" alignItems="center">
//       <FormLabel htmlFor="dark_mode" mb="0">
//         Enable Dark Mode?
//       </FormLabel>
//       <Switch
//         id="dark_mode"
//         colorScheme="teal"
//         size="lg"
//         onChange={toggleColorMode}
//       />
//     </FormControl>
//   </Flex>
