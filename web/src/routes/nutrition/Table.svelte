<script lang="ts">
    import type { NutritionEntry } from "$lib/types";
    import { enhance } from "$app/forms";

    export let entries: NutritionEntry[];

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
            .map(entry => entry.id);;
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
                <th>Date</th>
                <th>Description</th>
                <th>Calories</th>
                <th>Protein</th>
                <th>Carbs</th>
                <th>Fat</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#if entries}
                {#each entries as entry, index}
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" class="checkbox" bind:checked={selectedEntries[index]} />
                            </label>
                        </th>
                        <td>
                            <div class="flex items-center gap-3">
                                {entry.date}
                            </div>
                        </td>
                        <td>{entry.description}</td>
                        <td>{entry.calories}</td>
                        <td>{entry.protein}</td>
                        <td>{entry.carbs}</td>
                        <td>{entry.fat}</td>
                    </tr>
                {/each}
            {:else}
                <!-- TODO: Display no entries text -->
            {/if}
        </tbody>
        <!-- foot -->
        <tfoot>
            <tr>
                <th></th>
                <th>Date</th>
                <th>Description</th>
                <th>Calories</th>
                <th>Protein</th>
                <th>Carbs</th>
                <th>Fat</th>
                <th></th>
            </tr>
        </tfoot>
    </table>
</div>