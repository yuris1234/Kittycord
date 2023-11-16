import csrfFetch from "./csrf";

export const RECEIVE_DM = "dms/RECEIVE_DM";


const messagesReducer = (state = {}, action) => {
    const nextState = {...Object.freeze(state)}
    switch (action.type) {
        case RECEIVE_DM:
            return {...nextState, ...action.messages};
        default:
            return state;
    }
}
export default messagesReducer;