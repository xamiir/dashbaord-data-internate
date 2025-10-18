import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { AuthenticationStoreModel } from "../auth-store";
import { UsersStoreModel } from "../users-store";
import { CountryStoreModel } from "../country-store";
import { OwnersStoreModel } from "../owners-store";
import { DriversStoreModel } from "../drivers-store";
import { MotorcyclesStoreModel } from "../motorcycles-store";
import { CommonStoreModel } from "../common-store";

/**
 * The root store, any properties defined here will be accessible
 * by any observers that consume it
 */
export const RootStoreModel = types.model("Root").props({
  authStore: types.optional(AuthenticationStoreModel, {}),
  usersStore: types.optional(UsersStoreModel, {}),
  countryStore: types.optional(CountryStoreModel, {}),
  ownersStore: types.optional(OwnersStoreModel, {}),
  driversStore: types.optional(DriversStoreModel, {}),
  motorcyclesStore: types.optional(MotorcyclesStoreModel, {}),
  commonStore: types.optional(CommonStoreModel, {}),
});

export type RootStore = Instance<typeof RootStoreModel>;
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>;
