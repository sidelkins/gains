<script lang="ts">
  import { goto } from '$app/navigation';
    import { login } from '$lib/stores/auth';

  const API_URL = 'http://192.168.1.69:3000/api'
  let identifier = '';
  let password = '';
  let error = '';

  async function handleLogin() {
      error = ''; // Clear previous error

      const res = await fetch(API_URL + '/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, password })
      });

      if (res.ok) {
          const { user, token } = await res.json();
          login(user);
          document.cookie = `jwt=${token}; path=/; Secure; HttpOnly`;
          goto('/dashboard');
      } else {
          error = 'Invalid credentials';
      }
  }
</script>

<div class="min-h-screen bg-no-repeat bg-cover flex items-center justify-center">
  <div class="flex flex-col gap-4 rounded-box bg-base-200 p-6 max-w-md">
    <h1 class="text-3xl font-bold self-center">Log in</h1>

    <span class="self-center">
        Don't have an account?
        <a class="link link-secondary" on:click={() => goto('register')}>Register</a>
    </span>

    <form on:submit|preventDefault={handleLogin}>
      <label class="form-control">
          <div class="label">
              <span class="label-text">Username or Email</span>
          </div>
          <input class="input input-bordered" 
            id="identifier" 
            bind:value={identifier} 
            required 
            autocomplete="email"
          />
      </label>

      <label class="form-control">
          <div class="label">
              <span class="label-text">Password</span>
          </div>
          <input class="input input-bordered"
            type="password"
            id="password" 
            bind:value={password} 
            required 
            autocomplete="current-password"
          />
      </label>

      <button class="btn btn-primary" type="submit">Log in</button>
    </form>

    {#if error}
      <div class="mt-4 p-2 bg-red-100 text-red-600 rounded-md text-sm">
        {error}
      </div>
    {/if}

  </div>
</div>
<!-- <script lang="ts">
  import { goto } from '$app/navigation';
  import { auth } from '$lib/stores/auth';
  
  let email = '';
  let password = '';
  let isSubmitting = false;
  
  async function handleLogin(event: SubmitEvent) {
    event.preventDefault();
    isSubmitting = true;
    
    const success = await auth.login(email, password);
    
    isSubmitting = false;
    if (success) {
      goto('/dashboard');
    }
  }
</script>
  
  <div class="login-container">
    <h1>Login</h1>
    
    {#if $auth.error}
      <div class="error">
        {$auth.error}
      </div>
    {/if}
    
    <form on:submit={handleLogin}>
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          bind:value={email} 
          required 
          autocomplete="email"
        />
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          bind:value={password} 
          required 
          autocomplete="current-password"
        />
      </div>
      
      <button type="submit" class="button" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
    
    <p class="register-link">
      Don't have an account? <a href="/register">Register</a>
    </p>
  </div> -->