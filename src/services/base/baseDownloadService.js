import axios from "axios";
import { saveAs } from "file-saver";

export async function baseDownloadService(token, endpoint, name) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = baseUrl + endpoint;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
        });

        const filename = name == null
            ? "downloaded_file"
            : name

        saveAs(response.data, filename);
    } catch (error) {
        console.error("File download failed:", error);
        throw error;
    }
}
