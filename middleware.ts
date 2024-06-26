import { NextRequest, NextResponse } from "next/server";
import { userApi } from "./lib/utils";
import axios from "axios";

export default async function middleware(req: NextRequest) {
  const publicPaths = ["/", "/login", "/signup"]; //all public paths
  const path = req.nextUrl.pathname;
  const isPublicPath = publicPaths.includes(path);
  const token = req.cookies.get("chatpdf_token")?.value || "";

  if (isPublicPath && token) {
    const redirectPath = "/dashboard";
    return NextResponse.redirect(new URL(redirectPath, req.nextUrl));
  } else if (!isPublicPath && !token) {
    const loginPath = "/login";
    return NextResponse.redirect(new URL(loginPath, req.nextUrl));
  }
  if (!isPublicPath && token) {
    try {
      const response = await axios.get(
        "https://chatpdfapi.hardikchoudhary.in/api/ping",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status !== 200) {
        return NextResponse.rewrite(new URL("/error", req.nextUrl));
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      return NextResponse.rewrite(new URL("/error", req.nextUrl));
    }

    return NextResponse.next();
  }

  // return NextResponse.next();
}
export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/signup",
    "/login",
    "/dashboard/chat/:path*",
  ],
};
