import { useStores } from "@/models/helpers";
import { PATHS } from "@/routers/paths";
import { observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router-dom";

export const AuthGuard = observer(function AuthGuard() {
  const {
    authStore: { accessToken },
  } = useStores();
  return accessToken ? <Outlet /> : <Navigate to={PATHS.Auth.login} />;
});
