import { AsyncStorage } from 'react-native';

const url = 'https://jodysmith.ca/';

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
                } else {
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
                    dispatch(signUp(json.res));
                } else {
                    ToastAndroid.show('sign up failed', ToastAndroid.SHORT);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const attemptLogOut = data => {
    return dispatch => {
        fetch('http://jodysmith.ca:5000/logout', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(x => x.json())
            .then(json => {
                if (json.res) {
                    dispatch(logOut());

                    console.log('in logout function');
                } else {
                }
            });
    };
};

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

export const updatePosition = coordinates => {
    return {
        type: 'SET_COORDINATES',
        coordinates
    };
};

export const storeSession = sessionID => {
    return dispatch => {
        dispatch();
        AsyncStorage.setItem('spot:sessionID', sessionID);
    };
};
export const checkSessionID = () => {
    return dispatch => {
        fetch('https://jodysmith.ca/login', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({})
        })
            .then(res => {
                console.log(`!!!!!!!!!!!!!!!!!`, res.text());
                res.json();
            })

            .then(json => {
                if (json.res) {
                    dispatch(logIn(true));
                }
            })
            .catch(err => console.log(err));
    };
};

export const checkLocation = coordinates => {
    return dispatch => {
        fetch(url + 'locCheck', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(coordinates)
        })
            .then(res => res.json())
            .then(res => {
                console.log('response body: ', res);

                //if res.res exists, it is a failure
                if (res.res) {
                    dispatch(setData([]));
                } else dispatch(setData(res));
            });
    };
};

export const listReadAll = () => {
    return dispatch => {
        fetch(url + 'listReadAll', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ showme: 'lists' })
        })
            .then(res => {
                res.json();
            })
            .then(json => {
                if (json.res === false) {
                    dispatch(json.res);
                }
                dispatch(listReadError());
            });
    };
};

export const listReadError = () => {
    return {
        type: 'SET_ERROR'
    };
};
