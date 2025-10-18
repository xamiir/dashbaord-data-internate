export type Helpers = {
  page: number;
  limit: number;
  search?: string;
};

export interface PaginationState {
  currentPage: number;
  totalPages: number;
}

export interface DataState<T> {
  data: T | null;
  pagination: PaginationState;
  loading: boolean;
  error: string;
}

export interface OperationState {
  loading: boolean;
  error: string;
}

export * from "./owner";
export * from "./driver";
export * from "./factory";
