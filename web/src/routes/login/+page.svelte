<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
</script>

<div class="min-h-screen bg-no-repeat bg-cover flex items-center justify-center">
  <form method="post" use:enhance 
  class="flex flex-col gap-4 rounded-box bg-base-200 p-6 max-w-md">
    <h1 class="text-3xl font-bold self-center">Log in</h1>

    <span class="self-center">
        Don't have an account?
        <a class="link link-secondary" on:click={() => goto('register')}>Register</a>
    </span>

      <label class="form-control">
          <div class="label">
              <span class="label-text">Username or Email</span>
          </div>
          <input
            class="input input-bordered"
            id="identifier"
            name="identifier"
            required
            autocomplete="email"
          />
      </label>

      <label class="form-control">
          <div class="label">
              <span class="label-text">Password</span>
          </div>
          <input
            class="input input-bordered"
            type="password"
            id="password"
            name="password"
            required
            autocomplete="current-password"
          />
      </label>

      <button class="btn btn-primary" type="submit">Log in</button>

    {#if ($page.form?.message && $page.form?.message.length > 1)}
      {#if $page.form.success}
        <div class="mt-4 p-2 bg-green-100 text-green-600 rounded-md text-sm">
          {$page.form.message}
        </div>
      {:else if !$page.form.success}
        <div class="mt-4 p-2 bg-red-100 text-red-600 rounded-md text-sm">
          {$page.form.message}
        </div>
      {/if}
    {/if}
    </form>
</div>