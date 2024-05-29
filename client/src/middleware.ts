import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TUser } from "./models/user.model";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //   return NextResponse.redirect(new URL("/home", request.url));
  const refresh_token = request.cookies.get("refresh_token")?.value || "";

  const response = NextResponse.next();
  const isLogin = await fetch("http://localhost:8001/users/v3", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + refresh_token,
    },
  })
    .then(async (res) => {
      const data = await res.json();
      if (!data.access_token) throw new Error("not login");

      response.cookies.set("access_token", data.access_token);
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });

  console.log(isLogin);

  const token = response.cookies.get("access_token")?.value;
  const decode = token
    ? (jwtDecode(token) as { user: TUser; type: string })
    : undefined;
  const isVerfied = decode ? decode.user.isVerified : false;
  const { pathname } = request.nextUrl;

  if ((pathname == "/login" || pathname == "/register") && isLogin) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if ((pathname == "/" || pathname == "/verify-user") && !isLogin)
    return NextResponse.redirect(new URL("/login", request.url));
  else if (pathname == "/" && isLogin && !isVerfied)
    return NextResponse.redirect(new URL("/verify-user", request.url));
  else if (pathname == "/verify-user" && isLogin && isVerfied)
    return NextResponse.redirect(new URL("/", request.url));

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/register", "/verify-user"],
};
