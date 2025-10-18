import { ApiResponse } from "apisauce";

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: "timeout"; temporary: true }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: "cannot-connect"; temporary: true; message?: string }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: "server"; message: string }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: "unauthorized"; message: string }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: "forbidden"; message: string }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: "not-found"; message: string }
  /**
   * All other 4xx series errors.
   */
  | { kind: "rejected"; message: string; errors: object }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: "unknown"; temporary: true }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: "bad-data" };

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(
  response: ApiResponse<any>
): GeneralApiProblem | null {
  console.log("RESPONSE", response.data);
  switch (response.problem) {
    case "CONNECTION_ERROR":
      return {
        kind: "cannot-connect",
        temporary: true,
        message: Object.prototype.hasOwnProperty.call(response.data, "message")
          ? response.data.message
          : "Connection error occured, please try again the request",
      };
    case "NETWORK_ERROR":
      return {
        kind: "cannot-connect",
        temporary: true,
        message: Object.prototype.hasOwnProperty.call(response?.data, "message")
          ? response.data.message
          : "Connection error occured, please try again the request",
      };
    case "TIMEOUT_ERROR":
      return { kind: "timeout", temporary: true };
    case "SERVER_ERROR":
      return {
        kind: "server",
        message: Object.prototype.hasOwnProperty.call(response.data, "message")
          ? response.data.message
          : "Server error occured, please try again the request",
      };
    case "UNKNOWN_ERROR":
      return { kind: "unknown", temporary: true };
    case "CLIENT_ERROR":
      switch (response.status) {
        case 401:
          return {
            kind: "unauthorized",
            message: Object.prototype.hasOwnProperty.call(
              response.data,
              "message"
            )
              ? response.data.message
              : "",
          };
        case 403:
          return {
            kind: "forbidden",
            message: Object.prototype.hasOwnProperty.call(
              response.data,
              "message"
            )
              ? response.data.message
              : "",
          };
        case 404:
          return {
            kind: "not-found",
            message: Object.prototype.hasOwnProperty.call(
              response.data,
              "message"
            )
              ? response.data.message
              : "",
          };
        default:
          return {
            kind: "rejected",
            message: Object.prototype.hasOwnProperty.call(
              response.data,
              "message"
            )
              ? response.data.message
              : "",
            errors: Object.prototype.hasOwnProperty.call(
              response.data,
              "errors"
            )
              ? response.data.errors
              : "",
          };
      }
    case "CANCEL_ERROR":
      return null;
  }

  return null;
}
