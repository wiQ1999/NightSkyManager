import { redirect } from "@sveltejs/kit"

export async function load({ fetch }) {
    let url = "http://localhost:3000/constellations"
    let fetchData = {
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
        }),
    }

    const response = await fetch(url, fetchData)
    const json = await response.clone().json()

    return { constellations: json ?? [] }
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData()
        const row = {
            name: await data.get('row-name'),
            description: await data.get('row-description'),
            link: await data.get('row-link'),
            related: (await data.getAll('related')).map(value => parseInt(value))
        }

        let url = "http://localhost:3000/stars"
        let fetchData = {
            method: "POST",
            headers: new Headers({
                "content-type": "application/json",
            }),
            body: JSON.stringify(row)
        }

        const response = await fetch(url, fetchData)

        if (response.ok) throw redirect(303, '/stars')

        return {
            isCreated: false,
            row: row
        }
    }
}