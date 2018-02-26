import { takeLatest, call, put, fork } from 'redux-saga/effects';
import { logIn, logOut } from './actions';
function* logInFlow(action) {
    const response = yield call(fetch, '/login', {
        method: 'POST',
        body: JSON.stringify(action.payload)
    });

    const data = response.json();

    if (data.res) yield put(logIn());
}

function* logOutFlow(action) {
    // const response = yield call(fetch, '/login', {
    //     method: 'POST',
    //     body: JSON.stringify(action.payload)
    // });
    yield put(logOut());
}

function* watchLogin() {
    yield takeLatest('ATTEMPT_LOG_IN', logInFlow);
}

function* watchLogout() {
    yield takeLatest('LOG_OUT', logoutFlow);
}

function* saga() {
    yield fork([watchLogin, watchLogout]);
}

export default saga;
