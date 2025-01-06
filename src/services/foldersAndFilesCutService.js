import { basePostService } from "./base/basePostService";

export async function foldersAndFilesCutService(token, body) {
    const endpoint = `/cut/foldersandfiles/`;

    return await basePostService(token, endpoint, body);
}
