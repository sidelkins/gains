import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { env } from '$env/dynamic/public'

export const load: PageServerLoad = async (event) => {
  if (event.locals.user) {
    return redirect(302, '/dashboard');
  }
};

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const identifier = formData.get('identifier');
    const password = formData.get('password');

    const loginFetch = await event.fetch(`${env.PUBLIC_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ identifier, password }),
      credentials: 'include'
    });

    if (loginFetch.status === 200) {
      const { token } = await loginFetch.json();

      // Store the JWT in a secure HTTP-only cookie
      event.cookies.set('jwt', token, {
        path: '/', // Makes cookie available to all routes
        httpOnly: true, // Prevents access from JavaScript
        secure: process.env.NODE_ENV === 'production', // Secure in production
        sameSite: 'strict', // CSRF protection
        maxAge: 60 * 15 // Expires in 15 minutes
      });
      return redirect(302, '/dashboard')
    } else if (loginFetch.status === 401) {
      return fail(401, { message: 'Unauthorized' });
    }
  }
};
