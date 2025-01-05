import axios from 'axios';

export function loginService(username, password) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    return axios.post(`${baseUrl}/user/login`, { username, password })
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
