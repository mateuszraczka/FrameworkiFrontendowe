import axios from "axios";

export async function baseGetService(token, endpoint) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = baseUrl + endpoint;

    return axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
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