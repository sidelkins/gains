<script lang="ts">
    import type { NutritionEntry } from "$lib/types";
    import Form from "./Form.svelte";
    import Table from "./Table.svelte";
    //export let data: NutritionEntry[];
    let { data } = $props();
</script>

<div class="container mx-auto p-4">
    <Form />
    <Table entries={data.props?.entries} />
</div>