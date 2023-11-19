import csrfFetch from "./csrf";
import { receiveDm } from "./dm";

export const RECEIVE_DM = "dms/RECEIVE_DM";
export const RECEIVE_MESSAGE = "messages/RECEIVE_MESSAGE";
export const RECEIVE_MESSAGES = "messages/RECEIVE_MESSAGES";

export const receiveMessage = (message) => ({
    type: RECEIVE_MESSAGE,
    payload: message
})

export const receiveMessages = (messages) => ({
    type: RECEIVE_MESSAGES,
    payload: messages
})

export const getMessages = dmId => state => {
    const val = Object.values(state.messages).filter(message => message.messageableId === parseInt(dmId))
    return val
}

export const createMessage = (message) => async (dispatch) => {
    const res = await csrfFetch('/api/messages', {method: 'POST', body: JSON.stringify(message), headers: {'Content-Type': 'application/json'}});
    const data = await res.json();
    // dispatch(receiveMessage(data));
}


const messagesReducer = (state = {}, action) => {
    const nextState = {...Object.freeze(state)}
    switch (action.type) {
        case RECEIVE_MESSAGE:
            // debugger
            nextState[action.payload.id] = action.payload
            return nextState;
        case RECEIVE_MESSAGES:
            return {...nextState, ...action.payload.messages}
        default:
            return state;
    }
}
export default messagesReducer;