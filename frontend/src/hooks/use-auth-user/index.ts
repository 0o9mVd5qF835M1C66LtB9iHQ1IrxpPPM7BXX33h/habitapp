import { useSelector } from "react-redux";
import { RootState } from "../../redux";

export function useAuthUser() {
  const user = useSelector((state: RootState) => state.user.current);

  if (!user) {
    throw new Error("Not authenticated");
  }

  return user;
}
