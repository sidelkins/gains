<script lang="ts">
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
  </div>