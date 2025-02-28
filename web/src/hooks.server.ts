import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // List of protected routes
  const protectedRoutes = ['/dashboard', '/profile'];
  
  // List of auth routes where logged-in users should be redirected away from
  const authRoutes = ['/login', '/register'];
  
  // Check if this is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    event.url.pathname.startsWith(route)
  );
  
  const isAuthRoute = authRoutes.some(route => 
    event.url.pathname === route
  );
  
  // Get the session cookie (this would normally verify the session on the server)
  const sessionId = event.cookies.get('sessionId');
  
  // If trying to access protected route without auth, redirect to login
  if (isProtectedRoute && !sessionId) {
    return new Response(null, {
      status: 302,
      headers: { Location: '/login' }
    });
  }
  
  // If trying to access auth routes while logged in, redirect to dashboard
  if (isAuthRoute && sessionId) {
    return new Response(null, {
      status: 302,
      headers: { Location: '/dashboard' }
    });
  }
  
  // Otherwise, just resolve the route normally
  return await resolve(event);
};