export const logIn = (authenthicated = false) => {
    return {
        type: 'LOG_IN',
        authenthicated
    };
};

export const logOut = () => {
    return {
        type: 'LOG_OUT'
    };
};
