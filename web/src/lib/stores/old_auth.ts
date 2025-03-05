import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import api from '$lib/api';

// https://pastebin.com/xBDzZ0X7

// Types
interface User {
  id: number;
  username: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: browser ? localStorage.getItem('token') : null,
  loading: false,
  error: null
};

// Create the store
function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>(initialState);

  return {
    subscribe,
    login: async (identifier: string, password: string) => {
      update(state => ({ ...state, loading: true, error: null }));
      try {
        const response = await api.post('/api/login', { identifier, password });
        const { token, user } = response.data;
        
        if (browser) {
          localStorage.setItem('token', token);
        }
        
        set({ user, token, loading: false, error: null });
        return true;
      } 
      catch (err: any) {
        const errorMessage = err.response?.data?.error || err.message || 'Login failed';
        update(state => ({ user: null, token: null, loading: false, error: errorMessage }));
        return false;
      }
    },
    register: async (name: string, username:string, email: string, password: string) => {
      update(state => ({ ...state, loading: true, error: null }));
      try {
        const response = await api.post('/auth/register', { name, username, email, password });
        const { token, user } = response.data;
        
        if (browser) {
          localStorage.setItem('token', token);
        }
        
        set({ user, token, loading: false, error: null });
        return true;
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || 'Registration failed';
        update(state => ({ ...state, loading: false, error: errorMessage }));
        return false;
      }
    },
    logout: async () => {
      try {
        await api.post('/auth/logout');
      } catch (err) {
        console.error('Logout error:', err);
      }
      
      if (browser) {
        localStorage.removeItem('token');
      }
      
      set({ user: null, token: null, loading: false, error: null });
    },
    refreshUser: async () => {
      const token = browser ? localStorage.getItem('token') : null;
      if (!token) return false;
      
      update(state => ({ ...state, loading: true }));
      try {
        const response = await api.get('/user/me');
        update(state => ({ 
          ...state, 
          user: response.data.user, 
          loading: false 
        }));
        return true;
      } catch (err) {
        if (browser) {
          localStorage.removeItem('token');
        }
        set({ user: null, token: null, loading: false, error: null });
        return false;
      }
    },
    refreshToken: async () => {
      update(state => ({ ...state, loading: true }));
      try {
        const response = await api.post('/auth/refresh');
        const { token, user } = response.data;
        
        if (browser) {
          localStorage.setItem('token', token);
        }
        
        update(state => ({ 
          ...state, 
          token, 
          user, 
          loading: false 
        }));
        return true;
      } catch (err) {
        if (browser) {
          localStorage.removeItem('token');
        }
        set({ user: null, token: null, loading: false, error: null });
        return false;
      }
    },
    clearError: () => {
      update(state => ({ ...state, error: null }));
    }
  };
}

export const auth = createAuthStore();
export const isAuthenticated = derived(auth, $auth => !!$auth.user);
export const user = derived(auth, $auth => $auth.user);