import axios from "axios";

export async function foldersAndFilesPasteService(token, body) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}/copy/foldersandfiles/`;

    return axios.post(url, body, {
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
