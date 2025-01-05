export const initialState = {
    id: null,
    name: null,
    childFolders: [],
    files: [],
    path: [],
    loading: false,
    error: null,
};
  
  export default function FolderReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_OPENED_FOLDER':
            return {
            ...state,
            id: action.payload.id,
            childFolders: action.payload.childFolders,
            files: action.payload.files,
            name: action.payload.name,
            path: action.payload.path,
            };
        case 'SET_LOADING':
            return {
            ...state,
            loading: action.payload,
            };
        case 'SET_ERROR':
            return {
            ...state,
            error: action.payload,
            };
      default:
        return state;
    }
  }