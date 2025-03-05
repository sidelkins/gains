<script lang="ts">
	import "../app.css";
	import { page } from '$app/stores';

	import Header from "$lib/components/Header.svelte";

	let { children } = $props();

	let isLoading = $state(true);

	let currentPath = $page.url.pathname;
	let isPublicRoute = $derived(['/login', '/register'].includes(currentPath));
</script>

<Header />
{@render children()}