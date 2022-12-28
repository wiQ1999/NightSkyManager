export async function load() {
    await genericGetAll();
}

async function genericGetAll() {
    let url = "http://localhost:3000/stars";
    let fetchData = {
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
        }),
    };

    const response = await fetch(url, fetchData);
    const json = await response.clone().json();

    console.log(json);
}