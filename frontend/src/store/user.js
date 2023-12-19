import csrfFetch from "./csrf";
import { receiveDms } from "./dm";
import { RECEIVE_DM } from "./dm";

export const RECEIVE_USER = "users/RECEIVE_USER";
export const RECEIVE_USERS = "users/RECEIVE_USERS";
export const RECEIVE_FRIEND = "users/RECEIVE_FRIEND";

export const receiveFriend = (userId, friendId) => ({
    type: RECEIVE_FRIEND,
    friendId,
    userId
})

export const getUsers = (userIds) => (state) => {
    const holder = []
    if (state.users) {
        userIds?.forEach((userId) => {
            if (state.users[userId]) {
                holder.push(state.users[userId])
            }
        })
    }
    return holder
}

export const getUser = (userId) => (state) => {
    return state.users[userId]
}

export const getFriends = (userIds) => (state) => {
    const holder = [];
    Object.values(state.users).forEach((user) => {
        if (userIds?.includes(user.id)) {
            holder.push(user)
        }
    })
    return holder
}

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    payload: user
})

export const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

export const fetchUser = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`);
    const data = await res.json();
    dispatch(receiveUser(data));
}

export const createFriend = (userId, friendId) => async (dispatch) => {
    const res = await csrfFetch(`/api/friends`, {method: "POST", body: JSON.stringify({friend_1: userId, friend_2: friendId})});
    if (res.ok) {
        dispatch(receiveFriend(userId, friendId))
    }
}

const usersReducer = (state = {}, action) => {
    const nextState = {...Object.freeze(state)}
    switch (action.type) {
        case RECEIVE_USER:
            return {...nextState, ...action.payload.users}
        case RECEIVE_DM:
            return {...nextState, ...action.payload.users}
        case RECEIVE_FRIEND:
            console.log(nextState[action.userId])
            nextState[action.userId].friendIds.push(action.friendId);
            console.log(nextState[action.userId])
            return nextState;
        default:
            return state;
    }
}
export default usersReducer;