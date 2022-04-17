import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../button";

type GoogleLoginButtonProps = {
  buttonText: string;
  className?: string;
  onLogin(email: string): void;
};

export function GoogleLoginButton({
  buttonText,
  className,
  onLogin,
}: GoogleLoginButtonProps) {
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
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      render={(props) => (
        <Button
          className={`${
            className || ""
          } border drop-shadow-sm border-gray-300 text-gray-700 font-medium text-base justify-center p-2`}
          icon={<FcGoogle className="text-2xl mr-2" />}
          {...props}
        >
          {buttonText}
        </Button>
      )}
    />
  );
}
