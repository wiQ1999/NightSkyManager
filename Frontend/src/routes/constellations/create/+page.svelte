<script>
    import BaseModelForm from "$lib/components/BaseModelForm.svelte";

    export let data;
    export let form;
</script>

<section>
    <h1>CREATE CONSTELLATION</h1>

    <BaseModelForm row={form?.row} allRelated={data.stars} />
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
