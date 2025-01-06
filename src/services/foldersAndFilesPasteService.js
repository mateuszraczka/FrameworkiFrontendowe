import { basePostService } from "./base/basePostService";

export async function foldersAndFilesPasteService(token, body) {
    const endpoint = `/copy/foldersandfiles/`;

    console.log(body)

    return await basePostService(token, endpoint, body);
}
