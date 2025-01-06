export const initialState = {
    auth: null,
    error: null,
    loading: false,
};

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('auth', JSON.stringify(action.payload));

            return {
                ...state,
                auth: action.payload,
            };
        case 'LOGOUT':
            localStorage.removeItem('auth');

            return {
                ...state,
                auth: null,
            };
        case 'REGISTER':
            localStorage.setItem('jwt', JSON.stringify(action.payload));

            return {
                ...state,
                auth: action.payload,
            };
    }
}