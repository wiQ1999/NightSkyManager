<script>
    import BaseModelForm from "$lib/components/BaseModelForm.svelte";

    export let data;
</script>

<section>
    <h1>STAR DETAILS</h1>

    <BaseModelForm
        row={data?.star}
        allRelated={data.constellations}
        linkVisible={true}
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
