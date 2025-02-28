<script lang="ts">
  import { auth } from '$lib/stores/auth';
</script>

<div class="container">
  <h1>Welcome to SvelteKit + Fastify Auth Demo</h1>
  
  {#if $auth.user}
    <div class="welcome">
      <h2>Hello, {$auth.user.name}!</h2>
      <p>You are logged in with {$auth.user.email}</p>
      <a href="/dashboard" class="button">Go to Dashboard</a>
    </div>
  {:else}
    <div class="auth-options">
      <h2>Get Started</h2>
      <div class="buttons">
        <a href="/login" class="button">Login</a>
        <a href="/register" class="button secondary">Register</a>
      </div>
    </div>
  {/if}
</div>