import { basePostService } from './base/basePostService';

export async function renameFolderService(token, body) {
    const endpoint = "/folder/rename";
    
    return await basePostService(token, endpoint, body);
}