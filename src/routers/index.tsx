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
    path: PATHS.Overview.providers.root,
    element: lazy(() =>
      import("../pages/overview/providers/provider-list").then((module) => ({
        default: module.ProviderList,
      }))
    ),
  },
  {
    path: PATHS.Overview.providers.new,
    element: lazy(() =>
      import("../pages/overview/providers/new-edit-provider").then(
        (module) => ({
          default: module.NewEditProvider,
        })
      )
    ),
  },
  {
    path: PATHS.Overview.providers.root + "/:id/edit",
    element: lazy(() =>
      import("../pages/overview/providers/new-edit-provider").then(
        (module) => ({
          default: module.NewEditProvider,
        })
      )
    ),
  },

  {
    path: PATHS.Overview.categories.root,
    element: lazy(() =>
      import("../pages/overview/categories/category-list").then((module) => ({
        default: module.CategoryList,
      }))
    ),
  },
  {
    path: PATHS.Overview.categories.new,
    element: lazy(() =>
      import("../pages/overview/categories/new-edit-category").then(
        (module) => ({
          default: module.NewEditCategory,
        })
      )
    ),
  },
  {
    path: PATHS.Overview.categories.root + "/:id/edit",
    element: lazy(() =>
      import("../pages/overview/categories/new-edit-category").then(
        (module) => ({
          default: module.NewEditCategory,
        })
      )
    ),
  },
  {
    path: PATHS.Overview.categories.root + "/:id",
    element: lazy(() =>
      import("../pages/overview/categories/category-view").then((module) => ({
        default: module.CategoryView,
      }))
    ),
  },

  {
    path: PATHS.Overview.bundles.root,
    element: lazy(() =>
      import("../pages/overview/bundles/bundle-list").then((module) => ({
        default: module.BundleList,
      }))
    ),
  },
  {
    path: PATHS.Overview.bundles.new,
    element: lazy(() =>
      import("../pages/overview/bundles/new-edit-bundle").then((module) => ({
        default: module.NewEditBundle,
      }))
    ),
  },
  {
    path: PATHS.Overview.bundles.root + "/:id/edit",
    element: lazy(() =>
      import("../pages/overview/bundles/new-edit-bundle").then((module) => ({
        default: module.NewEditBundle,
      }))
    ),
  },
  {
    path: PATHS.Overview.bundles.root + "/:id",
    element: lazy(() =>
      import("../pages/overview/bundles/bundle-view").then((module) => ({
        default: module.BundleView,
      }))
    ),
  },

  {
    path: PATHS.Overview.transactions.root,
    element: lazy(() =>
      import("../pages/overview/transactions/transaction-list").then(
        (module) => ({
          default: module.TransactionList,
        })
      )
    ),
  },
  {
    path: PATHS.Overview.transactions.root + "/:id",
    element: lazy(() =>
      import("../pages/overview/transactions/transaction-view").then(
        (module) => ({
          default: module.TransactionView,
        })
      )
    ),
  },

  {
    path: PATHS.Overview.gateways.root,
    element: lazy(() =>
      import("../pages/overview/gateways").then((module) => ({
        default: module.GatewayList,
      }))
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
        <Route index element={<Navigate to={PATHS.Overview.app} />} />
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
