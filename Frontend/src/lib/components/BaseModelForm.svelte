<script>
    import { onMount } from "svelte";

    export let row;
    export let allRelated = [];
    export let linkVisible = false;

    onMount(async () => {
        if (linkVisible) showImage();
    });

    function showImage() {
        const imgUrl = row?.link ?? "";
        const formPhoto = document.getElementById("form-photo");

        const imgElement = new Image();
        imgElement.src = imgUrl;
        imgElement.style.maxHeight = "400px";
        imgElement.style.maxWidth = "400px";

        imgElement.onload = function () {
            formPhoto.appendChild(imgElement);
        };

        imgElement.onerror = function () {
            formPhoto.innerHTML = "Missing image";
        };
    }

    function isRelationChecked(id) {
        return row?.related.find((r) => r.id === id) !== undefined ?? false;
    }
</script>

<form method="POST" class="form">
    {#if linkVisible && row?.link !== null && row?.link !== ""}
        <div class="form-column" id="form-photo" />
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
        <button type="submit">Save</button>
    </div>
    <div class="form-column" id="form-related">
        <label for="related">Related:</label>
        {#each allRelated as related}
            <div>
                <p>
                    <input
                        type="checkbox"
                        name="related"
                        value={related.id}
                        checked={isRelationChecked(related.id)}
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

    label {
        font-size: large;
        font-weight: 600;
    }

    input[type="text"] {
        width: 20em;
    }

    textarea {
        width: 24em;
        height: 15em;
    }
</style>
