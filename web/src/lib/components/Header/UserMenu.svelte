<script lang="ts">
	import { goto } from '$app/navigation';
    import { logout } from '$lib/api';
    let { user } = $props();
</script>
<div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn mb-1">
        {user.username}
        <!-- <i class="fa-solid fa-chevron-down"></i> -->
    </div>

    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
        <li>
            <a class="flex" title="View profile" on:click={() => goto('profile')}>
                <!-- <img alt="Profile" src="/daisy-components/avatar.png" class="w-8 rounded-full" /> -->

                <div class="flex flex-col">
                    <h3 class="font-bold">{user.username}</h3>
                    <span class="text-xs text-accent">{user.email}</span>
                </div>
            </a>
        </li>
        <div class="divider my-0"></div>
        <li><a on:click={() => goto('settings')}>Settings</a></li>
        <div class="divider my-0"></div>
        <li><a>Sign out</a></li>
    </ul>
</div>