const initialState = {
    isLoggedIn: false,
    isSignedUp: false
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
        case 'SET_DATA':
            return {
                ...state,
                data: action.data
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
        default:
            return state;
    }
};

export default rootReducer;
