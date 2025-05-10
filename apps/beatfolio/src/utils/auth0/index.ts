import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { NextResponse } from "next/server";

export const auth0 = new Auth0Client({
  session: {
    rolling: true,
    absoluteDuration: 60 * 60 * 24 * 7, // 7 days in seconds
    inactivityDuration: 60 * 60 * 24 * 3, // 3 days in seconds
  },

  async onCallback(error, context, session) {
    console.log("onCallback-----------------------");
    // redirect the user to a custom error page
    if (error || !session?.user) {
      return NextResponse.redirect(
        new URL(
          `/error?error=${error?.message || "unknown error"}`,
          process.env.APP_BASE_URL
        )
      );
    }

    // 他のカスタマイズログインロジック

    // complete the redirect to the provided returnTo URL
    return NextResponse.redirect(
      new URL(context.returnTo || "/", process.env.APP_BASE_URL)
    );
  },
});
