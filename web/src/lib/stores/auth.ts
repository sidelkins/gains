import type { User } from '$lib/types';
import { writable } from 'svelte/store';

interface AuthStore {
  authenticated: boolean;
  user: any | null;
}

export const auth = writable<AuthStore>({
  authenticated: false,
  user: null
});

export function login(user: any) {
  auth.set({
    authenticated: true,
    user
  });
}

export function logout() {
  auth.set({
    authenticated: false,
    user: null
  });
}
