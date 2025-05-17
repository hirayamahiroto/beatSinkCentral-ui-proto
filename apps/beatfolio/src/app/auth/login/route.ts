import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(
    `https://${process.env.AUTH0_DOMAIN}/authorize?response_type=code&client_id=${process.env.AUTH0_CLIENT_ID}&redirect_uri=${encodeURIComponent(`${process.env.APP_BASE_URL}/auth/callback`)}&scope=openid%20profile%20email`
  );
}
