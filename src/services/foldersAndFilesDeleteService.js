import { baseDeleteService } from "./base/baseDeleteService";

export async function foldersAndFilesDeleteService(token, filesIds, foldersIds) {
    const endpoint = `/Delete/FoldersAndFiles`
    const body = {
        foldersIds,
        filesIds
    };

    return await baseDeleteService(token, endpoint, body);
}
