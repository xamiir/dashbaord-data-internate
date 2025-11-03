import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/with-set-prop";
import { withStatus } from "../utils/with-status";
import { api, GenericResponse } from "@/services/api";
import { Category, CategoryDTO } from "@/types/category";

export const CategoriesStoreModel = types
  .model("CategoriesStore")
  .props({
    categories: types.optional(
      types.frozen<GenericResponse<Category[]>>(),
      {} as GenericResponse<Category[]>
    ),
  })
  .actions(withSetPropAction)
  .extend(withStatus)
  .views((_store) => ({}))
  .actions((store) => ({
    getCategories: async ({
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
        const response = await api.get<GenericResponse<Category[]>>(
          "",
          `/categories/?page=${page}&limit=${limit}&search=${search}`
        );
        if (cachable) store.setProp("categories", response);
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },
    searchCategories: async (search: string) => {
      try {
        const response = await api.get<GenericResponse<Category[]>>(
          "",
          `/categories/?search=${search}`
        );
        return response;
      } catch (error) {
        throw error;
      }
    },

    createCategory: async (data: CategoryDTO) => {
      try {
        store.setStatus("pending");
        const response = await api.post<GenericResponse<Category>>(
          "",
          `categories/categories-create/`,
          data
        );
        store.setStatus("done");
        return response;
      } catch (error) {
        store.setStatus("error");
        throw error;
      }
    },

    updateCategory: async (id: string, data: CategoryDTO) => {
      try {
        store.setStatus("pending");
        const response = await api.put<GenericResponse<Category>>(
          "",
          `categories/category-update/${id}`,
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

export type CategoriesStoreModel = Instance<typeof CategoriesStoreModel>;
export type SnapshotCategoriesStoreModel = SnapshotOut<
  typeof CategoriesStoreModel
>;
