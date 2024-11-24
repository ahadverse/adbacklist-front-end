export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/profile",
    "/user/post",
    "/recharge-credits",
    "/user/local-ads",
    "/dashboard/recharge",
  ],
};
