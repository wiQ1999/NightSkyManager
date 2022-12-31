<script>
    import BaseModelList from "$lib/components/BaseModelList.svelte";
    import { goto } from "$app/navigation";

    export let data;

    function addHandler(event) {
        goto(`/constellations/create`);
    }
    function detailHandler(event) {
        goto(`/constellations/${event.detail.row.id}`);
    }
    async function deleteHandler(event) {
        // await deleteUser(event.detail.row.id);
        // window.location.reload();
    }
</script>

<svelte:head>
    <title>Constellations</title>
</svelte:head>

<section>
    <h1>Constellations</h1>

    <BaseModelList
        bind:collection={data.constellations}
        on:listAdd={addHandler}
        on:listDetail={detailHandler}
        on:listDelete={deleteHandler}
    />
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
