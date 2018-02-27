import { AsyncStorage } from "react-native";
import { ToastAndroid } from "react-native";
import { SignUpPage } from "../Global/api";
const url = "https://jodysmith.ca/";

export const attemptLogIn = userData => {
  return dispatch => {
    fetch("http://jodysmith.ca:5000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userData),
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);

        if (json.err) {
        } else {
          dispatch(logIn(true));
          dispatch(storeSession(json.sessionid));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const attemptSignUp = userData => {
  return dispatch => {
    fetch("http://jodysmith.ca:5000/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data),
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.res) {
          dispatch(signUp(json.res));
        } else {
          ToastAndroid.show("sign up failed", ToastAndroid.SHORT);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const attemptLogOut = data => {
  return dispatch => {
    ToastAndroid.show("clicked", ToastAndroid.SHORT);
    fetch("http://jodysmith.ca:5000/logout", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data),
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => {
        console.log("LOGOUT!!!", json);
        if (json.res) {
          dispatch(logOut());
          SignUpPage();
          console.log("in logout function");
        } else {
        }
      });
  };
};

export const signUp = boolean => {
  return {
    type: "SIGN_UP",
    boolean
  };
};

export const logIn = () => {
  return {
    type: "LOG_IN"
  };
};

export const logOut = () => {
  return {
    type: "LOG_OUT"
  };
};

export const setData = data => {
  return {
    type: "SET_DATA",
    data
  };
};

export const updatePosition = coordinates => {
  return {
    type: "SET_COORDINATES",
    coordinates
  };
};

export const storeSession = sessionID => {
  return dispatch => {
    dispatch();
    AsyncStorage.setItem("spot:sessionID", sessionID);
  };
};
export const checkSessionID = () => {
  return dispatch => {
    fetch("https://jodysmith.ca/checkSession", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => {
        console.log("CHECK SESSION ID", json);
        if (json.res === true) {
          dispatch(logIn());
        }
      });
  };
};

export const checkLocation = coordinates => {
  return dispatch => {
    dispatch(UILoading());
    const lat = coordinates.latitude,
      long = coordinates.longitude;
    fetch(url + "locCheck", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ lat, long })
    })
      .then(res => res.json())
      .then(res => {
        console.log("HOME SCREEN CHECK: ", res);

        //if res.res exists, it is a failure
        if (res.res) {
          dispatch(setError());
        } else {
          dispatch(setData(res));
          dispatch(UINotLoading());
        }
      });
  };
};

export const listReadAll = () => {
  return dispatch => {
    fetch(url + "listReadAll", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ showme: "lists" })
    })
      .then(res => {
        res.json();
      })
      .then(json => {
        console.log("LIST READ ALL!!!!!", json);
        // if (json.res === false) {
        //     dispatch(json.res);
        // }
        // dispatch(setError());
      });
  };
};

export const setError = () => {
  return {
    type: "SET_ERROR"
  };
};

export const listEmpty = () => {
  return {
    type: "LIST_EMPTY"
  };
};

export const UILoading = () => {
  return {
    type: "UI_LOADING"
  };
};
export const UINotLoading = () => {
  return {
    type: "UI_NOT_LOADING"
  };
};
