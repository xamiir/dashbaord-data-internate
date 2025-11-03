export interface ICategory {
  id: string;
  name: string;
  image?: string;
  internetProvider: string; // ObjectId as string
}

export type Category = ICategory;

export type CategoryDTO = {
  name: string;
  image?: string;
  internetProvider: string;
};
