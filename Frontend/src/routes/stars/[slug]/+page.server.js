export async function load({ params }) {
    return {
        star: await getStar(params.slug),
        constellations: await getConstellations()
    }
}

async function getStar(id) {
    let url = `http://localhost:3000/stars/${id}`
    let fetchData = {
        method: "GET",
        headers: new Headers({
            "content-type": "application/json"
        })
    }

    const response = await fetch(url, fetchData)

    return await response.clone().json()
}

async function getConstellations() {
    let url = "http://localhost:3000/constellations"
    let fetchData = {
        method: "GET",
        headers: new Headers({
            "content-type": "application/json"
        })
    }

    const response = await fetch(url, fetchData)

    return (await response.clone().json()) ?? []
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

        let url = `http://localhost:3000/stars/${params.slug}`
        let fetchData = {
            method: "PUT",
            headers: new Headers({
                "content-type": "application/json",
            }),
            body: JSON.stringify(row)
        }

        const response = await fetch(url, fetchData)

        return {
            isCreated: response.ok,
            row: row
        }
    }
}