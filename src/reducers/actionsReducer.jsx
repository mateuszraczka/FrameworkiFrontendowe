export const initialState = {
    copied: {
        filesIds: [],
        foldersIds: []
    },
    cut: {
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
                },
                cut: initialState.cut
            }
        case "COPY_FOLDER":
            return {
                ...state,
                copied: {
                    ...state.copied,
                    foldersIds: [...state.copied.foldersIds, action.payload]
                },
                cut: initialState.cut
            }
        case "CUT_FILE":
            return {
                ...state,
                cut: {
                    ...state.cut,
                    filesIds: [...state.cut.filesIds, action.payload],
                },
                copied: initialState.copied
            }
        case "CUT_FOLDER":
            return {
                ...state,
                cut: {
                    ...state.cut,
                    foldersIds: [...state.cut.foldersIds, action.payload],
                },
                copied: initialState.copied
            }
        case "PASTE":
            return {
                ...state,
                copied: initialState.copied,
                cut: initialState.cut
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
