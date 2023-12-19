import csrfFetch from "./csrf";
import { RECEIVE_USER } from "./user";

export const RECEIVE_FRIEND_REQUEST = "friendRequests/RECEIVE_FRIEND_REQUEST";
export const REMOVE_FRIEND_REQUEST = "friendRequests/REMOVE_FRIEND_REQUEST";

export const removeFriendRequest = (requestId) => ({
    type: REMOVE_FRIEND_REQUEST,
    payload: requestId
})

export const getOutgoingRequests = (requestArray) => (state) => {
    const holder = []
    if (requestArray) {
        Object.values(state.friendRequests).forEach((request) => 
            {if (requestArray.includes(request.id)) {
                holder.push({[request.id]: state.users[request.friended]})
        }})
    }
    return holder;
}

export const getIncomingRequests = (requestArray) => (state) => {
    const holder = []
    if (requestArray) {
        Object.values(state.friendRequests).forEach((request) => 
            {if (requestArray.includes(request.id)) {
                holder.push({[request.id]: state.users[request.friender]})
        }})
    }
    return holder;
}

export const createFriendRequest = (frienderId, friendedId) => async (dispatch) => {

}

export const deleteFriendRequest = (requestId) => async (dispatch) => {
    const res = await csrfFetch(`/api/friend_requests/${requestId}`, {method: "DELETE"});
    if (res.ok) {
        dispatch(removeFriendRequest(requestId))
    }
}

const friendRequestsReducer = (state = {}, action) => {
    const nextState = {...Object.freeze(state)}
    switch (action.type) {
        case RECEIVE_USER:
            return {...nextState, ...action.payload.friendRequests}
        case REMOVE_FRIEND_REQUEST:
            delete nextState[action.payload];
            return nextState;
        default:
            return nextState;
    }
}

export default friendRequestsReducer;