import axios from 'axios';

export async function uploadFileService(token, folderId, file) {
  if (!folderId || !file) {
    throw new Error('Folder ID and file are required.');
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const endpoint = `/file/${folderId}`;
  const url = baseUrl + endpoint;
  const formData = new FormData();
  formData.append('fileData', file);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('File upload failed:', error.response?.data || error.message);
    throw error;
  }
}
