import {
  Heading,
  Text,
  Button,
  Input,
  InputRightElement,
  InputGroup,
  IconButton,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiEye } from "react-icons/hi";
import { Link } from "react-router-dom";

import {
  Modal,
  PageHeader,
  GoogleLogin,
  ModalCloseButton,
  GoogleLoginButton,
} from "../../components";
import { useAuth, useAuthUser } from "../../hooks";

export function RegisterPage() {
  const { googleAuth, register } = useAuth();
  const user = useAuthUser();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({ email: "", password: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = input;

    if (!email.trim() || !password.trim()) {
      toast({ status: "error", description: "Email and password required." });
      return;
    }

    register({ email, password, tempUserId: user._id });
  }

  function handleGoogleRegister(email: string) {
    googleAuth({ email, tempUserId: user._id });
  }

  return (
    <Modal>
      <PageHeader justifyContent="end">
        <ModalCloseButton aria-label="go back" />
      </PageHeader>
      <Heading as="h1" size="md" textAlign="center" mb="2" pt="32">
        Register new account
      </Heading>
      <Text mb="5" textAlign="center" color="gray.500">
        Your data is saved locally
        <br />
        Register to sync between devices
      </Text>
      <GoogleLogin onLogin={handleGoogleRegister}>
        <GoogleLoginButton mb="9">Sign up with Google</GoogleLoginButton>
      </GoogleLogin>
      <form onSubmit={handleRegister}>
        <Text fontSize="sm" mb="0.5">
          Email
        </Text>
        <Input
          type="email"
          name="email"
          value={input.email}
          mb="4"
          onChange={handleChange}
          required
        />
        <Text fontSize="sm" mb="0.5">
          Password
        </Text>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={input.password}
            mb="6"
            required
            onChange={handleChange}
          />
          <InputRightElement>
            <IconButton
              aria-label={showPassword ? "show password" : "hide password"}
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword((prev) => !prev)}
              icon={<HiEye />}
            />
          </InputRightElement>
        </InputGroup>
        <Button type="button" colorScheme="purple" isFullWidth mb="6">
          Register
        </Button>
      </form>
      <Box textAlign="center">
        <Button
          as={Link}
          to="/login"
          variant="link"
          size="sm"
          colorScheme="purple"
        >
          Already have an account?
        </Button>
      </Box>
    </Modal>
  );
}
