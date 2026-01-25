import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/api/users(.*)",
  "/api/tests(.*)",
  "/api/checkout(.*)",
]);

export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
