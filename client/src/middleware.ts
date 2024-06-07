import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TUser } from "./models/user.model";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //   return NextResponse.redirect(new URL("/home", request.url));
  const refresh_token = request.cookies.get("refresh_token")?.value || "";

  const response = NextResponse.next();
  const isLogin = await fetch(
    "http://localhost:8001/users/v3",
    // process.env.NEXT_PUBLIC_API_BASED_URL_LOCAL + "/users/v3",
    // process.env.NEXT_PUBLIC_API_BASED_VPS + "/users/v3",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + refresh_token,
      },
    }
  )
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
  const isCustomer = decode?.user.role === "customer" ? true : false;

  // akses login / register klo seller login & verif => /dashboard
  if (
    (pathname == "/login" || pathname == "/register") &&
    isLogin &&
    !isCustomer &&
    isVerfied
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // akses login / register klo buyer login & verif => home
  else if (
    (pathname == "/login" || pathname == "/register") &&
    isLogin &&
    isCustomer &&
    isVerfied
  )
    return NextResponse.redirect(new URL("/", request.url));
  // akses home / dashboard / verif klo g login => /login
  else if ((pathname == "/" || pathname == "/dashboard") && !isLogin)
    return NextResponse.redirect(new URL("/login", request.url));
  // akses home / dashboard kalo belum ke verify
  else if (
    (pathname == "/" || pathname == "/dashboard") &&
    isLogin &&
    !isVerfied
  )
    return NextResponse.redirect(new URL("/verify-user", request.url));
  // akses home klo seller login => dashboard
  else if (pathname == "/" && isLogin && isVerfied && !isCustomer)
    return NextResponse.redirect(new URL("/dashboard", request.url));
  // akses dashboard klo buyer login => home
  else if (pathname == "/dashboard" && isLogin && isVerfied && isCustomer)
    return NextResponse.redirect(new URL("/", request.url));
  // akses verif klo login, dh verif, seller => dashboard
  else if (pathname == "/verify-user" && isLogin && isVerfied && !isCustomer)
    return NextResponse.redirect(new URL("/dashboard", request.url));
  // akses verif klo login, dh verif, buyer => home
  else if (pathname == "/verify-user" && isLogin && isVerfied && isCustomer)
    return NextResponse.redirect(new URL("/", request.url));
  else if (pathname == "/verify-user" && !isLogin)
    return NextResponse.redirect(new URL("/login", request.url));
  // akses ke edit profile namun belum login
  else if (pathname == "/edit-profile" && !isLogin)
    return NextResponse.redirect(new URL("/login", request.url));

  return response;
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/verify-user",
    "/dashboard",
    "/edit-profile",
  ],
};
