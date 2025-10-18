export type Provider = {
  id: string;
  name: string;
  node: string;
  photoURL: string;
  accountId: string;
  isPayin: boolean;
  isPayout: boolean;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  DeletedAt: string;
};

export type ProviderDTO = {
  name: string;
  node: string;
  photoURL: string;
  accountId: string;
  isPayin: boolean;
  isPayout: boolean;
  isAvailable: boolean;
};
