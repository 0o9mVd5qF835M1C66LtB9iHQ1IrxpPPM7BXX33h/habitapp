import GoogleLoginComponent, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { Button, ButtonProps, forwardRef } from "@chakra-ui/react";
import React from "react";

type Props = {
  children: React.ReactNode;
  onLogin(email: string): void;
};

export function GoogleLogin({ children, onLogin }: Props) {
  if (!process.env.REACT_APP_GOOGLE_CLIENT_ID) {
    throw new Error(`Google client id not found in env`);
  }

  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("getBasicProfile" in response) {
      const profile = response.getBasicProfile();
      const email = profile.getEmail();

      onLogin(email);
    }

    alert("Something went wrong!");
  };

  return (
    <GoogleLoginComponent
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      render={() => <>{children}</>}
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
