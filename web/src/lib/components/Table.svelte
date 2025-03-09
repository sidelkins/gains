<script lang="ts">
    import { enhance } from "$app/forms";
    
    export let entries: any;
    export let hiddenProps: string[];

    // Track selected rows using an array of booleans
    let selectedEntries: boolean[] = [];

    // Initialize the selectedEntries array when entries change
    $: if (entries) {
        selectedEntries = Array(entries.length).fill(false);
    }

    // Function to get the IDs of selected rows
    function getSelectedIds() {
        if (!entries) return [];
        return entries
            .filter((_, index) => selectedEntries[index])
            .map(entry => entry.id);
    }

    // Function to toggle all entries
    function toggleAll(event: Event) {
        const target = event.target as HTMLInputElement;
        const isChecked = target.checked;
        selectedEntries = selectedEntries.map(() => isChecked);
    }

    // Reactive statement to update the header checkbox state
    $: allSelected = entries && entries.length > 0 && selectedEntries.every(selected => selected);
    $: someSelected = entries && entries.length > 0 && selectedEntries.some(selected => selected);

    // Get the keys from the first entry to generate table headers, excluding hiddenProps
    $: keys = entries.length > 0 
        ? Object.keys(entries[0]).filter(key => !hiddenProps.includes(key)) 
        : [];

    // Function to capitalize the first letter of a string
    function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
</script>

<div class="overflow-x-auto">
    <div class="flex justify-start">
        <form method="POST" action="?/delete" use:enhance>
            <input type="hidden" name="ids" value={getSelectedIds()} />
            <button class="btn btn-error" type="submit" disabled={getSelectedIds().length === 0}>
                Delete
            </button>
        </form>
    </div>
    {#if entries.length > 0}
    <table class="table">
        <thead>
            <tr>
                <th>
                    <label>
                        <input type="checkbox" class="checkbox"
                            bind:checked={allSelected}
                            on:change={toggleAll}
                            indeterminate={someSelected && !allSelected}
                            disabled={entries.length == 0} />
                    </label>
                </th>
                {#each keys as key}
                    <th>{capitalizeFirstLetter(key)}</th>
                {/each}
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#each entries as entry, index}
                <tr>
                    <th>
                        <label>
                            <input type="checkbox" class="checkbox" bind:checked={selectedEntries[index]} />
                        </label>
                    </th>
                    {#each keys as key}
                        <td>
                            <div class="flex items-center gap-3">
                                {entry[key]}
                            </div>
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
        <tfoot>
            <tr>
                <th></th>
                {#each keys as key}
                    <th>{capitalizeFirstLetter(key)}</th>
                {/each}
                <th></th>
            </tr>
        </tfoot>
    </table>
    {:else}
    <div class="flex justify-center">
        <span>No entries yet!</span>
    </div>
    {/if}
</div>