import axios from "axios";

export async function getFolderService(token, id) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = id ? `${baseUrl}/folder/path/${id}` : `${baseUrl}/folder`;

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