import { hc } from "hono/client";
import type { AppType } from "../../app/api/[[...route]]/route";
import { bffServerConfig } from "../config";

export const createBffServerClient = () => {
  if (!bffServerConfig.baseUrl) {
    throw new Error("BFF_SERVER_BASE_URL is not set");
  }

  return hc<AppType>(bffServerConfig.baseUrl);
};
