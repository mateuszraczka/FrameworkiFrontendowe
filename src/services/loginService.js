import { basePostService } from './base/basePostService';

export async function loginService(username, password) {
    const endpoint = "/user/login";
    const body = {username, password};

    return await basePostService("", endpoint, body);;
}
