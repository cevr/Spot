import { AsyncStorage } from 'react-native';
import { ToastAndroid } from 'react-native';
import { SignUpPage } from '../Global/api';
import CookieManager from 'react-native-cookies';

export const attemptLogIn = userData => {
    return dispatch => {
        fetch('https://jodysmith.ca/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(json => {
                if (json.err) {
                    console.log(json.err);
                } else {
                    dispatch(logIn(userData));
                    AsyncStorage.setItem(
                        'spot:email',
                        JSON.stringify(userData)
                    );
                }
            });
    };
};
export const attemptSignUp = userData => {
    return dispatch => {
        fetch('https://jodysmith.ca/signup', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.res) {
                    dispatch(signUp(json.res));
                } else {
                    ToastAndroid.show('Sign-up failed', ToastAndroid.SHORT);
                }
            })
            .catch(err => {
                ToastAndroid.show(err, ToastAndroid.SHORT);
            });
    };
};

export const attemptLogOut = data => {
    return dispatch => {
        fetch('https://jodysmith.ca/logout', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(json => {
                console.log('LOGOUT!!!', json);
                if (json.res) {
                    CookieManager.clearAll().then(res => {
                        console.log('CookieManager.clearAll =>', res);
                        dispatch(logOut());
                        SignUpPage();
                    });

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

export const logIn = userData => {
    return {
        type: 'LOG_IN',
        email: userData.email
    };
};

export const logOut = () => {
    return {
        type: 'LOG_OUT'
    };
};

export const setMessages = messages => {
    return {
        type: 'SET_MESSAGES',
        messages
    };
};

export const setAllMessages = messages => {
    return {
        type: 'SET_ALL_MESSAGES',
        messages
    };
};

export const updatePosition = coordinates => {
    console.log('UPDATE POSITION SETTING COORDINATES', coordinates);
    return {
        type: 'SET_COORDINATES',
        coordinates
    };
};

export const storeLogin = email => {};
export const checkSessionID = () => {
    return dispatch => {
        fetch('https://jodysmith.ca/checkSession', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(json => {
                console.log('CHECK SESSION ID', json);
                if (json.res === true) {
                    dispatch(getUserEmail());
                }
            });
    };
};

export const checkLocation = coordinates => {
    console.log('checking location', coordinates);
    return dispatch => {
        dispatch(UILoading());
        const lat = coordinates.latitude,
            long = coordinates.longitude;
        fetch('https://jodysmith.ca/locCheck', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ lat, long })
        })
            .then(res => res.json())
            .then(json => {
                //if res.res exists, it is a failure
                if (json.res === false) {
                    dispatch(listEmpty());
                    dispatch(UINotLoading());
                } else {
                    dispatch(
                        setMessages(
                            json.sort((a, b) => {
                                return a.read && b.read
                                    ? 0
                                    : a.read ? 1 : b.read ? -1 : 0;
                            })
                        )
                    );
                    dispatch(UINotLoading());
                }
            });
    };
};

export const listReadAll = () => {
    return dispatch => {
        dispatch(UILoading());
        fetch('https://jodysmith.ca/listReadAll', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ showme: 'lists' })
        })
            .then(res => res.json())
            .then(json => {
                if (json.res === false) {
                    //must write conditional like this because backend only sends json.res when it encounters an error
                    dispatch(setError());
                    dispatch(UINotLoading());
                } else {
                    dispatch(
                        setAllMessages(
                            json.sort((a, b) => {
                                return a.read && b.read
                                    ? 0
                                    : a.read ? 1 : b.read ? -1 : 0;
                            })
                        )
                    );
                    dispatch(UINotLoading());
                }
            });
    };
};

export const listUpdate = (reqBody, coordinates) => {
    return dispatch => {
        fetch('http://jodysmith.ca:5000/listUpdate', {
            credentials: 'include',
            method: 'PUT',
            body: JSON.stringify(reqBody)
        })
            .then(res => res.json())
            .then(json => {
                console.log('LISTUPDATE JSON', json);
                if (json.err) dispatch(setError());
                if (json.res) {
                    dispatch({ type: 'UPDATE' });
                }
            });
    };
};

const getUserEmail = () => {
    return dispatch => {
        AsyncStorage.getItem('spot:email')
            .then(res => JSON.parse(res))
            .then(json => dispatch(logIn(json)));
    };
};

export const setError = () => {
    return {
        type: 'SET_ERROR'
    };
};

export const listEmpty = () => {
    return {
        type: 'LIST_EMPTY'
    };
};

export const UILoading = () => {
    return {
        type: 'UI_LOADING'
    };
};
export const UINotLoading = () => {
    return {
        type: 'UI_NOT_LOADING'
    };
};
