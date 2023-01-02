import { redirect } from "@sveltejs/kit"
import { getRequest, deleteRequest } from "$lib/tools/apiRequests";

export async function load() {
    const response = await getRequest("stars")
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

        await deleteRequest(`stars/${id}`)

        return { isDeleted: true }
    }
};