export interface RouteType {
  path: string;
  element: any;
  permissions?: string[];
}

const path = (index: string, routeName: string) => {
  return `${index}/${routeName}`;
};

const AUTH_ROOT = "/auth";
const DASHBOARD_ROOT = "/dashboard";

export const PATHS = {
  Root: "/",
  Overview: {
    root: DASHBOARD_ROOT,
    app: path(DASHBOARD_ROOT, "app"),
    users: {
      root: path(DASHBOARD_ROOT, "users"),
      new: path(DASHBOARD_ROOT, "users/new"),
      edit: (id: string) => `${DASHBOARD_ROOT}/users/${id}/edit`,
      view: (id: string) => `${DASHBOARD_ROOT}/users/${id}`,
    },
    providers: {
      root: path(DASHBOARD_ROOT, "providers"),
      new: path(DASHBOARD_ROOT, "providers/new"),
      edit: (id: string) => `${DASHBOARD_ROOT}/providers/${id}/edit`,
      view: (id: string) => `${DASHBOARD_ROOT}/providers/${id}`,
    },
    categories: {
      root: path(DASHBOARD_ROOT, "categories"),
      new: path(DASHBOARD_ROOT, "categories/new"),
      edit: (id: string) => `${DASHBOARD_ROOT}/categories/${id}/edit`,
      view: (id: string) => `${DASHBOARD_ROOT}/categories/${id}`,
    },
    bundles: {
      root: path(DASHBOARD_ROOT, "bundles"),
      new: path(DASHBOARD_ROOT, "bundles/new"),
      edit: (id: string) => `${DASHBOARD_ROOT}/bundles/${id}/edit`,
      view: (id: string) => `${DASHBOARD_ROOT}/bundles/${id}`,
    },
    transactions: {
      root: path(DASHBOARD_ROOT, "transactions"),
      new: path(DASHBOARD_ROOT, "transactions/new"),
      edit: (id: string) => `${DASHBOARD_ROOT}/transactions/${id}/edit`,
      view: (id: string) => `${DASHBOARD_ROOT}/transactions/${id}`,
    },
    gateways: {
      root: path(DASHBOARD_ROOT, "gateways"),
    },
  },
  Auth: {
    root: AUTH_ROOT,
    login: path(AUTH_ROOT, "login"),
    verifyOTP: path(AUTH_ROOT, "verify-otp"),
  },
};
