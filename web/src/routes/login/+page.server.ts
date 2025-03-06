import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

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

    const loginFetch = await event.fetch('http://192.168.1.69:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ identifier, password })
    });

    if (loginFetch.status === 200) {
      const { token } = await loginFetch.json();

      // Store the JWT in a secure HTTP-only cookie
      event.cookies.set('jwt', token, {
        path: '/', // Makes cookie available to all routes
        httpOnly: true, // Prevents access from JavaScript
        secure: process.env.NODE_ENV === 'production', // Secure in production
        sameSite: 'strict', // CSRF protection
        maxAge: 60 * 60 * 24 * 7 // Expires in 7 days
      });
      return redirect(302, '/dashboard')
    } else if (loginFetch.status === 401) {
      return fail(401, { message: 'Unauthorized' });
    }
  }
};
