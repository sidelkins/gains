<!-- <script lang="ts">
import '../app.css';
let { children } = $props();
</script>

{@render children()} -->
<script lang="ts">
import { onMount } from 'svelte';
import { auth } from '$lib/stores/auth';
import { navigating } from '$app/stores';
import { page } from '$app/stores';

let { children } = $props();

let isLoading = $state(true);

onMount(async () => {
	// Try to refresh the user state on initial load
	await auth.refreshUser();
	isLoading = false;
});

let currentPath = $page.url.pathname;
let isPublicRoute = $derived(['/login', '/register'].includes(currentPath));
</script>

<svelte:head>
<title>SvelteKit Auth App</title>
</svelte:head>

<div class="app">
	<header>
		<nav>
		<a href="/">Home</a>
		{#if $auth.user}
			<a href="/dashboard">Dashboard</a>
			<a href="/profile">Profile</a>
			<button on:click={() => auth.logout()}>Logout</button>
		{:else}
			<a href="/login">Login</a>
			<a href="/register">Register</a>
		{/if}
		</nav>
	</header>

	<main>
		{#if isLoading}
		<p>Loading...</p>
		{:else if !$auth.user && !isPublicRoute}
		<p>Please <a href="/login">login</a> to continue</p>
		{:else}
			{@render children()}
		{/if}
	</main>
</div>