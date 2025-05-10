import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(
    `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${encodeURIComponent(`${process.env.APP_BASE_URL}`)}`
  );
}
