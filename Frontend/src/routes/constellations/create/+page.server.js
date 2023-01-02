import { redirect } from "@sveltejs/kit"
import { getRequest, postRequest } from "$lib/tools/apiRequests";

export async function load() {
    const response = await getRequest('stars')
    const json = await response.clone().json()

    return { stars: json ?? [] }
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

        const response = await postRequest('constellations', row)

        if (response.ok) throw redirect(303, '/constellations')

        return {
            isCreated: false,
            row: row
        }
    }
}