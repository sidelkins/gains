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
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const password2 = formData.get('password2');

    const regFetch = await fetch(`${env.PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username, 
          email, 
          password 
        })
    });

    const response = await regFetch.json();
  }
}