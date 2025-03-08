<script lang="ts">
	import { goto } from '$app/navigation';
    import { logout } from '$lib/api';

	export let user: any;

	// let letter: string = user.first_name[0];

	// if (user && !user.first_name && user.username) {
	// 	letter = user.username[0];
	// }
</script>

<div class="dropdown dropdown-bottom dropdown-end" tabindex="0" role="button">
	<div class="avatar placeholder">
		<div class="bg-neutral rounded-full text-neutral-200 w-10 ml-4">
			<!-- {#if user.profile_pic}
				<img src={user.profile_pic} alt="Profile" />
			{:else}
				<span class="text-2xl -mt-1">{letter}</span>
			{/if} -->
			{user.username}
		</div>
	</div>

	<ul
		tabindex="0"
		class="dropdown-content z-[1] text-neutral-200 menu p-2 shadow bg-neutral mt-2 rounded-box w-52"
	>
		<p class="text-lg ml-4 font-bold">
			<!-- { user.first_name ? `${user.first_name} ${user.last_name}` : user.username} -->
		</p>
		<li><button on:click={() => goto('/profile')}>Profile</button></li>
		<li><button on:click={() => goto('/settings')}>Settings</button></li>
		<li><button on:click={() => logout}>Logout</button></li>
		<!-- <li><button on:click={() => goto('/logout')}>Logout</button></li> -->
		<!-- <form method="post">
			<li><button formaction="/?/logout">Logout</button></li>
		</form> -->
	</ul>
</div>
