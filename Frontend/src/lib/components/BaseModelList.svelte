<script>
    import { createEventDispatcher } from "svelte";

    export let collection = [];
</script>

<table>
    <tr>
        <th>Name</th>
        <th />
        <th>
            <form method="POST" action="?/create">
                <button type="submit">Dodaj</button>
            </form>
        </th>
    </tr>
    {#each collection as row}
        <tr>
            <td>{row.name}</td>
            <td>
                <form method="POST" action="?/detail">
                    <input type="hidden" name="id" value={row.id} hidden />
                    <button type="submit">Szczegóły</button>
                </form>
            </td>
            <td>
                <form method="POST" action="?/delete">
                    <input type="hidden" name="id" value={row.id} hidden />
                    <button type="submit">Usuń</button>
                </form>
            </td>
        </tr>
    {/each}
</table>

{#if collection.length == 0}
    Brak rekordów
{/if}

<style>
    th,
    td {
        border-bottom: solid 1px;
    }
</style>
