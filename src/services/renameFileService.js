import { basePostService } from './base/basePostService';

export async function renameFileService(token, body) {
    const endpoint = "/file/rename";
    
    return await basePostService(token, endpoint, body);
}