<script>
    import BaseModelList from "$lib/components/BaseModelList.svelte";

    export let data;
</script>

<svelte:head>
    <title>Constellations</title>
</svelte:head>

<section>
    <h1>Constellations</h1>

    <BaseModelList bind:collection={data.constellations} />
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
