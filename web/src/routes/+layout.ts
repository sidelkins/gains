import { auth } from '$lib/stores/auth';

export async function load({ data }) {
  auth.set({
    authenticated: data.authenticated,
    user: data.user,
    token: data.token
  });

  return {};
}