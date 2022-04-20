import { useToast } from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useSelector } from "react-redux";

import { userTokenKey } from "../../constants";
import {
  AuthResponse,
  GoogleAuthInput,
  LoginInput,
  RegisterUserInput,
  useAuthControllerGoogleAuth,
  useAuthControllerLogin,
  useAuthControllerRegister,
  useAuthControllerTempRegister,
} from "../../generated/api";
import { RootState } from "../../redux";

export function useAuth() {
  const user = useSelector((state: RootState) => state.user.current);
  const toast = useToast();

  const googleAuthMutation = useAuthControllerGoogleAuth({
    mutation: {
      onSuccess,
      onError,
    },
  });

  const registerMutation = useAuthControllerRegister({
    mutation: {
      onSuccess,
      onError,
    },
  });

  const tempRegisterMutation = useAuthControllerTempRegister({
    mutation: {
      onSuccess,
      onError,
    },
  });

  const loginMutation = useAuthControllerLogin({
    mutation: {
      onSuccess,
      onError,
    },
  });

  function tempRegister() {
    tempRegisterMutation.mutateAsync();
  }

  function register(data: RegisterUserInput) {
    registerMutation.mutateAsync({
      data,
    });
  }

  function googleRegister(data: GoogleAuthInput) {
    googleAuthMutation.mutateAsync({
      data,
    });
  }

  function login(data: LoginInput) {
    loginMutation.mutateAsync({ data });
  }

  function logout() {}

  function refreshPage() {
    window.location.reload();
  }

  function setTokenToLocalStorage(token: string) {
    localStorage.setItem(userTokenKey, token);
  }

  function onSuccess(res: AxiosResponse<AuthResponse, any>) {
    setTokenToLocalStorage(res.data.accessToken);
    refreshPage();
  }

  function onError(err: AxiosError<unknown, any>) {
    toast({ status: "error", description: err.message });
  }

  return { register, login, logout, googleRegister, tempRegister, user };
}
