<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
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

    <form method="post" use:enhance>
      <label class="form-control">
          <div class="label">
              <span class="label-text">Username or Email</span>
          </div>
          <input class="input input-bordered" 
            id="identifier"
            name="identifier"
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
            name="password"
            bind:value={password} 
            required 
            autocomplete="current-password"
          />
      </label>

      <button class="btn btn-primary" type="submit">Log in</button>
    </form>

    {#if ($page.form?.message && $page.form?.message.length > 1) || $page.form?.type === 'error'}
      <div class="mt-4 p-2 bg-red-100 text-red-600 rounded-md text-sm">
        {$page.form.message}
      </div>
    {/if}

  </div>
</div>