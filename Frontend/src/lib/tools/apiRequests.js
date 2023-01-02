const host = "http://localhost:3000/"
const headers = new Headers({
    "content-type": "application/json"
})

export async function postRequest(url, body = null) {
    return await request(url, "POST", body)
}

export async function getRequest(url, body = null) {
    return await request(url, "GET", body)
}

export async function putRequest(url, body = null) {
    return await request(url, "PUT", body)
}

export async function deleteRequest(url, body = null) {
    return await request(url, "DELETE", body)
}

async function request(url, httpMethod, body = null) {
    let fullUrl = host + url
    let fetchData = {
        method: httpMethod,
        headers: headers,
        body: body == null ? null : JSON.stringify(body)
    }

    return await fetch(fullUrl, fetchData)
}