import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/with-set-prop";
import { withStatus } from "../utils/with-status";
import { api, GenericResponse } from "@/services/api";
import { SMS, SMSDTO } from "@/types/sms";

export const SmsStoreModel = types
  .model("SmsStore")
  .props({
    sms: types.optional(
      types.frozen<GenericResponse<SMS[]>>(),
      {} as GenericResponse<SMS[]>
    ),
    currentSms: types.optional(
      types.frozen<GenericResponse<SMS>>(),
      {} as GenericResponse<SMS>
    ),
  })
  .actions(withSetPropAction)
  .extend(withStatus)
  .views((_store) => ({}))
  .actions((store) => ({
    getSms: async ({
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
        const response = await api.get<GenericResponse<SMS[]>>(
          "",
          `/sms/?page=${page}&limit=${limit}&search=${search}`
        );
        if (cachable) store.setProp("sms", response);
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    getSmsById: async (id: string) => {
      try {
        store.setStatus("pending");
        const response = await api.get<GenericResponse<SMS>>("", `/sms/${id}`);
        store.setProp("currentSms", response);
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    createSms: async (data: SMSDTO) => {
      try {
        store.setStatus("pending");
        const response = await api.post<GenericResponse<SMS>>(
          "",
          `/v1/api/sms/`,
          data
        );
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    updateSms: async (id: string, data: SMSDTO) => {
      try {
        store.setStatus("pending");
        const response = await api.put<GenericResponse<SMS>>(
          "",
          `/v1/api/sms/${id}`,
          data
        );
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    deleteSms: async (id: string) => {
      try {
        store.setStatus("pending");
        const response = await api.delete<GenericResponse<SMS>>(
          "",
          `/v1/api/sms/${id}`
        );
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },
  }));

export type SmsStore = Instance<typeof SmsStoreModel>;
export type SmsStoreSnapshot = SnapshotOut<typeof SmsStoreModel>;
