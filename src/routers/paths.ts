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
    owners: {
      root: path(DASHBOARD_ROOT, "owners"),
      new: path(DASHBOARD_ROOT, "owners/new"),
      edit: (id: number) => `${DASHBOARD_ROOT}/owners/${id}/edit`,
      view: (id: number) => `${DASHBOARD_ROOT}/owners/${id}`,
    },
    drivers: {
      root: path(DASHBOARD_ROOT, "drivers"),
      new: path(DASHBOARD_ROOT, "drivers/new"),
      edit: (id: number) => `${DASHBOARD_ROOT}/drivers/${id}/edit`,
      view: (id: number) => `${DASHBOARD_ROOT}/drivers/${id}`,
    },
    motorcycles: {
      root: path(DASHBOARD_ROOT, "motorcycles"),
      edit: (id: number) => `${DASHBOARD_ROOT}/motorcycles/${id}/edit`,
      view: (id: number) => `${DASHBOARD_ROOT}/motorcycles/${id}`,
    },
  },
  Auth: {
    root: AUTH_ROOT,
    login: path(AUTH_ROOT, "login"),
    verifyOTP: path(AUTH_ROOT, "verify-otp"),
  },
};
