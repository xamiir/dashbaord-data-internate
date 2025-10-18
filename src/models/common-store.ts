import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/with-set-prop";
import { withStatus } from "../utils/with-status";
import { api, GenericResponse } from "@/services/api";

export const CommonStoreModel = types
  .model("CommonStore")
  .props({
    clients: types.optional(
      types.frozen<GenericResponse<[]>>(),
      {} as GenericResponse<[]>
    ),
  })
  .actions(withSetPropAction)
  .extend(withStatus)
  // .views((store) => ({}))
  .actions((store) => ({
    uploadFile: async (data: FormData, type: string) => {
      try {
        store.setStatus("pending");
        const response = await api.post<GenericResponse<string[]>>(
          "",
          `/files`,
          data,
          {
            "Content-Type": "multipart/form-data",
          }
        );
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },
  }));

export type CommonStore = Instance<typeof CommonStoreModel>;
export type CommonStoreModelSnapshot = SnapshotOut<typeof CommonStoreModel>;
