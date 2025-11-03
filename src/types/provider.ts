export interface IProvider {
  _id: string;
  name: string;
  image?: string;
}

export type Provider = IProvider;

export type ProviderDTO = {
  name: string;
  image?: string;
};
