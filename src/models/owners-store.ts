import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/with-set-prop";
import { withStatus } from "../utils/with-status";
import { api, GenericResponse } from "@/services/api";
import { IOwner, IOwnerDTO, IMotorcycle } from "@/types/owner";

export const OwnersStoreModel = types
  .model("OwnersStore")
  .props({
    owners: types.optional(
      types.frozen<GenericResponse<IOwner[]>>(),
      {} as GenericResponse<IOwner[]>
    ),
  })
  .actions(withSetPropAction)
  .extend(withStatus)
  .views((_store) => ({}))
  .actions((store) => ({
    getOwners: async ({
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
        const response = await api.get<GenericResponse<IOwner[]>>(
          "",
          `/owners/${query}`
        );
        store.setProp("owners", response);
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    createOwner: async (data: IOwnerDTO) => {
      try {
        store.setStatus("pending");
        const response = await api.post<GenericResponse<IOwner>>(
          "",
          "/owners/",
          data
        );
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    updateOwner: async (id: number, data: IOwnerDTO) => {
      try {
        store.setStatus("pending");
        const response = await api.put<GenericResponse<IOwner>>(
          "",
          `/owners/${id}`,
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

export type OwnersStore = Instance<typeof OwnersStoreModel>;
export type OwnersStoreModelSnapshot = SnapshotOut<typeof OwnersStoreModel>;
