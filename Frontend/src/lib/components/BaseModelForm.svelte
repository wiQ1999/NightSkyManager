<script>
    export let row;
    console.log(row);
    export let allRelated = [];
    export let linkVisible = false;
</script>

<form method="POST" class="form">
    {#if linkVisible && row?.link === true}
        <div class="form-column" id="form-photo">
            <img
                src={row?.link}
                alt={row?.name ?? "image"}
                title={row?.name ?? "title"}
            />
        </div>
    {/if}
    <div class="form-column" id="form-values">
        <label for="row-name">Nazwa:</label>
        <br />
        <input
            type="text"
            id="row-name"
            name="row-name"
            value={row?.name ?? ""}
            required
        />
        <br />
        <br />
        <label for="row-description">Description:</label>
        <br />
        <textarea
            id="row-description"
            name="row-description"
            value={row?.description ?? ""}
        />
        <br />
        <br />
        <label for="row-link">Photo link:</label>
        <br />
        <input
            type="text"
            id="row-link"
            name="row-link"
            value={row?.link ?? ""}
        />
        <br />
        <br />
        <br />
        <button type="submit">Create</button>
    </div>
    <div class="form-column" id="form-related">
        Related constellations:
        {#each allRelated as related}
            <div>
                <p>
                    <input
                        type="checkbox"
                        name="related"
                        value={related.id}
                        checked={row?.related.includes(related.id) ?? false}
                    />
                    {related.name}
                </p>
            </div>
        {/each}
    </div>
</form>

<style>
    .form {
        display: flex;
    }

    .form-column {
        margin: 1em;
    }

    #form-photo {
        padding: 2em;
    }
</style>
