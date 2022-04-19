import {
  Heading,
  Text,
  Button,
  Input,
  InputRightElement,
  InputGroup,
  IconButton,
  Box,
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
import { useAuthControllerGoogleAuth } from "../../generated/api";

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const googleAuthMutation = useAuthControllerGoogleAuth();

  function handleGoogleRegister(email: string) {
    googleAuthMutation.mutate({
      data: {
        tempUserId: "",
        email,
      },
    });
  }

  return (
    <Modal>
      <PageHeader justifyContent="end">
        <ModalCloseButton aria-label="go back" />
      </PageHeader>
      <Heading
        as="h1"
        size="md"
        color="gray.900"
        textAlign="center"
        mb="2"
        pt="32"
      >
        Register new account
      </Heading>
      <Text mb="5" textAlign="center" color="gray.500">
        Your data is saved locally
        <br />
        Sign in to sync between devices
      </Text>
      <GoogleLogin onLogin={handleGoogleRegister}>
        <GoogleLoginButton mb="9">Sign up with Google</GoogleLoginButton>
      </GoogleLogin>
      <form>
        <Text fontSize="sm" mb="0.5">
          Email
        </Text>
        <Input type="email" className="mb-4" />
        <Text fontSize="sm" mb="0.5">
          Password
        </Text>
        <InputGroup>
          <Input type={showPassword ? "text" : "password"} className="mb-6" />
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
