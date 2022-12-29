<script>
    import { createEventDispatcher } from "svelte";

    export let collection = [];

    let dispatch = createEventDispatcher();

    function onAdd() {
        dispatch("listAdd");
    }

    function onDetail(row) {
        dispatch("listDetail", { row });
    }

    function onDelete(row) {
        dispatch("listDelete", { row });
    }
</script>

<table>
    <tr>
        <th>Name</th>
        <th />
        <th>
            <button on:click={onAdd}>Dodaj</button>
        </th>
    </tr>
    {#each collection as row}
        <tr>
            <td>{row.name}</td>
            <td>
                <button on:click={onDetail(row)}> Szczegóły </button>
            </td>
            <td>
                <button on:click={onDelete(row)}> Usuń </button>
            </td>
        </tr>
    {/each}
</table>

{#if collection.length == 0}
    Brak rekordów
{/if}
