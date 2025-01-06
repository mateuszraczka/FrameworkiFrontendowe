import { basePostService } from './base/basePostService';

export async function registerService(email, password) {
    const endpoint = "/user/register";
    const body = {
        username: email,
        email: email,
        password: password
    }
    
    return await basePostService("", endpoint, body);
}