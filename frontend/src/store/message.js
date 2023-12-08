import csrfFetch from "./csrf";
import { receiveDm } from "./dm";
import { RECEIVE_DM } from "./dm";

export const RECEIVE_MESSAGE = "messages/RECEIVE_MESSAGE";
export const RECEIVE_MESSAGES = "messages/RECEIVE_MESSAGES";
export const REMOVE_MESSAGE = "messages/REMOVE_MESSAGE"

export const removeMessage = (messageId) => ({
    type: REMOVE_MESSAGE,
    messageId
})

export const receiveMessage = (message) => ({
    type: RECEIVE_MESSAGE,
    payload: message
})

export const receiveMessages = (messages) => ({
    type: RECEIVE_MESSAGES,
    payload: messages
})

export const getMessages = dmId => state => {
    return Object.values(state?.messages).filter(message => message.messageableId === parseInt(dmId))
}
    
export const updateMessage = message => async (dispatch) => {
    const res = await csrfFetch(`/api/messages/${message.id}`, {method: 'PATCH', body: JSON.stringify(message), headers: {'Content-Type': 'application/json'}});
    const data = await res.json();
    dispatch(receiveMessage(data));
}

export const createMessage = (message) => async (dispatch) => {
    const res = await csrfFetch('/api/messages', {method: 'POST', body: JSON.stringify(message), headers: {'Content-Type': 'application/json'}});
    const data = await res.json();
    dispatch(receiveMessage(data));
}

export const deleteMessage = (messageId) => async (dispatch) => {
    const res = await csrfFetch(`/api/messages/${messageId}`, {method: 'DELETE'});
    const data = await res.json();
    dispatch(removeMessage(messageId));
}


const messagesReducer = (state = {}, action) => {
    const nextState = {...Object.freeze(state)}
    switch (action.type) {
        case RECEIVE_MESSAGE:
            nextState[action.payload.message.id] = action.payload.message
            // debugger
            return nextState;
        case RECEIVE_DM:
            // debugger
            return {...nextState, ...action.payload.messages}
        case REMOVE_MESSAGE:
            delete nextState[action.messageId];
            return nextState;
        default:
            return state;
    }
}
export default messagesReducer;