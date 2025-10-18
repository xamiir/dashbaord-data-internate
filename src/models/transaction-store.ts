import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/with-set-prop";
import { withStatus } from "../utils/with-status";
import { api, GenericResponse } from "@/services/api";
import { Transaction, TransactionDTO } from "@/types/transaction";
export const TransactionStoreModel = types
  .model("TransactionStore")
  .props({
    transactions: types.optional(
      types.frozen<GenericResponse<Transaction[]>>(),
      {} as GenericResponse<Transaction[]>
    ),
  })
  .actions(withSetPropAction)
  .extend(withStatus)
  .views((_store) => ({}))
  .actions((store) => ({
    getTransactions: async ({
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
        const response = await api.get<GenericResponse<Transaction[]>>(
          "",
          `/transactions/?page=${page}&limit=${limit}&search=${search}`
        );
        if (cachable) store.setProp("transactions", response);
        store.setStatus("done");
        return response.data;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    createTransaction: async (data: TransactionDTO) => {
      try {
        store.setStatus("pending");
        const response = await api.post<GenericResponse<Transaction>>(
          "",
          `/transactions/`,
          data
        );
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    updateTransaction: async (id: string, data: TransactionDTO) => {
      try {
        store.setStatus("pending");
        const response = await api.put<GenericResponse<Transaction>>(
          "",
          `/transactions/${id}`,
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

export type TransactionStore = Instance<typeof TransactionStoreModel>;
export type TransactionStoreSnapshot = SnapshotOut<
  typeof TransactionStoreModel
>;
