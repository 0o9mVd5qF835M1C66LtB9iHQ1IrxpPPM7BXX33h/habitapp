import { Link } from "react-router-dom";
import { Heading, Text } from "@chakra-ui/react";

import {
  Modal,
  PageContainer,
  PageHeader,
  PageCloseButton,
  GoogleLogin,
  GoogleLoginButton,
  Input,
  Button,
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
    <Modal isOpen={true}>
      <PageContainer>
        <PageHeader display="flex" alignItems="center" justifyContent="end">
          <PageCloseButton />
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
        <form className="flex flex-col">
          <Input label="Email" type="email" className="mb-4" />
          <Input label="Password" type="password" className="mb-6" />
          <Button className="bg-primary-600 p-2 text-white text-base mb-10">
            Login
          </Button>
        </form>
        <div className="text-center">
          <Link className="text-primary-600 underline" to="/login">
            Forgot your password?
          </Link>
          <br />
          <Link className="text-primary-600 underline" to="/login">
            Doesn't have account yet?
          </Link>
        </div>
      </PageContainer>
    </Modal>
  );
}
