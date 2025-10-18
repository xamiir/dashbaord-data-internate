import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/with-set-prop";
import { withStatus } from "../utils/with-status";
import { api, GenericResponse } from "@/services/api";
import { IMotorcycle } from "@/types/owner";

export const MotorcyclesStoreModel = types
  .model("MotorcyclesStore")
  .props({
    motorcycles: types.optional(
      types.frozen<GenericResponse<IMotorcycle[]>>(),
      {} as GenericResponse<IMotorcycle[]>
    ),
  })
  .actions(withSetPropAction)
  .extend(withStatus)
  .views((_store) => ({}))
  .actions((store) => ({
    getMotorcycles: async ({
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
        const response = await api.get<GenericResponse<IMotorcycle[]>>(
          "",
          `/motorcycles/${query}`
        );
        store.setProp("motorcycles", response);
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    updateMotorcycle: async (
      id: number,
      data: { plate_number: string; chassis_number: string }
    ) => {
      try {
        store.setStatus("pending");
        const response = await api.put<GenericResponse<IMotorcycle>>(
          "",
          `/motorcycles/${id}`,
          data
        );
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    assignDriver: async (id: number, driverId: number) => {
      try {
        store.setStatus("pending");
        const response = await api.post<GenericResponse<any>>(
          "",
          `/motorcycles/${id}/assign-driver/`,
          { driver_id: driverId }
        );
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },
  }));

export type MotorcyclesStore = Instance<typeof MotorcyclesStoreModel>;
export type MotorcyclesStoreModelSnapshot = SnapshotOut<
  typeof MotorcyclesStoreModel
>;
