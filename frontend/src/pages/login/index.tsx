import { Link } from "react-router-dom";
import { Heading, Text, Button, Input, Flex, useToast } from "@chakra-ui/react";

import {
  Modal,
  ModalCloseButton,
  PageHeader,
  GoogleLogin,
  GoogleLoginButton,
} from "../../components";
import { useAuth, useAuthUser } from "../../hooks";
import { useState } from "react";

export function LoginPage() {
  const user = useAuthUser();
  const { googleAuth, login } = useAuth();
  const toast = useToast();
  const [input, setInput] = useState({ email: "", password: "" });

  function handleGoogleLogin(email: string) {
    googleAuth({
      email,
      tempUserId: user._id,
    });
  }

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = input;

    if (!email.trim() || !password.trim()) {
      toast({ status: "error", description: "Email and password required." });
      return;
    }

    login({ email, password });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <Modal>
      <PageHeader justifyContent="end">
        <ModalCloseButton aria-label="go back" />
      </PageHeader>
      <Heading as="h1" size="md" textAlign="center" mb="2" pt="32">
        Welcome back
      </Heading>
      <Text mb="5" textAlign="center" color="gray.500">
        Your data is saved locally
        <br />
        Sign in to sync between devices
      </Text>
      <GoogleLogin onLogin={handleGoogleLogin}>
        <GoogleLoginButton mb="9">Sign in with Google</GoogleLoginButton>
      </GoogleLogin>
      <form onSubmit={handleLogin}>
        <Text fontSize="sm" mb="0.5">
          Email
        </Text>
        <Input
          type="email"
          name="email"
          value={input.email}
          mb="4"
          onChange={handleChange}
        />
        <Text fontSize="sm" mb="0.5">
          Password
        </Text>
        <Input
          type="password"
          name="password"
          value={input.password}
          mb="6"
          onChange={handleChange}
        />
        <Button type="submit" colorScheme="purple" isFullWidth mb="6">
          Login
        </Button>
      </form>
      <Flex direction="column" alignItems="center">
        <Button
          as={Link}
          to="/login"
          variant="link"
          colorScheme="purple"
          size="sm"
          mb="3"
          maxWidth="max-content"
        >
          Forgot your password?
        </Button>
        <Button
          as={Link}
          to="/register"
          variant="link"
          colorScheme="purple"
          size="sm"
          maxWidth="max-content"
        >
          Don't have account yet?
        </Button>
      </Flex>
    </Modal>
  );
}
