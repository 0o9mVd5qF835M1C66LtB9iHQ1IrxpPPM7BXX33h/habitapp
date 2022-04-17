import { Link } from "react-router-dom";

import {
  Modal,
  PageContainer,
  PageHeader,
  PageCloseButton,
  GoogleLoginButton,
  Input,
  Button,
  Form,
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
      <PageContainer>
        <PageHeader>
          <div className="flex flex-row-reverse justify-between items-center">
            <PageCloseButton />
          </div>
        </PageHeader>
        <h1 className="text-base text-gray-900 font-bold text-center mb-2 pt-32">
          Welcome back
        </h1>
        <p className="mb-5 text-center text-xs text-gray-500">
          Your data is saved locally
          <br />
          Sign in to sync between devices
        </p>
        <GoogleLoginButton
          buttonText="Sign in with Google"
          className="mb-9"
          onLogin={handleGoogleRegister}
        />
        <Form className="flex flex-col">
          <Input label="Email" type="email" className="mb-4" />
          <Input label="Password" type="password" className="mb-6" />
          <Button className="bg-primary-600 p-2 text-white text-base mb-10">
            Login
          </Button>
        </Form>
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
