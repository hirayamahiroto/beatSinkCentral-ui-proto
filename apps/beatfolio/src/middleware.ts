import { NextRequest, NextResponse } from "next/server";
import { authenticationMiddleware } from "./middleware/authentication";

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

export async function middleware(req: NextRequest) {
  // Basic認証の処理
  if (process.env.ENABLE_BASIC_AUTH === "true") {
    if (
      process.env.BASIC_AUTH_USERNAME === undefined ||
      process.env.BASIC_AUTH_PASSWORD === undefined
    ) {
      // 認証情報が設定されていない場合はAuth0認証へ
      return await authenticationMiddleware(req);
    }

    const basicAuth = req.headers.get("authorization");

    if (basicAuth) {
      const authValue = basicAuth.split(" ")[1];
      const [username, password] = Buffer.from(authValue, "base64")
        .toString()
        .split(":");

      if (
        username === process.env.BASIC_AUTH_USERNAME &&
        password === process.env.BASIC_AUTH_PASSWORD
      ) {
        // Basic認証が成功した場合はAuth0認証へ
        return await authenticationMiddleware(req);
      }
    }

    // Basic認証が失敗した場合
    return NextResponse.json(
      { error: "Basic Auth Required" },
      {
        headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
        status: 401,
      }
    );
  }

  // Basic認証が無効な場合はAuth0認証のみ実行
  return await authenticationMiddleware(req);
}
