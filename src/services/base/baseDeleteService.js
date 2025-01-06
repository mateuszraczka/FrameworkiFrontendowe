import axios from "axios";

export async function baseDeleteService(token, endpoint, body) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = baseUrl + endpoint;

    return axios.delete(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        data: body,
    })
    .then(response => {
        if (response.data.error) {
            throw new Error(response.data.error);
        }
        return response.data;
    })
    .catch(error => {
        console.error('Network error:', error);
        throw error;
    });
}
