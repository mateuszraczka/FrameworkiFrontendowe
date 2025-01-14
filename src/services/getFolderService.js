import { baseGetService } from "./base/baseGetService";

export async function getFolderService(token, id) {
    const endpoint = `/folder/path/${id}`;

    return await baseGetService(token, endpoint);
}