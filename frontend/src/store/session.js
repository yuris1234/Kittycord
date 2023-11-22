// import csrfFetch from "./csrf";
// // import { storeCSRFToken } from "./csrf";

// export const RECEIVE_SESSION = 'session/RECEIVE_SESSION'; 
// export const REMOVE_SESSION = 'session/REMOVE_SESSION';

// const receiveSession = (user) => ({
//     type: RECEIVE_SESSION,
//     user
// })

// const removeSession = () => ({
//     type: REMOVE_SESSION
// })

// export const logout = () => async (dispatch) => {
//     const res = await csrfFetch('/api/session', {method: 'DElETE'});
//     storeCurrentUser(null);
//     dispatch(removeSession());
// }

// export const signup = (user) => async (dispatch) => {
//     const { username, email, password} = user;
//     const res = await csrfFetch('/api/users', {
//         method: 'POST',
//         body: JSON.stringify({username, email, password}),
//         headers: {'Content-Type': 'application/json'}
//     })
//     if (res.ok) {
//         const data = await res.json();
//         storeCurrentUser(data);
//         dispatch(receiveSession(data));
//     }
// }

// export const login = (user) => async (dispatch) => {
//     const { credential, password } = user;
//     const res = await csrfFetch('/api/session', {
//         method: 'POST', 
//         body: JSON.stringify({
//             credential: credential,
//             password: password
//         }),
//         headers: {'Content-Type': 'application/json'}
//     });
//     if (res.ok) {
//         const data = await res.json();
//         dispatch(receiveSession(data));
//         storeCurrentUser(data);
//     }
//     return res;
// }

// function storeCSRFToken(response) {
//     const csrfToken = response.headers.get("X-CSRF-Token");
//     if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
// }

// export const restoreSession = () => async (dispatch) => {
//     const res = await csrfFetch('/api/session')
//     storeCSRFToken(res);
//     const data = await res.json();
//     storeCurrentUser(data);
//     dispatch(receiveSession(data));
//     return res;
// }

// const storeCurrentUser = (user) => {
//     const currentUser = JSON.stringify(user)
//     if (currentUser) {
//         sessionStorage.setItem("currentUser", currentUser);
//     } else {
//         sessionStorage.setItem("currentUser", JSON.stringify({user: null}))
//     }
// }

// const initialState =  {user: JSON.parse(sessionStorage.getItem("currentUser"))};

// const sessionReducer = (state = initialState, action) => {
//     const nextState = {...Object.freeze(initialState)};
//     switch (action.type) {
//         case RECEIVE_SESSION:
//             nextState.user = action.user["user"]
//             return nextState;
//         case REMOVE_SESSION:
//             return {...nextState, user: null}
//         default:
//             return state;
//     }
// }
// export default sessionReducer;

import csrfFetch from "./csrf.js";

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user
});

const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
});

const storeCSRFToken = response => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = user => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
}

export const login = ({ credential, password }) => async dispatch => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password })
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const restoreSession = () => async dispatch => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password
    })
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE"
  });
  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  return response;
};

const initialState = { 
  user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer; 