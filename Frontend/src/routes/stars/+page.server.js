import { redirect } from "@sveltejs/kit"

export async function load({ fetch }) {
    let url = "http://localhost:3000/stars"
    let fetchData = {
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
        }),
    };

    const response = await fetch(url, fetchData)
    const json = await response.clone().json()

    return { stars: json }
}

export const actions = {
    create: async () => {
        throw redirect(303, '/stars/create')
    },
    detail: async ({ request }) => {
        const data = await request.formData()
        const id = data.get('id')

        throw redirect(303, `/stars/${id}`)
    },
    delete: async ({ request }) => {
        const data = await request.formData()
        const id = data.get('id')

        let url = `http://localhost:3000/stars/${id}`
        let fetchData = {
            method: "DELETE",
            headers: new Headers({
                "content-type": "application/json",
            }),
        };

        await fetch(url, fetchData)

        return { isDeleted: true }
    }
};