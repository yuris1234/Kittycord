import csrfFetch from "./csrf";

export const RECEIVE_DM = "dms/RECEIVE_DM";
export const RECEIVE_MESSAGE = "messages/RECEIVE_MESSAGE";
export const RECEIVE_MESSAGES = "messages/RECEIVE_MESSAGES";

const receiveMessage = (message) => ({
    type: RECEIVE_MESSAGE,
    message
})

export const receiveMessages = (messages) => ({
    type: RECEIVE_MESSAGES,
    messages
})

export const createMessage = (message) => async (dispatch) => {
    const res = await csrfFetch('/api/messages', {method: 'POST', body: JSON.stringify(message), headers: {'Content-Type': 'application/json'}});
    const data = await res.json();
    dispatch(receiveMessage(data));
}


const messagesReducer = (state = {}, action) => {
    const nextState = {...Object.freeze(state)}
    switch (action.type) {
        case RECEIVE_DM:
            return {...nextState, ...action.messages};
        case RECEIVE_MESSAGE:
            nextState[action.message.id] = action.message
            return nextState;
        case RECEIVE_MESSAGES:
            return {...nextState, ...action.messages}
        default:
            return state;
    }
}
export default messagesReducer;