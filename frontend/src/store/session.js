import csrfFetch from "./csrf";
// import { storeCSRFToken } from "./csrf";

export const RECEIVE_SESSION = 'session/RECEIVE_SESSION'; 
export const REMOVE_SESSION = 'session/REMOVE_SESSION';

const receiveSession = (user) => ({
    type: RECEIVE_SESSION,
    user
})

const removeSession = () => ({
    type: REMOVE_SESSION
})

export const logout = () => async (dispatch) => {
    const res = await csrfFetch(`api/session`, {method: 'DELETE'});
    storeCurrentUser(null);
    dispatch(removeSession());
}

export const signup = (user) => async (dispatch) => {
    const { username, email, password} = user;
    const res = await csrfFetch('api/users', {
        method: 'POST',
        body: JSON.stringify({username, email, password}),
        headers: {'Content-Type': 'application/json'}
    })
    if (res.ok) {
        const data = await res.json();
        storeCurrentUser(data);
        dispatch(receiveSession(data));
    }
}

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const res = await csrfFetch('api/session', {
        method: 'POST', 
        body: JSON.stringify({
            credential: credential,
            password: password
        }),
        headers: {'Content-Type': 'application/json'}
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveSession(data));
        storeCurrentUser(data);
    }
    return res;
}

function storeCSRFToken(response) {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

export const restoreSession = () => async (dispatch) => {
    const res = await csrfFetch('/api/session')
    storeCSRFToken(res);
    const data = await res.json();
    storeCurrentUser(data);
    dispatch(receiveSession(data));
    return res;
}

const storeCurrentUser = (user) => {
    const currentUser = JSON.stringify(user)
    if (currentUser) {
        sessionStorage.setItem("currentUser", currentUser);
    } else {
        sessionStorage.removeItem("currentUser");
    }
}

const initialState = JSON.parse(sessionStorage.getItem("currentUser"));

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_SESSION:
            const newState = {...state, ...action.user};
            return newState;
        case REMOVE_SESSION:
            return { ...state, user: null }
        default:
            return state;
    }
}
export default sessionReducer;