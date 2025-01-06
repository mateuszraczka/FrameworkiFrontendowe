export const initialState = {
    copied: {
        filesIds: [],
        foldersIds: []
    },
    downloading: [],
};

export default function ActionsReducer(state = initialState, action) {
    switch (action.type) {
        case "COPY_FILE":
            return {
                ...state,
                copied: {
                    ...state.copied,
                    filesIds: [...state.copied.filesIds, action.payload],
                }
            }
        case "COPY_FOLDER":
            return {
                ...state,
                copied: {
                    ...state.copied,
                    foldersIds: [action.payload]
                }
            }
        case "CUT_FILE":
            return {
                ...state,
                copied: {
                    ...state.copied,
                    filesIds: [...state.copied.filesIds, action.payload],
                }
            }
        case "CUT_FOLDER":
            return {
                ...state,
                copied: {
                    ...state.copied,
                    foldersIds: [...state.copied.foldersIds, action.payload],
                }
            }
        case "PASTE":
            return {
                ...state,
                copied: {
                    filesIds: [],
                    foldersIds: []
                }
            }
        case "ADD_DOWNLOAD":
            return {
                ...state,
                downloading: [...state.downloading, action.payload]
            }
        case "REMOVE_DOWNLOAD":
            const updatedDownloading = state.downloading.filter((download) => download.id !== action.payload)

            return {
                ...state,
                downloading: updatedDownloading
            }
        default:
            return state;
    }
}
