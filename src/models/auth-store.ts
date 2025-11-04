import { types, applySnapshot, Instance, SnapshotOut } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/with-set-prop";
import { withStatus } from "@/utils/with-status";
import { api, GenericResponse } from "@/services/api";
import { IUser } from "@/types/user";
import { saveString } from "@/app/utils/storage";
import { PATHS } from "@/routers/paths";

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    accessToken: types.maybeNull(types.string),
    profile: types.maybeNull(types.frozen<IUser>()),
    isAuthenticated: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)
  .extend(withStatus)
  // .views((store) => ({}))
  .actions((store) => ({
    /**
     * This is a helper method to login with default credentials
     * @returns {object} - A message object
     * @memberof AuthenticationStoreModel
     */
    loginDefault: (): { message: string } => {
      store.setProp("accessToken", Date.now().toString());
      store.setProp("isAuthenticated", true);
      return { message: "Logged in successfully" };
    },

    login: async (username: string, password: string) => {
      const data = { username, password };
      try {
        store.setStatus("pending");
        const response = await api.post<GenericResponse<IUser>>(
          "",
          "/login",
          data
        );

        if (!response.token) {
          localStorage.setItem("username", username);
          store.setProp("isAuthenticated", false);
          store.setStatus("done");
          PATHS.Auth.verifyOTP;
          return response;
        }

        saveString("token", response.token);
        saveString("token", response.token);
        store.setProp("accessToken", response.token);
        store.setProp("isAuthenticated", true);
        store.setStatus("done");
        PATHS.Overview.root;
        return response;
      } catch (error) {
        console.log("error", error);
        store.setStatus("error");
        throw error;
      }
    },

    verifyOTP: async (username: string, otp: string) => {
      const data = { username, otp };
      try {
        store.setStatus("pending");
        const response = await api.post<GenericResponse<IUser>>(
          "",
          "/user/otp/verify",
          data
        );
        store.setProp("accessToken", response.token);
        store.setProp("isAuthenticated", true);
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    getMe: async () => {
      try {
        store.setStatus("pending");
        const response = await api.get<GenericResponse<IUser>>("", "/users/me");
        store.setProp("profile", response.data);
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    logout: () => {
      applySnapshot(store, {});
      window.navigate(PATHS.Auth.login);
    },
  }));

export type AuthenticationStore = Instance<typeof AuthenticationStoreModel>;
export type AuthenticationStoreSnapshot = SnapshotOut<
  typeof AuthenticationStoreModel
>;
