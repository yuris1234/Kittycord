import csrfFetch from "./csrf";
import { RECEIVE_SERVER } from "./server";
export const RECEIVE_CHANNEL = "channel/RECEIVE_CHANNEL";
export const RECEIVE_CHANNELS = "channels/RECEIVE_CHANNELS";

export const receiveChannel = (channel) => ({
    type: RECEIVE_CHANNEL,
    payload: channel
})

export const fetchChannel = (channelId) => async (dispatch) => {
    const res = await csrfFetch(`/api/channels/${channelId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveChannel(data));
    }
}

const channelsReducer = (state = {}, action) => {
    const nextState = {...Object.freeze(state)}
    switch (action.type) {
        case RECEIVE_CHANNEL:
            nextState[action.payload.channel.id] = action.payload.channel
            return nextState
        case RECEIVE_SERVER:
            return {...nextState, ...action.payload.channels}
        default:
            return nextState
    }
}

export default channelsReducer