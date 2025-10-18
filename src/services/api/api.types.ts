/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}

export interface GenericResponse<T> {
  data: T;
  token: string;
  message: string;
  status: boolean;
  total_pages: number;
  current_page: number;
  next?: string;
}

export interface GeneralResponse<T> {
  error: boolean;
  message: string;
  data: T;
}
