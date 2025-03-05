<script lang="ts">
	import "../app.css";
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/old_auth';
	import { page } from '$app/stores';

	import Header from "$lib/components/Header.svelte";

	let { data, children } = $props();

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


<Header {data} />
{@render children()}

	<!-- <header>
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
	</header> -->