import { writable } from 'svelte/store';

interface AuthStore {
  isAuthenticated: boolean;
  user: { id: number; username: string } | null;
}

export const auth = writable<AuthStore>({
  isAuthenticated: false,
  user: null,
});

// Method to update the auth state
export function login(user: { id: number; username: string }) {
  auth.set({
    isAuthenticated: true,
    user
  });
}

export function logout() {
  auth.set({
    isAuthenticated: false,
    user: null
  });
}
