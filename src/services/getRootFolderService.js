import { baseGetService } from "./base/baseGetService";

export async function getRootFolderService(token) {
    const endpoint = `/folder`;

    return await baseGetService(token, endpoint);
}