import { basePostService } from './base/basePostService';

export async function createNewFolderService(token, body) {
    const endpoint = "/folder";
    
    return await basePostService(token, endpoint, body);
}