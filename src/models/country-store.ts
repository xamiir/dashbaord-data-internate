import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/with-set-prop";
import { withStatus } from "../utils/with-status";
import { api, GenericResponse } from "@/services/api";
import { Country, CountryDTO } from "@/types/country";

export const CountryStoreModel = types
  .model("CountryStore")
  .props({
    countries: types.optional(
      types.frozen<GenericResponse<Country[]>>(),
      {} as GenericResponse<Country[]>
    ),
  })
  .actions(withSetPropAction)
  .extend(withStatus)
  .views((_store) => ({}))
  .actions((store) => ({
    getCountries: async ({ cachable = true }: { cachable: boolean }) => {
      try {
        store.setStatus("pending");
        const response = await api.get<GenericResponse<Country[]>>(
          "",
          `/countries`
        );
        if (cachable) store.setProp("countries", response);
        store.setStatus("done");
        return response.data;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    createCountry: async (data: CountryDTO) => {
      try {
        store.setStatus("pending");
        const response = await api.post<GenericResponse<Country>>(
          "",
          `/countries`,
          data
        );
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    updateCountry: async (id: string, data: CountryDTO) => {
      try {
        store.setStatus("pending");
        const response = await api.put<GenericResponse<Country>>(
          "",
          `/countries/${id}`,
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

export type CountryStore = Instance<typeof CountryStoreModel>;
export type CountryStoreModelSnapshot = SnapshotOut<typeof CountryStoreModel>;
