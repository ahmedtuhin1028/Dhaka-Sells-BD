import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export default withAuth(
  function middleware(req) {
    const isAuth = !!req.nextauth.token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/login');
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin');

    if (isAdminPage) {
      if (!isAuth || (req.nextauth.token?.role !== 'ADMIN' && req.nextauth.token?.role !== 'SUPER_ADMIN')) {
        return NextResponse.redirect(new URL('/login?error=unauthorized', req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: () => true, // Let middleware function handle the logic
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*']
};
