<script>
    import BaseModelList from "$lib/components/BaseModelList.svelte";
    import { goto } from "$app/navigation";

    export let data;

    function addHandler(event) {
        goto(`/stars/create`);
    }
    function detailHandler(event) {
        goto(`/stars/${event.detail.row.id}`);
    }
    async function deleteHandler(event) {
        // await deleteUser(event.detail.row.id);
        // window.location.reload();
    }
</script>

<svelte:head>
    <title>Stars</title>
</svelte:head>

<section>
    <h1>Stars</h1>

    <BaseModelList
        bind:collection={data.stars}
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
