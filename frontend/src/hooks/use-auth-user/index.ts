import { useAuth } from "../use-auth";

export function useAuthUser() {
  const { user } = useAuth();

  if (!user) {
    throw new Error("Not authenticated");
  }

  return user;
}
