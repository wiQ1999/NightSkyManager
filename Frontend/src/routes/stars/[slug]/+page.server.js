import { getRequest, putRequest } from "$lib/tools/apiRequests";

export async function load({ params }) {
    return {
        star: await (await getRequest(`stars/${params.slug}`)).json(),
        constellations: await (await getRequest('constellations')).json()
    }
}

export const actions = {
    default: async ({ params, request }) => {
        const data = await request.formData()
        const row = {
            name: await data.get('row-name'),
            description: await data.get('row-description'),
            link: await data.get('row-link'),
            related: (await data.getAll('related')).map(value => parseInt(value))
        }

        const response = await putRequest(`stars/${params.slug}`, row)

        return {
            isCreated: response.ok,
            row: row
        }
    }
}