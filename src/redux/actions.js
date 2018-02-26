export const attemptLogIn = userData => {
    return dispatch => {
        fetch('http://jodysmith.ca:5000/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(x => {
                console.log(x);

                if (x.err) {
                    ToastAndroid.show(x.err, ToastAndroid.SHORT);

                    // startTabs;
                } else {
                    //this.props.logIn(true);
                    console.log('');
                    dispatch(logIn(true));
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
};
export const attemptSignUp = userData => {
    return dispatch => {
        fetch('http://jodysmith.ca:5000/signup', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.res) {
                    ToastAndroid.show('sign up successful', ToastAndroid.SHORT);
                    dispatch(signUp(true));
                } else {
                    ToastAndroid.show('sign up failed', ToastAndroid.SHORT);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const attemptLogOut = () => {};

export const signUp = boolean => {
    return {
        type: 'SIGN_UP',
        boolean
    };
};

export const logIn = authenthicated => {
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

export const setData = data => {
    return {
        type: 'SET_DATA',
        data
    };
};
