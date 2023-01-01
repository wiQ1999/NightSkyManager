<script>
    import BaseModelList from "$lib/components/BaseModelList.svelte";

    export let data;
</script>

<svelte:head>
    <title>Stars</title>
</svelte:head>

<section>
    <h1>Stars</h1>

    <BaseModelList bind:collection={data.stars} />
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0.6;
    }
</style>
