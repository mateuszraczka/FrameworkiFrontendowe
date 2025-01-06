import axios from "axios";

export async function basePostService(token, endpoint, body) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = baseUrl + endpoint;

    return await axios.post(url, body, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
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
