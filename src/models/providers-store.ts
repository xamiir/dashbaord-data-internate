import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/with-set-prop";
import { withStatus } from "../utils/with-status";
import { api, GenericResponse } from "@/services/api";
import { Provider, ProviderDTO } from "@/types/provider";

export const ProvidersStoreModel = types
  .model("ProvidersStore")
  .props({
    providers: types.optional(
      types.frozen<GenericResponse<Provider[]>>(),
      {} as GenericResponse<Provider[]>
    ),
  })
  .actions(withSetPropAction)
  .extend(withStatus)
  .views((_store) => ({}))
  .actions((store) => ({
    getProviders: async ({
      page,
      limit,
      cachable = true,
      search = "",
    }: {
      page?: number;
      limit?: number;
      cachable?: boolean;
      search?: string;
    }) => {
      try {
        store.setStatus("pending");
        const response = await api.get<GenericResponse<Provider[]>>(
          "",
          `/providers/?page=${page}&limit=${limit}&search=${search}`
        );
        if (cachable) store.setProp("providers", response);
        store.setStatus("done");
        return response.data;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },
    searchProviders: async (search: string) => {
      try {
        const response = await api.get<GenericResponse<Provider[]>>(
          "",
          `/providers/?search=${search}`
        );
        return response;
      } catch (error) {
        throw error;
      }
    },

    createProvider: async (data: ProviderDTO) => {
      try {
        store.setStatus("pending");
        const response = await api.post<GenericResponse<Provider>>(
          "",
          `/providers/`,
          data
        );
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    updateProvider: async (id: string, data: ProviderDTO) => {
      try {
        store.setStatus("pending");
        const response = await api.put<GenericResponse<Provider>>(
          "",
          `/providers/${id}`,
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

export type ProvidersStoreModel = Instance<typeof ProvidersStoreModel>;
export type SnapshotProvidersStoreModel = SnapshotOut<
  typeof ProvidersStoreModel
>;
