export const initialState = {
  id: null,
  parentFolderId: null,
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
        parentFolderId: action.payload.parentFolderId,
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
          ...action.payload.files
        ],
        childFolders: [
          ...state.childFolders,
          ...action.payload.childFolders
        ],
      };
      case "RENAME_FOLDER":
        return {
          ...state,
          childFolders: state.childFolders.map((cf) =>
            cf.id === action.payload.id ? { ...cf, folderDetails: { ...cf.folderDetails, name: action.payload.name} } : cf
          ),
        };
      
      case "RENAME_FILE":
        return {
          ...state,
          files: state.files.map((f) =>
            f.id === action.payload.id ? { ...f, fileDetails: { ...f.fileDetails, name: action.payload.name} } : f
          ),
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
