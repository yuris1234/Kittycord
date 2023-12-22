import csrfFetch from "./csrf";
import { RECEIVE_USER } from "./user";
export const RECEIVE_SERVER = "servers/RECEIVE_SERVER";
export const RECEIVE_SERVERS = "servers/RECEIVE_SERVERS";

export const receiveServer = (server) => ({
    type: RECEIVE_SERVER,
    payload: server
})

export const fetchServer = (serverId) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveServer(data));
    }
}

const serversReducer = (state = {}, action) => {
    const nextState = {...Object.freeze(state)}
    switch (action.type) {
        case RECEIVE_SERVER:
            nextState[action.payload.server.id] = action.payload.server
            return nextState
        case RECEIVE_USER:
            return {...nextState, ...action.payload.servers}

        default:
            return nextState
    }
}

export default serversReducer