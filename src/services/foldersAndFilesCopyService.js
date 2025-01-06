import { basePostService } from "./base/basePostService";

export async function foldersAndFilesCopyService(token, body) {
    const endpoint = `/copy/foldersandfiles/`;

    return await basePostService(token, endpoint, body);
}
