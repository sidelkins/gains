<script lang="ts">
    import Table from "$lib/components/Table.svelte";
    let { data } = $props();
    let hiddenProps = [ 'id', 'userId', 'createdAt' ];
</script>

<div class="container mx-auto p-4">
    <Table {hiddenProps} entries={data.props?.entries} />
</div>