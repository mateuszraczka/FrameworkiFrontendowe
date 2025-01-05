export const initialState = {
    activeContextMenu: null,
  };
  
  export default function ContextMenuReducer(state = initialState, action) {
    switch (action.type) {
      case 'OPEN_CONTEXT_MENU':
        return {
          ...state,
          activeContextMenu: action.payload,
        };
      case 'CLOSE_CONTEXT_MENU':
        return {
          ...state,
          activeContextMenu: null,
        };
      default:
        return state;
    }
  }
  