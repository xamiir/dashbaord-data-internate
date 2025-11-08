import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { AuthenticationStoreModel } from "../auth-store";
import { UsersStoreModel } from "../users-store";
import { CountryStoreModel } from "../country-store";
import { OwnersStoreModel } from "../owners-store";
import { DriversStoreModel } from "../drivers-store";
import { CommonStoreModel } from "../common-store";
import { ProvidersStoreModel } from "../providers-store";
import { CategoriesStoreModel } from "../categories-store";
import { BundlesStoreModel } from "../bundles-store";
import { TransactionStoreModel } from "../transaction-store";
import { GatewaysStoreModel } from "../gateways-store";
import { SmsStoreModel } from "../sms-store";

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
  commonStore: types.optional(CommonStoreModel, {}),
  providersStore: types.optional(ProvidersStoreModel, {}),
  categoriesStore: types.optional(CategoriesStoreModel, {}),
  bundlesStore: types.optional(BundlesStoreModel, {}),
  transactionStore: types.optional(TransactionStoreModel, {}),
  gatewaysStore: types.optional(GatewaysStoreModel, {}),
  smsStore: types.optional(SmsStoreModel, {}),
});

export type RootStore = Instance<typeof RootStoreModel>;
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>;
