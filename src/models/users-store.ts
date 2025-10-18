import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/with-set-prop";
import { withStatus } from "../utils/with-status";
import { api, GenericResponse } from "@/services/api";
import { IUser, IUserDTO } from "@/types/user";

export const UsersStoreModel = types
  .model("UsersStore")
  .props({
    users: types.optional(
      types.frozen<GenericResponse<IUser[]>>(),
      {} as GenericResponse<IUser[]>
    ),
  })
  .actions(withSetPropAction)
  .extend(withStatus)
  .views((_store) => ({}))
  .actions((store) => ({
    getUsers: async ({ page, limit }: { page?: number; limit?: number }) => {
      try {
        store.setStatus("pending");
        const response = await api.get<GenericResponse<IUser[]>>(
          "",
          `/user/?page=${page}&limit=${limit}`
        );
        store.setProp("users", response);
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    createUser: async (data: IUserDTO) => {
      try {
        store.setStatus("pending");
        const response = await api.post<GenericResponse<IUser>>(
          "",
          "/user/register/",
          data
        );
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    updateUser: async (id: string, data: IUserDTO) => {
      try {
        store.setStatus("pending");
        const response = await api.put<GenericResponse<IUser>>(
          "",
          `/user/${id}/update`,
          data
        );
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },
  }));

export type UsersStore = Instance<typeof UsersStoreModel>;
export type UsersStoreModelSnapshot = SnapshotOut<typeof UsersStoreModel>;
