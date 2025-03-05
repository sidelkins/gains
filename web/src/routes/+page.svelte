<script lang="ts">
  import { goto } from '$app/navigation';
  import { auth, isAuthenticated } from '$lib/stores/old_auth.js';
  import { redirect } from '@sveltejs/kit';
  import { onMount } from 'svelte';

  let { data } = $props();
  let isLoading = $state(true);
</script>

{#if $isAuthenticated}
  {redirect(200, '/dashboard')}
{:else if !$isAuthenticated}
  <div class="flex justify-center">
    <div class="flex justify-center">
        <div class="flex flex-col items-center text-center gap-6 max-w-xl">    
            <h1 class="text-5xl font-bold">gains.</h1>
    
            <span class="">
                Maximize your health and fitness journey with gains—your all-in-one app for tracking calories, macronutrients, supplements, vitamins, and hydration effortlessly!
            </span>
    
            <div class="flex gap-4">
                <a class="btn btn-primary" on:click={goto('register')}>
                    Get started
                </a>
    
                <!-- <a class="btn btn-neutral">
                    See our blog
                    <i class="fa-solid fa-blog"></i>
                </a> -->
            </div>
        </div>
    </div>
  </div>
{/if}

<!-- <script lang="ts">
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
</div> -->