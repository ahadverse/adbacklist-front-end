import { NextResponse } from "next/server";
import jwt_decode from "jwt-decode";
export { default } from "next-auth/middleware";

// export default function middleware(req) {
//   let verify = req.cookies.get("token");
//   let url = req.url;

//   const decoded = verify ? jwt_decode(verify?.value) : "";

//   if (url.includes("/user/post")) {

//     try {
//       if (!decoded?.email) {
//         return NextResponse.rewrite(new URL("/login", url));
//       } else {
//         return NextResponse.next();
//       }
//     } catch (error) {
//       return NextResponse.rewrite(new URL("/login", url));
//     }
//   }

//   if (url.includes("/dashboard")) {
//     try {
//       if (verify == undefined && !decoded?.email) {
//         return NextResponse.rewrite(new URL("/login", url));
//       } else {
//         return NextResponse.next();
//       }
//     } catch (error) {
//       return NextResponse.rewrite(new URL("/login", url));
//     }
//   }

//   if (url.includes("/recharge-credits")) {
//     try {
//       if (verify == undefined && !decoded?.email) {
//         return NextResponse.rewrite(new URL("/login", url));
//       } else {
//         return NextResponse.next();
//       }
//     } catch (error) {
//       return NextResponse.rewrite(new URL("/login", url));
//     }
//   }
//   if (url.includes("/reports")) {
//     try {
//       if (verify == undefined && !decoded?.email) {
//         return NextResponse.rewrite(new URL("/login", url));
//       } else {
//         return NextResponse.next();
//       }
//     } catch (error) {
//       return NextResponse.rewrite(new URL("/login", url));
//     }
//   }

//   if (url.includes("/login")) {
//     try {
//       if (verify && decoded?.email) {
//         return NextResponse.rewrite(new URL("/", url));
//       } else {
//         return NextResponse.next();
//       }
//     } catch (error) {
//       return NextResponse.rewrite(new URL("/login", url));
//     }
//   }
//   if (url.includes("/register")) {
//     try {
//       if (verify && decoded.email) {
//         return NextResponse.rewrite(new URL("/", url));
//       } else {
//         return NextResponse.next();
//       }
//     } catch (error) {
//       return NextResponse.rewrite(new URL("/login", url));
//     }
//   }

//   return NextResponse.next();
// }

export const config = { matcher: ["/dashboard/profile", "/user/post"] };
