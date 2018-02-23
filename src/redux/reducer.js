const rootReducer = (state, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                isSignedIn: true
            };
        case 'SIGN_OUT':
            return {
                ...state,
                isSignedIn: false
            };
            break;
        default:
            return state;
    }
};

export default rootReducer;
