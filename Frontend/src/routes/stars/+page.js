export async function load({ fetch }) {
    let url = "http://localhost:3000/stars";
    let fetchData = {
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
        }),
    };

    const response = await fetch(url, fetchData);
    const json = await response.clone().json();

    return { stars: json };
}
