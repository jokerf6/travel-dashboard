import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SERVER } from "@/static/links";
export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const exist = cookieStore.get("AccessToken");
  console.log("hi");
  if (!exist) {
    if (request.nextUrl.pathname !== "/") {
      return NextResponse.redirect(new URL("/", request.url) as any);
    }
  }
  try {
    const response = await fetch(SERVER, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${exist!["value"]}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401 && request.nextUrl.pathname !== "/") {
        return NextResponse.redirect(new URL("/", request.url) as any);
      } else if (response.status !== 401 && request.nextUrl.pathname === "/") {
        return NextResponse.next(new URL("/trips", request.url) as any);
      }
      console.error("Error:", response.statusText);
    } else {
      if (response.status !== 401 && request.nextUrl.pathname === "/") {
        return NextResponse.next(new URL("/trips", request.url) as any);
      }
      const data = await response.json();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export const config = {
  matcher: ["/", "/destinations", "/trips", "/trip/:id*"],
};
