<script>
    import BaseModelForm from "$lib/components/BaseModelForm.svelte";

    export let data;
    export let form;
</script>

<section>
    <h1>CREATE STAR</h1>

    <BaseModelForm row={form?.row} allRelated={data.constellations} />
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
