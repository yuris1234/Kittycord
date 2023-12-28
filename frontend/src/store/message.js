import csrfFetch from "./csrf";
import { receiveDm } from "./dm";
import { RECEIVE_DM } from "./dm";
import { RECEIVE_CHANNEL } from "./channel";

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

export const getDmMessages = dmId => state => {
    return Object.values(state?.messages).filter(message => message.messageableId === parseInt(dmId) && message.messageableType === "Dm")
}

export const getChannelMessages = channelId => state => {
    return Object.values(state?.messages).filter(message => message.messageableId === channelId && message.messageableType === "Channel")
}
    
export const updateMessage = message => async (dispatch) => {
    const res = await csrfFetch(`/api/messages/${message.id}`, {method: 'PATCH', body: JSON.stringify(message), headers: {'Content-Type': 'application/json'}});
    const data = await res.json();
    dispatch(receiveMessage(data));
}

export const createMessage = (message) => async (dispatch) => {
    const res = await csrfFetch('/api/messages', {method: 'POST', body: JSON.stringify(message), headers: {'Content-Type': 'application/json'}});
    const data = await res.json();
}

export const deleteMessage = (messageId) => async (dispatch) => {
    const res = await csrfFetch(`/api/messages/${messageId}`, {method: 'DELETE'});
    const data = await res.json();
}


const messagesReducer = (state = {}, action) => {
    const nextState = {...Object.freeze(state)}
    switch (action.type) {
        case RECEIVE_MESSAGE:
            nextState[action.payload.message.id] = action.payload.message
            return nextState;
        case RECEIVE_DM:
            return {...nextState, ...action.payload.messages}
        case REMOVE_MESSAGE:
            delete nextState[action.messageId];
            return nextState;
        case RECEIVE_CHANNEL:
            return {...nextState, ...action.payload.messages}
        default:
            return state;
    }
}
export default messagesReducer;