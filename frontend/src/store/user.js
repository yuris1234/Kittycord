import csrfFetch from "./csrf";
import { receiveDms } from "./dm";
import { RECEIVE_DM } from "./dm";

export const RECEIVE_USER = "users/RECEIVE_USER";
export const RECEIVE_USERS = "users/RECEIVE_USERS";

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

export const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

export const fetchUser = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`);
    const data = await res.json();
    dispatch(receiveUser(data));
    // dispatch(receiveDms(data));
}

const usersReducer = (state = {}, action) => {
    const nextState = {...Object.freeze(state)}
    switch (action.type) {
        case RECEIVE_USER:
            nextState[action.user.user.id] = {...action.user.user};
            return nextState;
        case RECEIVE_DM:
            return {...nextState, ...action.payload.users}
        default:
            return state;
    }
}
export default usersReducer;