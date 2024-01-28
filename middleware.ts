import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // redirect them to organization selection page
    if (auth.userId && req.nextUrl.pathname === "/sign-in") {
      return NextResponse.redirect(
        req.nextUrl.searchParams.get("redirect_url") || req.nextUrl.origin
      );
    }

    // if (
    //   auth.userId &&
    //   auth.userId !== "user_2Y6tvlUgTezsLCpjDDnq9PWBv8v" &&
    //   !["/add", "/bill", "/unauth", "/"].includes(req.nextUrl.pathname)
    // ) {
    //   return NextResponse.redirect(req.nextUrl.origin + "/unauth");
    // }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
