import { auth } from '$lib/stores/auth';
import { parse } from 'cookie';

export async function load({ request }) {
  let token = '';

  // Server-side: Use request.headers.get('cookie') to get cookies from headers
  if (request) {
    const cookies = parse(request.headers.get('cookie') || '');
    token = cookies.jwt || '';
  } else {
    // Client-side: Fallback to document.cookie
    if (typeof document !== 'undefined') {
      const cookies = parse(document.cookie);
      token = cookies.jwt || '';
    }
  }

  if (token) {
    // Make an API call or decode the JWT to verify the token and fetch user data
    const res = await fetch('http://192.168.1.69:3000/api/verify', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const { user } = await res.json();
      auth.set({
        isAuthenticated: true,
        user,
      });
    }
  }

  return {};
}
