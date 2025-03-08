<script lang="ts">
    import type { NutritionEntry } from "$lib/types";
    import { enhance } from "$app/forms";

    export let entries: NutritionEntry[] | undefined;

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
            .map(entry => entry.id); // Assuming each entry has an `id` field
    }
</script>

<!-- Toolbar with delete button -->
<div class="flex justify-end mb-4">
    <form method="POST" action="?/delete" use:enhance>
        <input type="hidden" name="ids" value={getSelectedIds().join(',')} />
        <button class="btn btn-error" type="submit" disabled={getSelectedIds().length === 0}>
            Delete Selected
        </button>
    </form>
</div>

<div class="overflow-x-auto">
    <table class="table">
        <!-- head -->
        <thead>
            <tr>
                <th>
                    <label>
                        <input type="checkbox" class="checkbox" disabled={!entries} />
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