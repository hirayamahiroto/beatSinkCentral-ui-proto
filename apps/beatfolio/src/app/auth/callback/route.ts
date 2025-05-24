import { auth0 } from "../../../utils/auth0";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await auth0.middleware(req);
}
