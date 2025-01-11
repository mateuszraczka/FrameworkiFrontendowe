import { basePatchService } from './base/basePatchService';

export async function renameFileService(token, body) {
    const endpoint = "/file/rename";
    
    return await basePatchService(token, endpoint, body);
}