import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/with-set-prop";
import { withStatus } from "../utils/with-status";
import { api } from "@/services/api";
import { GatewayResponse } from "@/types/gateway";

export const GatewaysStoreModel = types
  .model("GatewaysStore")
  .props({
    gateways: types.optional(
      types.frozen<GatewayResponse>(),
      {} as GatewayResponse
    ),
  })
  .actions(withSetPropAction)
  .extend(withStatus)
  .views((_store) => ({}))
  .actions((store) => ({
    getGateways: async ({
      cachable = true,
    }: {
      cachable?: boolean;
    } = {}) => {
      try {
        store.setStatus("pending");
        const response = await api.get<GatewayResponse>("", "/gateways");
        if (cachable) store.setProp("gateways", response);
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    getList: async () => {
      return store.gateways;
    },

    refreshGet: async () => {
      try {
        store.setStatus("pending");
        const response = await api.get<GatewayResponse>("", "/gateways");
        store.setProp("gateways", response);
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },
  }));

export type GatewaysStoreModel = Instance<typeof GatewaysStoreModel>;
export type SnapshotGatewaysStoreModel = SnapshotOut<typeof GatewaysStoreModel>;
