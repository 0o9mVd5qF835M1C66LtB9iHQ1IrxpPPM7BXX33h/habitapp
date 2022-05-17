import React from "react";
import GoogleLoginComponent, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { Button, ButtonProps, forwardRef, useToast } from "@chakra-ui/react";

type Props = {
  children: React.ReactElement;
  onLogin(email: string): void;
};

export function GoogleLogin({ children, onLogin }: Props) {
  const toast = useToast();

  if (!process.env.REACT_APP_GOOGLE_CLIENT_ID) {
    throw new Error(`Google client id not found in env`);
  }

  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("profileObj" in response) {
      const email = response.profileObj.email;
      return onLogin(email);
    }

    console.log(response);

    toast({ status: "error", description: "Something went wrong!" });
  };

  return (
    <GoogleLoginComponent
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      render={(props) => <>{React.cloneElement(children, { ...props })}</>}
    />
  );
}

export const GoogleLoginButton = forwardRef<ButtonProps, "button">(
  (props, ref) => (
    <Button
      variant="outline"
      dropShadow="md"
      isFullWidth
      ref={ref}
      leftIcon={<FcGoogle size={24} color="" />}
      {...props}
    />
  )
);
