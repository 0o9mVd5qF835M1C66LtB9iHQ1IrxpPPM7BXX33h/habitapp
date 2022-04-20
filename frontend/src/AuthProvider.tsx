import { ReactNode } from "react";
import { useDispatch } from "react-redux";

import { userTokenKey } from "./constants";
import { setCurrentUser } from "./redux";
import { useUserControllerCurrentUser } from "./generated/api";
import { useAuth } from "./hooks";

export type AuthProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProps) {
  const { tempRegister, user } = useAuth();
  const dispatch = useDispatch();

  useUserControllerCurrentUser({
    query: {
      onSuccess: (res) => {
        dispatch(setCurrentUser(res.data));
      },
      onError: () => {
        localStorage.removeItem(userTokenKey);
        tempRegister();
      },
      enabled: !user,
      retry: false,
    },
  });

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
