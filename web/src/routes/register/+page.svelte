<script lang="ts">
  import { goto } from '$app/navigation';
  import { auth } from '$lib/stores/auth';
  
  let name = '';
  let username = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let isSubmitting = false;
  let validationError = '';
  
  async function handleRegister(event: SubmitEvent) {
    event.preventDefault();
    
    // Clear previous errors
    validationError = '';
    auth.clearError();
    
    // Validate password match
    if (password !== confirmPassword) {
      validationError = 'Passwords do not match';
      return;
    }
    
    // Validate password strength
    if (password.length < 6) {
      validationError = 'Password must be at least 6 characters';
      return;
    }
    
    isSubmitting = true;
    const success = await auth.register(name, username, email, password);
    isSubmitting = false;
    
    if (success) {
      goto('/dashboard');
    }
  }
</script>
  
<div class="register-container">
  <h1>Register</h1>
  
  {#if validationError}
    <div class="error">
      {validationError}
    </div>
  {/if}
  
  {#if $auth.error}
    <div class="error">
      {$auth.error}
    </div>
  {/if}
  
  <form on:submit={handleRegister}>
    <div class="form-group">
      <label for="name">Full Name</label>
      <input 
        type="text" 
        id="name" 
        bind:value={name} 
        required 
        autocomplete="name"
      />
    </div>

    <div class="form-group">
      <label for="username">Username</label>
      <input 
        type="username" 
        id="username" 
        bind:value={username} 
        required 
        autocomplete="username"
      />
    </div>
    
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
        autocomplete="new-password"
      />
    </div>
    
    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input 
        type="password" 
        id="confirmPassword" 
        bind:value={confirmPassword} 
        required 
        autocomplete="new-password"
      />
    </div>
    
    <button type="submit" class="button" disabled={isSubmitting}>
      {isSubmitting ? 'Registering...' : 'Register'}
    </button>
  </form>
  
  <p class="login-link">
    Already have an account? <a href="/login">Login</a>
  </p>
</div>