export const initialState = {
    copied: [],
    cut: [],
    error: null,
};
  
  export default function ActionsReducer(state = initialState, action) {
    switch (action.type) {
        case "COPY":
            console.log("copy")
            return {
                ...state,
                copied: action.payload.copy
            }
        case "CUT":
            console.log("cut")
            return{
                ...state,
                cut: action.payload.cut
            }
        case "DELETE":
            console.log("delete")
            return{
                ...state,
                deleted: action.payload
            }
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload.error
            }
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload.loading
            }
      default:
        return state;
    }
  }