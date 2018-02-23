export const signIn = (authenthicated = false) => {
    return {
        type: 'SIGN_IN',
        authenthicated
    };
};

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    };
};
