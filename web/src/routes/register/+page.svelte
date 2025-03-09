<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';

  // let username = '';
  // let email = '';
  // let password = '';
  // let confirmPassword = '';
  // let error = '';

  // async function register() {
  //   error = '';

  //   if (password !== confirmPassword) {
  //     error = 'Passwords do not match';
  //     return;
  //   }

  //   const res = await fetch(`${env.PUBLIC_API_URL}/register`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ 
  //       username, 
  //       email, 
  //       password 
  //     })
  //   });

  //   const data = await res.json();

  //   if (!res.ok) {
  //     error = data.error || 'Registration failed';
  //     return;
  //   }

  //   // Redirect to login or dashboard after success
  //   goto('/login');
  // }
</script>

<div class="min-h-screen bg-no-repeat bg-cover flex items-center justify-center">
<div class="flex flex-col gap-4 rounded-box bg-base-200 p-6 max-w-md">
  <h1 class="text-3xl font-bold self-center">Create an account</h1>

  <span class="self-center">
      Already have an account?
      <a class="link link-secondary" on:click={goto('login')}>Log in</a>
  </span>

  <!-- <a class="btn btn-neutral">
      <i class="fa-brands fa-google text-primary"></i>
      Create with Google
  </a>

  <div class="divider my-0">OR</div> -->
  <form method="post" use:enhance
    class="flex flex-col gap-4 rounded-box bg-base-200 p-6 max-w-md">
  <label class="form-control">
    <div class="label">
        <span class="label-text">Username</span>
    </div>

    <input class="input input-bordered" 
      type="username" 
      id="username" 
      name="username"
      required 
      autocomplete="username"
      />
  </label>

  <label class="form-control">
      <div class="label">
          <span class="label-text">Email</span>
      </div>

      <input class="input input-bordered" 
        type="email" 
        id="email" 
        name="email"
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
        required 
        autocomplete="new-password"
        />
  </label>

  <label class="form-control">
      <div class="label">
          <span class="label-text">Confirm password</span>
      </div>

      <input class="input input-bordered" 
        type="password" 
        id="confirmPassword" 
        name="password"
        required 
        autocomplete="new-password"
      />
  </label>

  <button type="submit" class="btn btn-primary">Create</button>
  </form>

</div>
</div>
<!-- <script lang="ts">
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
</div> -->