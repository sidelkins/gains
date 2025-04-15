<script lang="ts">
  import { goto } from '$app/navigation';
  import { redirect } from '@sveltejs/kit';
  import { onMount } from 'svelte';

  let { data } = $props();
  let isLoading = $state(true);
</script>

<div class="flex justify-center">
  <div class="flex justify-center">
      <div class="flex flex-col items-center text-center gap-6 max-w-xl">    
          <h1 class="text-5xl font-bold">gains.</h1>
  
          <span class="">
              Maximize your health and fitness journey with gains—your all-in-one app for tracking calories, macronutrients, supplements, vitamins, and hydration effortlessly!
          </span>
  
          <div class="flex flex-col gap-4">
              <a class="btn btn-primary" on:click={() => goto('register')}>
                  Get started
              </a>

              <span>Already have an account? <a class="link link-secondary" on:click={() => goto('login')}>Log in</a></span>
  
              <!-- <a class="btn btn-neutral">
                  See our blog
                  <i class="fa-solid fa-blog"></i>
              </a> -->
          </div>
      </div>
  </div>
</div>