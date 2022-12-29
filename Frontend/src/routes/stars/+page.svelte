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

<h1>Stars</h1>

<BaseModelList
    bind:collection={data.stars}
    on:listAdd={addHandler}
    on:listDetail={detailHandler}
    on:listDelete={deleteHandler}
/>
