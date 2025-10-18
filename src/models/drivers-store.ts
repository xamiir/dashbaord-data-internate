import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/with-set-prop";
import { withStatus } from "../utils/with-status";
import { api, GenericResponse } from "@/services/api";
import { IDriver, IDriverDTO } from "@/types/driver";

export const DriversStoreModel = types
  .model("DriversStore")
  .props({
    drivers: types.optional(
      types.frozen<GenericResponse<IDriver[]>>(),
      {} as GenericResponse<IDriver[]>
    ),
  })
  .actions(withSetPropAction)
  .extend(withStatus)
  .views((_store) => ({}))
  .actions((store) => ({
    getDrivers: async ({
      page,
      limit,
      next,
    }: {
      page?: number;
      limit?: number;
      next?: string;
    }) => {
      try {
        store.setStatus("pending");
        const query = next ? `?next=${next}` : `?page=${page}&limit=${limit}`;
        const response = await api.get<GenericResponse<IDriver[]>>(
          "",
          `/drivers/${query}`
        );
        store.setProp("drivers", response);
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    createDriver: async (data: IDriverDTO) => {
      try {
        store.setStatus("pending");
        const response = await api.post<GenericResponse<IDriver>>(
          "",
          "/drivers/",
          data
        );
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    updateDriver: async (id: number, data: IDriverDTO) => {
      try {
        store.setStatus("pending");
        const response = await api.put<GenericResponse<IDriver>>(
          "",
          `/drivers/${id}`,
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

export type DriversStore = Instance<typeof DriversStoreModel>;
export type DriversStoreModelSnapshot = SnapshotOut<typeof DriversStoreModel>;
