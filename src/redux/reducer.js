const initialState = {
    isLoggedIn: false,
    count: 1
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                isSignedIn: true
            };
            break;

        case 'LOG_OUT':
            return {
                ...state,
                isSignedIn: false
            };
            break;
        case 'SET_DATA':
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
};

export default rootReducer;
