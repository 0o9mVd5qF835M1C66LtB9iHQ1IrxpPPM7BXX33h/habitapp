import { PageContainer } from "../../components";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

export function RegisterPage() {
  if (!process.env.REACT_APP_GOOGLE_CLIENT_ID) {
    throw new Error(`Google client id not found in env`);
  }

  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response);
  };

  return (
    <PageContainer>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </PageContainer>
  );
}
