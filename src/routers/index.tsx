import { Routes, Route, Navigate } from "react-router-dom";
import { NotFound } from "@/pages";
import { PATHS, RouteType } from "./paths";
import { AuthGuard, GuestGuard } from "@/app/guards";
import { Sidebar } from "@/components/widgets";
import { Suspense, lazy } from "react";
import TopBarProgress from "react-topbar-progress-indicator";
import { useStores } from "@/models/helpers";
import { observer } from "mobx-react-lite";
import { Login } from "@/pages/auth/login";
import { VerifyOTP } from "@/pages/auth/verify-otp";

TopBarProgress.config({
  barColors: {
    "0": "#ca8a04",
  },
});

const routesConfig: RouteType[] = [
  {
    path: PATHS.Overview.app,
    element: lazy(() =>
      import("../pages/overview/dashboard").then((module) => ({
        default: module.default,
      }))
    ),
  },

  {
    path: PATHS.Overview.users.root,
    element: lazy(() =>
      import("../pages/overview/users").then((module) => ({
        default: module.UserList,
      }))
    ),
  },
  {
    path: PATHS.Overview.users.new,
    element: lazy(() =>
      import("../pages/overview/users/new-edit-user").then((module) => ({
        default: module.NewEditUser,
      }))
    ),
  },

  {
    path: PATHS.Overview.users.root + "/:id/edit",
    element: lazy(() =>
      import("../pages/overview/users").then((module) => ({
        default: module.NewEditUser,
      }))
    ),
  },
  {
    path: PATHS.Overview.users.root + "/:id",
    element: lazy(() =>
      import("../pages/overview/users/user-view").then((module) => ({
        default: module.UserView,
      }))
    ),
  },

  {
    path: PATHS.Overview.owners.root,
    element: lazy(() =>
      import("../pages/overview/owners/owner-list").then((module) => ({
        default: module.OwnerList,
      }))
    ),
  },
  {
    path: PATHS.Overview.owners.new,
    element: lazy(() =>
      import("../pages/overview/owners/").then((module) => ({
        default: module.NewEditOwner,
      }))
    ),
  },

  {
    path: PATHS.Overview.owners.root + "/:id/edit",
    element: lazy(() =>
      import("../pages/overview/owners").then((module) => ({
        default: module.NewEditOwner,
      }))
    ),
  },
  {
    path: PATHS.Overview.owners.root + "/:id",
    element: lazy(() =>
      import("../pages/overview/owners/owner-view").then((module) => ({
        default: module.OwnerView,
      }))
    ),
  },

  {
    path: PATHS.Overview.drivers.root,
    element: lazy(() =>
      import("../pages/overview/drivers").then((module) => ({
        default: module.DriverList,
      }))
    ),
  },
  {
    path: PATHS.Overview.drivers.new,
    element: lazy(() =>
      import("../pages/overview/drivers/new-edit-driver").then((module) => ({
        default: module.NewEditDriver,
      }))
    ),
  },

  {
    path: PATHS.Overview.drivers.root + "/:id/edit",
    element: lazy(() =>
      import("../pages/overview/drivers/new-edit-driver").then((module) => ({
        default: module.NewEditDriver,
      }))
    ),
  },
  {
    path: PATHS.Overview.drivers.root + "/:id",
    element: lazy(() =>
      import("../pages/overview/drivers/driver-view").then((module) => ({
        default: module.DriverView,
      }))
    ),
  },

  {
    path: PATHS.Overview.motorcycles.root,
    element: lazy(() =>
      import("../pages/overview/motorcycles/motorcycle-list").then(
        (module) => ({
          default: module.MotorcycleList,
        })
      )
    ),
  },

  {
    path: PATHS.Overview.motorcycles.root + "/:id/edit",
    element: lazy(() =>
      import("../pages/overview/motorcycles").then((module) => ({
        default: module.EditMotorcycle,
      }))
    ),
  },
  {
    path: PATHS.Overview.motorcycles.root + "/:id",
    element: lazy(() =>
      import("../pages/overview/motorcycles/motorcycle-view").then(
        (module) => ({
          default: module.MotorcycleView,
        })
      )
    ),
  },
];

export const AppRouter = observer(function AppRouter() {
  const allowedRoutes = routesConfig;

  const firstAvailableRoute =
    allowedRoutes.length > 0 ? allowedRoutes[0].path : PATHS.Overview.app;

  return (
    <Routes>
      <Route path={PATHS.Root} element={<AuthGuard />}>
        <Route index element={<Navigate to={PATHS.Overview.root} />} />
        <Route
          element={
            <Suspense fallback={<TopBarProgress />}>
              <Sidebar />
            </Suspense>
          }
        >
          <Route
            path={PATHS.Overview.root}
            element={<Navigate to={firstAvailableRoute} />}
          />

          {allowedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Suspense fallback={<TopBarProgress />}>
                  <route.element />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Route>
      <Route path={PATHS.Auth.root} element={<GuestGuard />}>
        <Route index element={<Navigate to={PATHS.Auth.login} />} />
        <Route path={PATHS.Auth.login} element={<Login />} />
        <Route path={PATHS.Auth.verifyOTP} element={<VerifyOTP />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
});
