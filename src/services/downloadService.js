import { baseDownloadService } from "./base/baseDownloadService";

export async function downloadService(token, id, name) {
    const endpoint = `/file/download/${id}`

    return await baseDownloadService(token, endpoint, name);
}