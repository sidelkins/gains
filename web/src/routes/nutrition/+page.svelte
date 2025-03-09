<script lang="ts">
    import type { NutritionEntry } from "$lib/types";
    import Form from "./Form.svelte";
    import Table from "$lib/components/Table.svelte";
    import { isDev } from "$lib";

    let { data } = $props();
    const hiddenProps = isDev ? [] : [ 'id', 'userId', 'createdAt' ];
</script>

<div class="container mx-auto p-4">
    <Form />
    <Table {hiddenProps} entries={data.props?.entries} />
</div>