import axios from 'axios';

export function registerService(email, password) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    return axios.post(`${baseUrl}/user/register`, { username: email, email, password }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (response.data.error) {
            throw new Error(response.data.error);
        }
        return response.data;
    });
}
