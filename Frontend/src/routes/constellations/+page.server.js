import { redirect } from "@sveltejs/kit"
import { getRequest, deleteRequest } from "$lib/tools/apiRequests";

export async function load() {
    const response = await getRequest("constellations")
    const json = await response.clone().json()

    return { constellations: json }
}

export const actions = {
    create: async () => {
        throw redirect(303, '/constellations/create')
    },
    detail: async ({ request }) => {
        const data = await request.formData()
        const id = data.get('id')

        throw redirect(303, `/constellations/${id}`)
    },
    delete: async ({ request }) => {
        const data = await request.formData()
        const id = data.get('id')

        await deleteRequest(`constellations/${id}`)

        return { isDeleted: true }
    }
};