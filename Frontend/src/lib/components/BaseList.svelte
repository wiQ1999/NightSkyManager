<script>
    import { createEventDispatcher } from "svelte";

    export let collection = [];
    export let headerDictionary = {};

    let dispatch = createEventDispatcher();
    let isAllChecked = false;
    let checkCollection = [];

    setCheckCollection(isAllChecked);

    function setCheckCollection(boolValue) {
        checkCollection = Array(collection.length).fill(boolValue);
    }

    function onAdd() {
        dispatch("listAdd");
    }

    function onDetail(row) {
        dispatch("listDetail", { row });
    }

    function onDelete(row) {
        dispatch("listDelete", { row });
    }

    function onDeleteSelected() {
        let rows = [];
        for (let i = 0; i < checkCollection.length; i++) {
            if (checkCollection[i] == true) {
                rows.push(collection[i]);
            }
        }
        dispatch("listDeleteSelected", { rows });
    }

    function getHeaderNames() {
        return Object.keys(headerDictionary);
    }

    function getHeaderProperties() {
        return Object.values(headerDictionary);
    }

    function getDataFrmRow(row, property) {
        if (!property && property == "") {
            throw "Invalid argument named 'property'";
        }

        if (property[0] == ".") {
            property = property.slice(1);
        }

        const props = property.split(".");
        let result = row;

        for (let i = 0; i < props.length; i++) {
            if (result == null) return "";
            result = Reflect.get(result, props[i]);
        }

        return result ?? "";
    }
</script>

<br />

<button on:click={onDeleteSelected}>Usuń</button>
<button on:click={onAdd}>Dodaj</button>

<table>
    <tr>
        <th>
            <input
                type="checkbox"
                bind:checked={isAllChecked}
                on:change={setCheckCollection(isAllChecked)}
            />
        </th>
        {#each getHeaderNames() as header}
            <th>{header}</th>
        {/each}
    </tr>
    {#each collection as row, i}
        <tr>
            <td>
                <input type="checkbox" bind:checked={checkCollection[i]} />
            </td>
            {#each getHeaderProperties() as property}
                <td>{getDataFrmRow(row, property)}</td>
            {/each}
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
