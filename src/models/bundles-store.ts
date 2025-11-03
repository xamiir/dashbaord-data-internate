import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/with-set-prop";
import { withStatus } from "../utils/with-status";
import { api, GenericResponse } from "@/services/api";
import { Bundle, BundleDTO } from "@/types/bundle";

export const BundlesStoreModel = types
  .model("BundlesStore")
  .props({
    bundles: types.optional(
      types.frozen<GenericResponse<Bundle[]>>(),
      {} as GenericResponse<Bundle[]>
    ),
  })
  .actions(withSetPropAction)
  .extend(withStatus)
  .views((_store) => ({}))
  .actions((store) => ({
    getBundles: async ({
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
        const response = await api.get<GenericResponse<Bundle[]>>(
          "",
          `/bundles/?page=${page}&limit=${limit}&search=${search}`
        );
        if (cachable) store.setProp("bundles", response);
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },
    searchBundles: async (search: string) => {
      try {
        const response = await api.get<GenericResponse<Bundle[]>>(
          "",
          `/bundles/?search=${search}`
        );
        return response;
      } catch (error) {
        throw error;
      }
    },

    createBundle: async (data: BundleDTO) => {
      try {
        store.setStatus("pending");
        const response = await api.post<GenericResponse<Bundle>>(
          "",
          `/bundles/bundle-create/`,
          data
        );
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    updateBundle: async (id: string, data: BundleDTO) => {
      try {
        store.setStatus("pending");
        const response = await api.put<GenericResponse<Bundle>>(
          "",
          `/bundles/bundle-update/${id}`,
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

export type BundlesStoreModel = Instance<typeof BundlesStoreModel>;
export type SnapshotBundlesStoreModel = SnapshotOut<typeof BundlesStoreModel>;
