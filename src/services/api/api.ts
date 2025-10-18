/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApisauceInstance, create } from "apisauce";
import type { ApiConfig } from "./api.types";
import { getGeneralApiProblem } from "./apiProblem";
import { loadString, remove } from "@/app/utils/storage";
import { Config } from "@/config";
import { PATHS } from "@/routers/paths";

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000, // 10 seconds
};

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance;
  config: ApiConfig;
  navigate: ((path: string) => void) | null = null;

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    });
  }

  setNavigateFunction(navigate: (path: string) => void) {
    this.navigate = navigate;
  }

  private request = async <T>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    url: string,
    data?: any,
    headers?: any
  ): Promise<T> => {
    const token = loadString("token");

    const response = await this.apisauce.any({
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    });

    if (!response.ok) {
      console.error(`Error calling ${method} ${url}`, response.problem);
      const problem = getGeneralApiProblem(response);

      if (response.status === 401 && problem?.kind.includes("unauthorized")) {
        remove("token");
        if (window.navigate) window.navigate(PATHS.Auth.login);
      }

      if (problem) throw problem;
    }

    return response.data as T;
  };

  get = <T>(
    apiUrl: string = Config.API_URL,
    route: string,
    headers?: any
  ): Promise<T> => {
    const url = `${apiUrl}${route}`;
    return this.request<T>("GET", url, headers);
  };

  post = <T>(
    apiUrl: string = Config.API_URL,
    route: string,
    data?: any,
    headers?: any
  ): Promise<T> => {
    const url = `${apiUrl}${route}`;
    console.log("url", url);
    return this.request<T>("POST", url, data, headers);
  };

  put = <T>(
    apiUrl: string = Config.API_URL,
    route: string,
    data?: any,
    headers?: any
  ): Promise<T> => {
    const url = `${apiUrl}${route}`;
    console.log("url", url);
    return this.request<T>("PUT", url, data, headers);
  };

  patch = <T>(
    apiUrl: string = Config.API_URL,
    route: string,
    data?: any,
    headers?: any
  ): Promise<T> => {
    const url = `${apiUrl}${route}`;
    console.log("url", url);
    return this.request<T>("PATCH", url, data, headers);
  };

  delete = <T>(
    apiUrl: string = Config.API_URL,
    route: string,
    data?: any,
    headers?: any
  ): Promise<T> => {
    const url = `${apiUrl}${route}`;
    console.log("url", url);
    return this.request<T>("DELETE", url, data, headers);
  };
}

// Singleton instance of the API for convenience
export const api = new Api();
