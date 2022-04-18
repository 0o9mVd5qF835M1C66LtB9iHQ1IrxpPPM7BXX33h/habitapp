import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userTokenKey } from "./constants";
import { RootState, setCurrentUser } from "./redux";
import {
  useAuthControllerTempRegister,
  useUserControllerCurrentUser,
} from "./generated/api";
import axios from "axios";

export type AuthProps = {
  children?: ReactNode;
};

export function Auth({ children }: AuthProps) {
  const currentUser = useSelector((state: RootState) => state.user.current);
  const dispatch = useDispatch();

  const tempRegisterMutation = useAuthControllerTempRegister({
    mutation: {
      onSuccess: (res) => {
        localStorage.setItem(userTokenKey, res.data.accessToken);
        window.location.reload();
      },
      onError: () => {},
    },
  });

  useUserControllerCurrentUser({
    query: {
      onSuccess: (res) => {
        dispatch(setCurrentUser(res.data));
      },
      onError: () => {
        localStorage.removeItem(userTokenKey);
        tempRegisterMutation.mutate();
      },
      enabled: !currentUser,
    },
  });

  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      config.headers = {
        ...(config.headers ? config.headers : {}),
        authorization: `Bearer ${localStorage.getItem(userTokenKey)}`,
      };

      return config;
    });

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  if (!currentUser) {
    return null;
  }

  return <>{children}</>;
}
