import { types, flow } from "mobx-state-tree";
import { api } from "@/services/api";

const QueryStore = types
  .model("QueryStore", {
    data: types.optional(types.frozen(), null),
    error: types.optional(types.string, ""),
    loading: types.optional(types.boolean, false),
    cache: types.optional(types.map(types.frozen()), {}),
  })
  .actions((self) => ({
    fetchData: flow(function* <T>(key: string, url: string, force = false) {
      if (!force && self.cache.has(key)) {
        self.data = self.cache.get(key);
        return;
      }

      self.loading = true;
      self.error = "";
      try {
        const response = yield api.get<T>("", url);
        self.data = response.data;
        self.cache.set(key, response.data);
      } catch (err) {
        const error = err as Error;
        self.error = error.message;
      } finally {
        self.loading = false;
      }
    }),

    invalidateCache(key?: string) {
      if (key) {
        self.cache.delete(key);
      } else {
        self.cache.clear();
      }
    },

    mutateData<T>(endpoint: string, data: T) {
      self.loading = true;
      self.error = "";
      api
        .post<T>("", endpoint, data)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          const error = err as Error;
          self.error = error.message;
        })
        .finally(() => {
          self.loading = false;
        });
    },
  }));

const queryStore = QueryStore.create();

export default queryStore;
