import axios from "axios";

export async function basePatchService(token, endpoint, body) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = baseUrl + endpoint;

    return await axios.patch(url, body, {
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
