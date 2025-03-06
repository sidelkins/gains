import type { User } from '$lib/types';
import { writable } from 'svelte/store';

interface AuthStore {
  authenticated: boolean;
  user: any | null;
  token: string | undefined | null;
}

export const auth = writable<AuthStore>({
  authenticated: false,
  user: null,
  token: null
});

export function login(user: any, token: string | undefined | null) {
  auth.set({
    authenticated: true,
    user,
    token
  });
}

export function logout() {
  auth.set({
    authenticated: false,
    user: null,
    token: null
  });
}
