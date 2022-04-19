import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userTokenKey } from "./constants";
import { RootState, setCurrentUser } from "./redux";
import {
  useAuthControllerTempRegister,
  useUserControllerCurrentUser,
} from "./generated/api";

export type AuthProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProps) {
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
      retry: false,
    },
  });

  if (!currentUser) {
    return null;
  }

  return <>{children}</>;
}
