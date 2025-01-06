export const initialState = {
  id: null,
  childFolders: [],
  files: [],
  path: [],
};

export default function FolderReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_OPENED_FOLDER":
      return {
        ...state,
        id: action.payload.id,
        childFolders: action.payload.childFolders,
        files: action.payload.files,
        path: action.payload.path,
      };
    case "BATCH_DELETE_FOLDERS":
      return {
        ...state,
        childFolders: state.childFolders.filter(
          (cf) => !action.payload.foldersIds.includes(cf.id)
        ),
      };
    case "ADD_FOLDERS_FILES":
      return {
        ...state,
        files: [
          ...state.files,
          ...action.payload.files.filter(
            (file) => !state.files.some((cf) => cf.id === file.id)
          ),
        ],
        childFolders: [
          ...state.childFolders,
          ...action.payload.childFolders.filter(
            (folder) =>
              folder.id !== state.id &&
              !state.childFolders.some((cf) => cf.id === folder.id)
          ),
        ],
      };
    case "BATCH_DELETE_FILES":
      return {
        ...state,
        files: state.files.filter(
          (f) => !action.payload.filesIds.includes(f.id)
        ),
      };
    case "BATCH_DELETE_FOLDERS_FILES":
      return {
        ...state,
        files: state.files.filter(
          (f) => !action.payload.filesIds.includes(f.id)
        ),
        childFolders: state.childFolders.filter(
          (cf) => !action.payload.foldersIds.includes(cf.id)
        ),
      };
    default:
      return state;
  }
}
