import { useStores } from "@/models/helpers";
import { PATHS } from "@/routers/paths";
import { observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router-dom";

export const GuestGuard = observer(function GuestGuard() {
  const {
    authStore: { accessToken },
  } = useStores();

  return accessToken ? <Navigate to={PATHS.Overview.root} /> : <Outlet />;
});
