<script lang="ts">
	import "../app.css";
	import { page } from '$app/stores';
	import Navbar from "$lib/components/Header/Navbar.svelte";
	let { children } = $props();
	let isLoading = $state(true);
</script>

<Navbar />
{@render children()}