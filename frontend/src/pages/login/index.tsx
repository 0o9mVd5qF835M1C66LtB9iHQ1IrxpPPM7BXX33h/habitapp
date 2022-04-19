import { Link } from "react-router-dom";
import { Heading, Text, Button, Input, Flex } from "@chakra-ui/react";

import {
  Modal,
  ModalCloseButton,
  PageHeader,
  GoogleLogin,
  GoogleLoginButton,
} from "../../components";
import { useAuthControllerGoogleAuth } from "../../generated/api";

export function LoginPage() {
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
        Welcome back
      </Heading>
      <Text mb="5" textAlign="center" color="gray.500">
        Your data is saved locally
        <br />
        Sign in to sync between devices
      </Text>
      <GoogleLogin onLogin={handleGoogleRegister}>
        <GoogleLoginButton mb="9">Sign in with Google</GoogleLoginButton>
      </GoogleLogin>
      <form>
        <Text fontSize="sm" mb="0.5">
          Email
        </Text>
        <Input type="email" className="mb-4" />
        <Text fontSize="sm" mb="0.5">
          Password
        </Text>
        <Input type="password" className="mb-6" />
        <Button colorScheme="purple" isFullWidth mb="6">
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
