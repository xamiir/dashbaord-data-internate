export interface IBundle {
  id: string;
  _id?: string;
  label: string;
  description?: string;
  quantity?: number;
  amount: number;
  businessAmount?: number;
  offerId?: string;
  points: number;
  internetCategory: string; // ObjectId as string
}

export type Bundle = IBundle;

export type BundleDTO = {
  label: string;
  description?: string;
  quantity?: number;
  amount: number;
  businessAmount?: number;
  offerId?: string;
  points?: number;
  internetCategory: string;
};
