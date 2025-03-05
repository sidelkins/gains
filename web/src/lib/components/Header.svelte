<script lang="ts">
    import { goto } from "$app/navigation";
    import { auth } from "$lib/stores/auth";
    import Avatar from "./Avatar.svelte";
</script>
  
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>

        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          {#if $auth.isAuthenticated}
          <li><a on:click={() => goto('/dashboard')}>Dashboard</a></li>
          <li><a on:click={() => goto('/nutrition')}>Calories and Macros</a></li>
          <li><a on:click={() => goto('/supplements')}>Supplements</a></li>
          <li><a on:click={() => goto('/vitamins')}>Vitamins</a></li>
          <li><a on:click={() => goto('/hydration')}>Hydration</a></li>
          {/if}
        </ul>
      </div>
      <a on:click={() => goto('/')} class="btn btn-ghost text-xl">gains.</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        {#if $auth.isAuthenticated}
        <li><a on:click={() => goto('dashboard')}>Dashboard</a></li>
        <li><a on:click={() => goto('nutrition')}>Calories and Macros</a></li>
        <li><a on:click={() => goto('supplements')}>Supplements</a></li>
        <li><a on:click={() => goto('vitamins')}>Vitamins</a></li>
        <li><a on:click={() => goto('hydration')}>Hydration</a></li>
        {/if}
      </ul>
    </div>
    <div class="navbar-end">
      {#if $auth.isAuthenticated}
        <Avatar user={$auth.user} />
      {:else}
        <!-- Display when user is not logged in -->
        <div class="flex gap-2">
          <a on:click={() => goto('login')} class="btn btn-ghost">Login</a>
          <a on:click={() => goto('register')} class="btn btn-ghost">Sign Up</a>
        </div>
      {/if}
    </div>
  </div>