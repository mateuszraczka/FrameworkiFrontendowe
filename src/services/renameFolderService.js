import { basePatchService } from './base/basePatchService';

export async function renameFolderService(token, body) {
    const endpoint = "/folder/rename";
    
    return await basePatchService(token, endpoint, body);
}