const initialState = {
    isLoggedIn: false,
    isSignedUp: false,
    isLoading: false,
    messages: [],
    allMessages: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                isLoggedIn: true
            };

        case 'LOG_OUT':
            return {
                ...state,
                isLoggedIn: false
            };
        case 'SET_MESSAGES':
            return {
                ...state,
                messages: action.messages
            };
        case 'SET_ALL_MESSAGES':
            return {
                ...state,
                allMessages: action.messages
            };
        case 'SIGN_UP':
            return {
                ...state,
                isSignedUp: action.boolean
            };
        case 'SET_COORDINATES':
            return {
                ...state,
                coordinates: action.coordinates
            };
        case 'SET_ERROR':
            return {
                ...state,
                isLoggedIn: false
            };
        case 'UI_LOADING':
            return {
                ...state,
                isLoading: true
            };
        case 'UI_NOT_LOADING':
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

export default rootReducer;
