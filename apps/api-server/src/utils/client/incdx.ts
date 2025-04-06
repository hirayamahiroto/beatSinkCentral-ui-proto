import { hc } from "hono/client";
import type { AppType } from "../../app/api/[[...route]]/route";
import { apiServerConfig } from "../config/incdx";

export const createApiServerClient = () => {
  if (!apiServerConfig.baseUrl) {
    throw new Error("API_SERVER_BASE_URL is not set");
  }

  return hc<AppType>(apiServerConfig.baseUrl);
};
